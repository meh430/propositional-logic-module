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
const E = new Symbol("E");

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
    assertInput(
      "(((A) implies (B implies C))) implies D",
      new Implication(new Implication(A, new Implication(B, C)), D)
    );
  },
  "Biconditional test": () => {
    const equiv = new Biconditional(A, B);
    assertInput("(A iff B)", equiv);
    assertInput("   A    iff     B   ", equiv);
    assertInput("(A iff B) iff (A iff B)", new Biconditional(equiv, equiv));
    assertInput(
      "(((A) iff (B iff C))) iff D",
      new Biconditional(new Biconditional(A, new Biconditional(B, C)), D)
    );
  },
  "And test": () => {
    assertInput("A and B", new And(A, B));
    assertInput("A and B and C and D", new And(A, B, C, D));
    assertInput("(A and B) and (C and (D and E))", new And(A, B, C, D, E));
    assertInput("(B and ((C) and (D and E))) and A", new And(B, C, D, E, A));
  },
  "Or test": () => {
    assertInput("A or B", new Or(A, B));
    assertInput("A or B or C or D", new Or(A, B, C, D));
    assertInput("(A or B) or (C or (D or E))", new Or(A, B, C, D, E));
    assertInput("(B or ((C) or (D or E))) or A", new Or(B, C, D, E, A));
  },
  "Not test": () => {},
  "Mixed tests": () => {},
};

module.exports = tests;
