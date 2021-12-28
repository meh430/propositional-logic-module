import * as assert from "assert";
import { isTautology } from "../src/Tautology";
import { And, Or } from "../src/language/Junction";
import { Not, Symbol } from "../src/language/Literal";
import { Implication } from "../src/language/Implication";
import { TestSuite } from "./test";

const tests: TestSuite = {
  "Tautology 1": () => {
    // p or not p
    const p = new Symbol("p");
    const tautology = new Or(p, new Not(p));
    assert.equal(isTautology(tautology), true);
  },
  "Tautology 2": () => {
    // ((p implies q) and p) implies q
    const p = new Symbol("p");
    const q = new Symbol("q");
    const tautology = new Implication(new And(new Implication(p, q), p), q);
    assert.equal(isTautology(tautology), true);
  },
  "Not a tautology 1": () => {
    // p and not p
    const p = new Symbol("p");
    const contradiction = new And(p, new Not(p));
    assert.equal(isTautology(contradiction), false);
  },
  "Not a tautology 2": () => {
    const p = new Symbol("p");
    assert.equal(isTautology(p), false);
  },
  "Not a tautology 3": () => {
    const p = new Symbol("p");
    const q = new Symbol("q");
    const contingent = new Implication(new Or(p, q), new Or(p, new Not(q)));
    assert.equal(isTautology(contingent), false);
  },
};

module.exports = tests;
