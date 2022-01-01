import { Formula, Not, Symbol, Or, And } from "../logic";
import { convertToCNF, isLogicalLiteral } from "./Convert";
import { difference, union } from "./Utils";

function disjunctiveClauseToLiteralSet(clause: Or): Set<Formula> {
  return new Set(clause.getOperands().filter((c) => isLogicalLiteral(c)));
}

function processInput(formulas: Formula[]): Set<Set<Formula>> {
  const cnfFormulas = formulas.map((f) => convertToCNF(f));
  const disjunctiveClauseSets = new Set<Set<Formula>>();

  // formula in cnf can be a
  // * literal
  // * Not
  // * Or (disjunctive clause)
  // * And (conjunction of disjunctive clauses)
  cnfFormulas.forEach((f) => {
    if (isLogicalLiteral(f)) {
      disjunctiveClauseSets.add(new Set([f]));
    } else if (f instanceof Or) {
      disjunctiveClauseSets.add(disjunctiveClauseToLiteralSet(f));
    } else if (f instanceof And) {
      f.getOperands().forEach((o) => {
        if (isLogicalLiteral(o)) {
          disjunctiveClauseSets.add(new Set([o]));
        } else if (o instanceof Or) {
          disjunctiveClauseSets.add(disjunctiveClauseToLiteralSet(o));
        }
      });
    }
  });

  return disjunctiveClauseSets;
}

function isTautology(clause: Set<Formula>, order: Symbol[]): boolean {
  return order.some((s) => {
    const complement = new Not(s);
    return clause.has(s) && clause.has(complement);
  });
}

function removeTautologies(
  s: Set<Set<Formula>>,
  order: Symbol[]
): Set<Set<Formula>> {
  return new Set([...s].filter((c) => isTautology(c, order)));
}

function clausesWithLiteral(
  s: Set<Set<Formula>>,
  symbol: Symbol
): Set<Set<Formula>> {
  const complement = new Not(symbol);
  return new Set([...s].filter((c) => c.has(symbol) || c.has(complement)));
}

function resolve(
  clause1: Set<Formula>,
  clause2: Set<Formula>,
  symbol: Symbol
): Set<Formula> {
  const complement = new Not(symbol);
  if (
    (clause1.has(symbol) && clause2.has(complement)) ||
    (clause1.has(complement) && clause2.has(symbol))
  ) {
    return difference(union(clause1, clause2), new Set([symbol, complement]));
  }

  return new Set();
}

function getResolvents(clauses: Set<Set<Formula>>, symbol: Symbol) {
  const resolvents: Set<Set<Formula>> = new Set();
  const complement = new Not(symbol);
  const clauseList = [...clauses];
  for (let i = 0; i < clauseList.length; i++) {
    const clause1 = clauseList[i];
    const hasSymbol = clause1.has(symbol);
    for (let j = i; j < clauseList.length; j++) {
      const clause2 = clauseList[j];
      const canResolve =
        (clause1.has(symbol) && clause2.has(complement)) ||
        (clause1.has(complement) && clause2.has(symbol));
      if (canResolve) {
        const resolvent = resolve(clause1, clause2, symbol);
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
