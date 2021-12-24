import * as assert from "assert";
import { Formula } from "../src/language/Formula";
import { And, Or } from "../src/language/Junction";
import { Implication } from "../src/language/Implication";
import { Not, Literal } from "../src/language/Not";
import {
  isSatisfiableFormula,
  isSatisfiableSet,
  getTautologicalConsequenceCounter,
} from "../src/Satisfiability";
import { TestSuite } from "./test";

const p = new Literal("p");
const q = new Literal("q");
const r = new Literal("r");

const formulas = {
  implication1: new Implication(p, q),
  implication2: new Implication(q, r),
  implication3: new Implication(p, r),
  or: new Or(p, q),
  tautology: new Or(p, new Not(p)),
  contradiction: new And(p, new Not(p)),
};

const tests: TestSuite = {
  "isSatisfiableFormula test": () => {
    const p = new Literal("p");
    assert.equal(isSatisfiableFormula(p), true);
    assert.equal(
      isSatisfiableFormula(new Implication(p, new Literal("q"))),
      true
    );
    assert.equal(isSatisfiableFormula(new And(p, new Not(p))), false);
  },
  "isSatisfiableSet test": () => {
    const s0: Formula[] = [];
    assert.equal(isSatisfiableSet(s0), true);

    const s1 = [p];
    assert.equal(isSatisfiableSet(s1), true);

    const s2 = [p, q, r];
    assert.equal(isSatisfiableSet(s2), true);

    const s3 = [
      formulas.implication1,
      formulas.implication2,
      new Not(formulas.implication3),
    ];
    assert.equal(isSatisfiableSet(s3), false);

    const s4 = [formulas.tautology];
    assert.equal(isSatisfiableSet(s4), true);

    const s5 = [formulas.contradiction];
    assert.equal(isSatisfiableSet(s5), false);

    const s6 = [formulas.tautology, formulas.contradiction];
    assert.equal(isSatisfiableSet(s6), false);

    const s7 = [p, r, new Not(p)];
    assert.equal(isSatisfiableSet(s7), false);
  },
  "getTautologicalConsequenceCounter test": () => {
    const p1 = [p];
    const c1 = p;
    assert.deepEqual(getTautologicalConsequenceCounter(p1, c1), undefined);

    const p2 = [p, q, r];
    const c2 = r;
    assert.deepEqual(getTautologicalConsequenceCounter(p2, c2), undefined);

    const p3 = [formulas.implication1, formulas.implication2];
    const c3 = formulas.implication3;
    assert.deepEqual(getTautologicalConsequenceCounter(p3, c3), undefined);

    const p4 = [formulas.or, new Not(p)];
    const c4 = q;
    assert.deepEqual(getTautologicalConsequenceCounter(p4, c4), undefined);

    const p5: Formula[] = [];
    const c5 = formulas.tautology;
    assert.deepEqual(getTautologicalConsequenceCounter(p5, c5), undefined);
    assert.deepEqual(getTautologicalConsequenceCounter(p5, formulas.or), {
      p: false,
      q: false,
    });
    assert.deepEqual(
      getTautologicalConsequenceCounter(p5, formulas.implication1),
      {
        p: true,
        q: false,
      }
    );

    const p6 = [formulas.contradiction, p, q, r];
    assert.deepEqual(
      getTautologicalConsequenceCounter(p6, formulas.contradiction),
      undefined
    );
    assert.deepEqual(
      getTautologicalConsequenceCounter(p6, formulas.implication2),
      undefined
    );
    assert.deepEqual(
      getTautologicalConsequenceCounter(p6, formulas.or),
      undefined
    );
    assert.deepEqual(
      getTautologicalConsequenceCounter(p6, formulas.tautology),
      undefined
    );
    assert.deepEqual(
      getTautologicalConsequenceCounter(p6, new Not(q)),
      undefined
    );
  },
};

module.exports = tests;
