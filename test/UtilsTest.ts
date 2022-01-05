import * as assert from "assert";
import { And, Or } from "../src/language/Junction";
import { Implication } from "../src/language/Implication";
import { Not, Symbol } from "../src/language/Literal";
import {
  collectSymbols,
  difference,
  generateValuations,
  intersection,
  union,
} from "../src/Utils";
import { TestSuite } from "./test";

function s(...syms: string[]) {
  return new Set<string>([...syms]);
}

const tests: TestSuite = {
  "collectSymbols test": () => {
    assert.deepEqual(collectSymbols([]), s());

    const p = new Symbol("p");
    const q = new Symbol("q");
    const r = new Symbol("r");

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
  "Set operation tests": () => {
    const a = s("a", "b", "c", "d");
    const b = s("c", "a", "e");
    const c = s("1");
    const d = s();

    assert.deepEqual(union(a, b), s("a", "b", "c", "d", "e"));
    assert.deepEqual(union(c, c), c);
    assert.deepEqual(union(d, d), d);

    assert.deepEqual(intersection(a, b), s("a", "c"));
    assert.deepEqual(intersection(c, c), c);
    assert.deepEqual(intersection(a, c), d);
    assert.deepEqual(intersection(d, d), d);

    assert.deepEqual(difference(a, b), s("b", "d"));
    assert.deepEqual(difference(c, c), d);
    assert.deepEqual(difference(b, c), b);
    assert.deepEqual(difference(d, d), d);
  },
};

module.exports = tests;
