import * as assert from "assert";
import { isContradiction } from "../src/Contradiction";
import { And, Or } from "../src/language/Junction";
import { Not, Literal } from "../src/language/Not";
import { Implication } from "../src/language/Implication";
import { TestSuite } from "./test";

const tests: TestSuite = {
  "Contradiction 1": () => {
    // p and not p
    const p = new Literal("p");
    const contradiction = new And(p, new Not(p));
    assert.equal(isContradiction(contradiction), true);
  },
  "Contradiction 2": () => {
    // not (((p implies q) and p) implies q)
    const p = new Literal("p");
    const q = new Literal("q");
    const contradiction = new Implication(new And(new Implication(p, q), p), q);
    assert.equal(isContradiction(new Not(contradiction)), true);
  },
  "Not a contradiction 1": () => {
    // p or not p
    const p = new Literal("p");
    const tautology = new Or(p, new Not(p));
    assert.equal(isContradiction(tautology), false);
  },
  "Not a contradiction 2": () => {
    const p = new Literal("p");
    assert.equal(isContradiction(p), false);
  },
  "Not a contradiction 3": () => {
    const p = new Literal("p");
    const q = new Literal("q");
    const contingent = new Implication(new Or(p, q), new Or(p, new Not(q)));
    assert.equal(isContradiction(contingent), false);
  },
};

module.exports = tests;
