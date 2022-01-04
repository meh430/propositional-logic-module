import { Formula, Or, And } from "../logic";
import { convertToCNF, isLogicalLiteral } from "./Convert";
import { difference, equalSets, union } from "./Utils";

const NOT_SYMBOL = "¬";
// list of a set of strings?

type Clauses = Array<Set<string>>;

function getComplement(s: string): string {
  return `(${NOT_SYMBOL}${s})`;
}

function disjunctiveClauseToLiteralSet(clause: Or): Set<string> {
  return new Set(
    clause
      .getOperands()
      .filter((c) => isLogicalLiteral(c))
      .map((c) => c.getFormula())
  );
}

function processInput(formulas: Formula[]): Clauses {
  const cnfFormulas = formulas.map((f) => convertToCNF(f));
  const disjunctiveClauseSets: Clauses = new Array<Set<string>>();

  // formula in cnf can be a
  // * literal
  // * Not
  // * Or (disjunctive clause)
  // * And (conjunction of disjunctive clauses)
  cnfFormulas.forEach((f) => {
    if (isLogicalLiteral(f)) {
      disjunctiveClauseSets.push(new Set([f.getFormula()]));
    } else if (f instanceof Or) {
      disjunctiveClauseSets.push(disjunctiveClauseToLiteralSet(f));
    } else if (f instanceof And) {
      f.getOperands().forEach((o) => {
        if (isLogicalLiteral(o)) {
          disjunctiveClauseSets.push(new Set([o.getFormula()]));
        } else if (o instanceof Or) {
          disjunctiveClauseSets.push(disjunctiveClauseToLiteralSet(o));
        }
      });
    }
  });

  return disjunctiveClauseSets;
}

function isTautology(clause: Set<string>, order: string[]): boolean {
  return order.some((s) => {
    return clause.has(s) && clause.has(getComplement(s));
  });
}

function removeTautologies(
  disjunctiveClauseSets: Clauses,
  order: string[]
): Clauses {
  return disjunctiveClauseSets.filter((s) => !isTautology(s, order));
}

function clausesWithSymbol(
  disjunctiveClauseSets: Clauses,
  symbol: string
): Clauses {
  return disjunctiveClauseSets.filter(
    (s) => s.has(symbol) || s.has(getComplement(symbol))
  );
}

function resolve(
  clause1: Set<string>,
  clause2: Set<string>,
  symbol: string
): Set<string> {
  const complement = getComplement(symbol);
  if (
    (clause1.has(symbol) && clause2.has(complement)) ||
    (clause1.has(complement) && clause2.has(symbol))
  ) {
    return difference(union(clause1, clause2), new Set([symbol, complement]));
  }

  return new Set();
}

function hasClause(clauses: Clauses, clause: Set<string>): boolean {
  return clauses.some((c) => equalSets(c, clause));
}

function getResolvents(clauses: Clauses, symbol: string): [Clauses, string[]] {
  const resolvents: Clauses = [];
  const statements: string[] = [];
  const complement = getComplement(symbol);
  for (let i = 0; i < clauses.length; i++) {
    const clause1 = clauses[i];
    for (let j = i; j < clauses.length; j++) {
      const clause2 = clauses[j];
      const canResolve =
        (clause1.has(symbol) && clause2.has(complement)) ||
        (clause1.has(complement) && clause2.has(symbol));
      if (canResolve) {
        const resolvent = resolve(clause1, clause2, symbol);
        if (!hasClause(resolvents, resolvent)) {
          resolvents.push(resolvent);
          statements.push(
            `\\item $\\{${getSetLatex(
              resolvent,
              resolvent.size,
              true
            )}\\}$ by resolving $\\{${getSetLatex(
              clause1,
              clause1.size,
              true
            )}\\}$ and $\\{${getSetLatex(clause2, clause2.size, true)}\\}$\n`
          );
        }
      }
    }
  }

  return [resolvents, statements];
}

function isComplement(symbol: string): boolean {
  return (
    symbol.length > 2 &&
    symbol.startsWith("(") &&
    symbol.endsWith(")") &&
    symbol[1] === NOT_SYMBOL
  );
}

// requires input to be of form (¬X)
function getSymbol(negation: string): string {
  return negation.substring(2, negation.length - 1);
}

function getSetLatex(
  clauses: Clauses | Set<string>,
  size: number,
  isInnerSet: boolean
): string {
  if (!isInnerSet && size == 0) {
    return "\\emptyset";
  } else if (size == 0) {
    return "{}";
  }

  let latex = "";
  let prevLine = 0;
  let clausesArr: Array<Set<string> | string> = isInnerSet
    ? [...(clauses as Set<string>)]
    : (clauses as Clauses);
  clausesArr.forEach((c, i) => {
    if (isInnerSet) {
      const literal = c as string;
      latex += isComplement(literal) ? `\\neg ${getSymbol(literal)}` : literal;
    } else {
      const innerSet = c as Set<string>;
      latex += `\\{${getSetLatex(innerSet, innerSet.size, true)}\\}`;
    }

    if (i != size - 1) {
      latex += ", ";
      if (latex.length - prevLine >= 120 && !isInnerSet) {
        prevLine += latex.length - 1;
        latex += " \\\\ &";
      }
    }
  });
  return latex;
}

function generateNextSet(sPrime: Clauses, t: Clauses, u: Clauses): Clauses {
  const sPrimeDiffT = sPrime.filter((c) => !hasClause(t, c));
  const nextSet: Clauses = [];
  [...sPrimeDiffT, ...u].forEach((c) => {
    if (!hasClause(nextSet, c)) {
      nextSet.push(c);
    }
  });
  return nextSet;
}

function setSymbol(name: string, index: number): string {
  return `${name}_{${index}}`;
}

function createDocument(inner: string): string {
  const u = "\\u";
  const start = String.raw`\documentclass[11pt]{article}
\textwidth 15cm 
\textheight 21.3cm
\evensidemargin 6mm
\oddsidemargin 6mm
${u}sepackage[bottom=1in, top=0.8in]{geometry}
\setlength{\parskip}{1.5ex}
${u}sepackage{amsfonts,amsmath,amssymb,enumerate,amsthm}
\allowdisplaybreaks
\def\logequiv{\mathrel{\vert\mkern-3mu{=}\mkern-3mu{=}\mkern-3mu\vert}}
\begin{document}
\parindent=0pt
\pagestyle{empty}`;
  const end = String.raw`\end{document}`;
  return `${start}\n${inner}\n${end}\n`;
}

export function dpp(formulas: Formula[], order: string[]): string {
  const statements = []; //["The premises are:\n"];

  const addClauseSet = (title: string, clauses: Clauses) => {
    statements.push("\\begin{align*}\n");
    statements.push(
      title + " = &" + getSetLatex(clauses, clauses.length, false) + "\n"
    );
    statements.push("\\end{align*}\n");
  };

  let setS = processInput(formulas);

  order.forEach((variable, index) => {
    const setSTitle = setSymbol("S", index + 1);
    const setSPrimeTitle = setSymbol("S'", index + 1);
    const setTTitle = setSymbol("T", index + 1);
    const setUTitle = setSymbol("U", index + 1);

    statements.push(`\\textbf{Eliminate $${variable}$}:\\\\\n`);

    if (index != 0) {
      statements.push(
        `Now, $S_{${
          index + 1
        }} = (S'_{${index}} \\backslash T_{${index}}) \\cup U_{${index}}$. \n`
      );
    }

    statements.push("We have that \n");
    addClauseSet(setSTitle, setS);

    const setSPrime = removeTautologies(setS, order);
    statements.push("Removing any tautologies, we get that \n");
    addClauseSet(setSPrimeTitle, setSPrime);

    const setT = clausesWithSymbol(setSPrime, variable);
    statements.push(
      `We select clauses with the variable $${variable}$ to get \n`
    );
    addClauseSet(setTTitle, setT);

    const [setU, resolutionStatements] = getResolvents(setT, variable);

    if (resolutionStatements.length > 0) {
      statements.push(
        `We begin resolving clauses in $T_{${index + 1}}$ to get\n`
      );
      statements.push("\\begin{itemize}\n");
      resolutionStatements.forEach((s) => {
        statements.push(s);
      });
      statements.push("\\end{itemize}\n");
    } else {
      statements.push(`We cannot resolve anything in $T_{${index + 1}}$.\n`);
    }

    statements.push("Therefore, we have that \n");
    addClauseSet(setUTitle, setU);
    setS = generateNextSet(setSPrime, setT, setU);
  });

  const i = order.length;
  statements.push(
    `Finally, $S_{${
      i + 1
    }} = (S'_{${i}} \\backslash T_{${i}}) \\cup U_{${i}}$. So \n`
  );
  addClauseSet(setSymbol("S", i + 1), setS);

  return createDocument(statements.join(""));
}
