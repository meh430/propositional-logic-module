import * as assert from "assert";
import { Not, Literal } from "../src/language/Not";
import { TestSuite } from "./test";

const tests: TestSuite = {
  "Not evaluates to 0 when operand is 1": () => {
    const not = new Not(new Literal("p"));
    assert.equal(not.evaluate({ p: true }), false);
  },
  "Not evaluates to 1 when operand is 0": () => {
    const not = new Not(new Literal("p"));
    assert.equal(not.evaluate({ p: false }), true);
  },
  "Not returns the correct formula": () => {
    const p = new Literal("p");
    assert.equal(new Not(p).getFormula(), "(¬p)");

    assert.deepEqual(new Not(p).getSymbols(), new Set<string>(["p"]));
  },
};

module.exports = tests;
