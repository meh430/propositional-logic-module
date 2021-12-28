import * as assert from "assert";
import { Not, Symbol } from "../src/language/Literal";
import { TestSuite } from "./test";

const tests: TestSuite = {
  "Not evaluates to 0 when operand is 1": () => {
    const not = new Not(new Symbol("p"));
    assert.equal(not.evaluate({ p: true }), false);
  },
  "Not evaluates to 1 when operand is 0": () => {
    const not = new Not(new Symbol("p"));
    assert.equal(not.evaluate({ p: false }), true);
  },
  "Not returns the correct formula": () => {
    const p = new Symbol("p");
    assert.equal(new Not(p).getFormula(), "(¬p)");

    assert.deepEqual(new Not(p).getSymbols(), new Set<string>(["p"]));
  },
};

module.exports = tests;
