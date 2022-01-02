import { Formula, Not, Symbol, Or, And } from "../logic";
import { convertToCNF, isLogicalLiteral } from "./Convert";
import { difference, equalSets, union } from "./Utils";

const NOT_SYMBOL = "¬";
// list of a set of strings?

function getComplement(s: string): string {
  return NOT_SYMBOL + s;
}

function disjunctiveClauseToLiteralSet(clause: Or): Set<string> {
  return new Set(
    clause
      .getOperands()
      .filter((c) => isLogicalLiteral(c))
      .map((c) => c.getFormula())
  );
}

function processInput(formulas: Formula[]): Array<Set<string>> {
  const cnfFormulas = formulas.map((f) => convertToCNF(f));
  const disjunctiveClauseSets = new Array<Set<string>>();

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
  disjunctiveClauseSets: Array<Set<string>>,
  order: string[]
): Array<Set<string>> {
  return disjunctiveClauseSets.filter((s) => isTautology(s, order));
}

function clausesWithSymbol(
  disjunctiveClauseSets: Array<Set<string>>,
  symbol: string
): Array<Set<string>> {
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

function hasClause(clauses: Array<Set<string>>, clause: Set<string>): boolean {
  return clauses.some((c) => equalSets(c, clause));
}

function getResolvents(clauses: Array<Set<string>>, symbol: string) {
  const resolvents: Array<Set<string>> = [];
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
        }
      }
    }
  }
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

export function dpp(
  formulas: Formula[],
  order: string[],
  fileName: string
): string {
  let output = "The premises are:";
  console.log(createDocument(output));
  return output;
}
