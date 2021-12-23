import * as assert from "assert";
import { Formula, Valuation } from "../src/language/Formula";
import { Literal } from "../src/language/Literal";
import { And } from "../src/language/And";
import { Or } from "../src/language/Or";
import { Implication } from "../src/language/Implication";
import { Not } from "../src/language/Not";
import { collectSymbols, generateValuations } from "../src/Utils";
import { TestSuite } from "./test";

function s(...syms: string[]) {
  return new Set<string>([...syms]);
}

const tests: TestSuite = {
  "collectSymbols test": () => {
    assert.deepEqual(collectSymbols([]), s());

    const p = new Literal("p");
    const q = new Literal("q");
    const r = new Literal("r");

    assert.deepEqual(collectSymbols([p]), s("p"));
    assert.deepEqual(collectSymbols([p, q, r]), s("p", "q", "r"));

    const f1 = new And(
      new Implication(p, r),
      new Not(new Or(p, p, r, new Not(p)))
    );
    const f2 = new Implication(new Not(p), new And(new Not(p), r));
    assert.deepEqual(collectSymbols([f1, f2]), s("p", "r"));
  },
  "generateValuations test": () => {
    assert.deepEqual(generateValuations(s()), []);

    const expected1 = [{ p: false }, { p: true }];
    assert.deepEqual(generateValuations(s("p")), expected1);

    const expected2 = [
      { p: false, q: false },
      { p: false, q: true },
      { p: true, q: false },
      { p: true, q: true },
    ];
    assert.deepEqual(generateValuations(s("p", "q")), expected2);
  },
};

module.exports = tests;