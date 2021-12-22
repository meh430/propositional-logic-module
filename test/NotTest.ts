import * as assert from "assert";
import { Not } from "../language/Not";
import { Literal } from "../language/Literal";
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
};

module.exports = tests;
