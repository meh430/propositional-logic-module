import * as assert from "assert";
import { Biconditional } from "../language/Biconditional";
import { Literal } from "../language/Literal";
import { TestSuite } from "./test";

function getBiconditional(): Biconditional {
  return new Biconditional(new Literal("p"), new Literal("q"));
}

const tests: TestSuite = {
  "Biconditional matches truth table": () => {
    const biconditional = getBiconditional();
    assert.equal(biconditional.evaluate({p: false, q: false}), true);
    assert.equal(biconditional.evaluate({p: true, q: false}), false);
    assert.equal(biconditional.evaluate({p: false, q: true}), false);
    assert.equal(biconditional.evaluate({p: true, q: true}), true);
  }
};

module.exports = tests;
