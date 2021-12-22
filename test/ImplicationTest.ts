import * as assert from "assert";
import { Implication } from "../language/Implication";
import { Literal } from "../language/Literal";
import { TestSuite } from "./test";

function getImplication(): Implication {
  return new Implication(new Literal("p"), new Literal("q"));
}

const tests: TestSuite = {
  "Implication evaluates to 1 when antecedent is 0": () => {
    const implication = getImplication();
    assert.equal(implication.evaluate({ p: false, q: false }), true);
    assert.equal(implication.evaluate({ p: false, q: true }), true);
  },
  "Implication evaluates to 0 when antecedent is 1 and consequent is 0": () => {
    const implication = getImplication();
    assert.equal(implication.evaluate({ p: true, q: false }), false);
  },
};

module.exports = tests;
