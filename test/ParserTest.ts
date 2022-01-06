import * as assert from "assert";
import { Formula } from "../src/language/Formula";
import { And, Or } from "../src/language/Junction";
import { Not, Symbol } from "../src/language/Literal";
import { Implication } from "../src/language/Implication";
import { Biconditional } from "../src/language/Biconditional";
import { TestSuite } from "./test";
import { createFormula, tokenize } from "../src/Parser";

const MSG = "Invalid input";

function assertError(input: string) {
  assert.throws(() => createFormula(input), Error, MSG);
}

function assertInput(input: string, expected: Formula) {
  assert.deepEqual(createFormula(input), expected);
}

const A = new Symbol("A");
const B = new Symbol("B");
const C = new Symbol("C");
const D = new Symbol("D");

const tests: TestSuite = {
  "Empty string test": () => {
    assertError("");
  },
  "Invalid formula test": () => {
    assertError("not A not B");
    assertError("((A and B implies C)");
    assertError("A B");
    assertError("(((C()))");
  },
  "Symbol test": () => {
    assertInput("A", A);
    assertInput("(B)", B);
    assertInput("(((C)))", C);
    assertInput("       GUY", new Symbol("GUY"));
    assertInput("LOL  ", new Symbol("LOL"));
    assertInput("      X      ", new Symbol("X"));
  },
  "Implication test": () => {
    const impl = new Implication(A, B);
    assertInput("(A implies B)", impl);
    assertInput("   A    implies     B   ", impl);
    assertInput(
      "(A implies B) implies (A implies B)",
      new Implication(impl, impl)
    );
  },
  "Biconditional test": () => {},
  "And test": () => {},
  "Or test": () => {},
  "Mixed tests": () => {},
};

module.exports = tests;
