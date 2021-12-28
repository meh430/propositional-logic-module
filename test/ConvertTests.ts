import * as assert from "assert";
import { Formula } from "../src/language/Formula";
import { And, Or } from "../src/language/Junction";
import { Implication } from "../src/language/Implication";
import { Not, Literal } from "../src/language/Not";
import { convertToDNF, convertToCNF } from "../src/Convert";
import { TestSuite } from "./test";
import { Biconditional } from "../logic";

const p = new Literal("p");
const q = new Literal("q");
const r = new Literal("r");

const formulas: { [key: string]: Formula[] } = {
  literal1: [p, p, p],
  literal2: [new Not(p), new Not(p), new Not(p)],
  implication: [
    new Implication(p, q),
    new Or(
      new And(new Not(p), new Not(q)),
      new And(new Not(p), q),
      new And(p, q)
    ),
    new Or(new Not(p), q),
  ],
  or: [new Or(p, q), new Or(p, q), new Or(p, q)],
  tautology: [
    new Or(p, new Not(p)),
    new Or(p, new Not(p)),
    new Or(p, new Not(p)),
  ],
  contradiction: [
    new And(p, new Not(p)),
    new And(p, new Not(p)),
    new And(p, new Not(p)),
  ],
  biconditional: [
    new Biconditional(new Or(p, q, r), new Not(new And(p, r))),
    new Or(
      new And(new Not(p), new Not(q), r),
      new And(new Not(p), q, new Not(r)),
      new And(new Not(p), q, r),
      new And(p, new Not(q), new Not(r)),
      new And(p, q, new Not(r))
    ),
    new And(
      new Or(p, q, r),
      new Or(new Not(p), q, new Not(r)),
      new Or(new Not(p), new Not(q), new Not(r))
    ),
  ],
};

const tests: TestSuite = {};

for (const f in formulas) {
  tests["convertToDNF test: " + f] = () => {
    assert.deepEqual(convertToDNF(formulas[f][0]), formulas[f][1]);
  };
  tests["convertToCNF test: " + f] = () => {
    assert.deepEqual(convertToCNF(formulas[f][0]), formulas[f][2]);
  };
}

module.exports = tests;
