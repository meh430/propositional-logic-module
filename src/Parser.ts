import { Formula } from "./language/Formula";
import { Symbol, Not } from "./language/Literal";
import { And, Or } from "./language/Junction";
import { Implication } from "./language/Implication";
import { Biconditional } from "./language/Biconditional";
import { flattenConjunction, flattenDisjunction } from "./Utils";

const OPENING = "(";
const CLOSING = ")";
const SPACE = " ";
const MSG = "Invalid input";

const precedence: { [key: string]: number } = {
  not: 0,
  and: 1,
  or: 2,
  implies: 3,
  iff: 4,
};

export function createFormula(expression: string): Formula {
  try {
    return parseExpression(expression);
  } catch (e: unknown) {
    throw new Error("Invalid input");
  }
}

function parseExpression(expression: string | string[]): Formula {
  const isString = typeof expression === "string";
  if (isString && (expression.length === 0 || !balanced(expression))) {
    throw new Error(MSG);
  }
  const inner = isString ? removeParenthesis(expression) : "";
  const tokens = isString ? tokenize(inner) : expression;
  let lowestPrecedenceIndex = -1;
  let max = -1;
  tokens.forEach((t, i) => {
    if (t in precedence && precedence[t] > max) {
      max = precedence[t];
      lowestPrecedenceIndex = i;
    }
  });

  // -1 means that there are no connectives
  const op =
    lowestPrecedenceIndex === -1 ? "symbol" : tokens[lowestPrecedenceIndex];

  // not is unary, should only have expression to the right
  if (op === "not") {
    if (tokens.length > 2) {
      throw new Error(MSG);
    }

    return new Not(parseExpression(tokens[1]));
  }

  if (op === "symbol") {
    if (tokens.length > 1) {
      throw new Error(MSG);
    } else if (hasParenthesis(tokens[0])) {
      return parseExpression(tokens[0]);
    }

    return new Symbol(tokens[0]);
  }

  const o1 = getElementIfSingle(tokens.slice(0, lowestPrecedenceIndex));
  const o2 = getElementIfSingle(tokens.slice(lowestPrecedenceIndex + 1));
  if (op === "and") {
    return flattenConjunction(
      new And(parseExpression(o1), parseExpression(o2))
    );
  } else if (op === "or") {
    return flattenDisjunction(new Or(parseExpression(o1), parseExpression(o2)));
  } else if (op === "implies") {
    return new Implication(parseExpression(o1), parseExpression(o2));
  } else {
    return new Biconditional(parseExpression(o1), parseExpression(o2));
  }
}

function tokenize(expression: string): string[] {
  const tokens: string[] = [];

  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];
    // cannot get index of first here, because first might be for inner parenthesis?
    if (c === OPENING) {
      const closingIndex = getIndexOfClosingP(expression, i);
      const parenthesizedExpression = expression.substring(i, closingIndex + 1);
      tokens.push(parenthesizedExpression);
      i = closingIndex + 1;
    } else if (c === SPACE) {
      continue;
    } else {
      const delimitIndex = getIndexOfFirst(expression, i, SPACE);
      const word = expression.substring(i, delimitIndex);
      tokens.push(word);
      i = delimitIndex;
    }
  }

  return tokens;
}

// requires target is length 1
// returns n such that s[n] == target
function getIndexOfFirst(s: string, start: number, target: string): number {
  for (let i = start; i < s.length; i++) {
    if (s[i] === target) {
      return i;
    }
  }

  return target === SPACE ? s.length : -1;
}

// assumes balanced s
function getIndexOfClosingP(s: string, start: number): number {
  const stack: number[] = [];
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (c === OPENING) {
      stack.push(0);
    } else if (c === CLOSING) {
      stack.pop();
    }

    if (stack.length === 0) {
      return i;
    }
  }

  return -1;
}

function removeParenthesis(expression: string): string {
  if (hasParenthesis(expression)) {
    return expression.substring(1, expression.length - 1);
  }

  return expression;
}

// (A) is true
// (A) and (B) is false
function hasParenthesis(s: string): boolean {
  if (!s.startsWith(OPENING) || !s.endsWith(CLOSING)) {
    return false;
  }

  return balanced(s.substring(1, s.length - 1));
}

function getElementIfSingle<Type>(arr: Array<Type>): Type | Type[] {
  if (arr.length === 1) {
    return arr[0];
  }

  return arr;
}

function balanced(s: string): boolean {
  const stack: number[] = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === OPENING) {
      stack.push(0);
    } else if (c === CLOSING) {
      stack.pop();
    }
  }
  return stack.length === 0;
}
