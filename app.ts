const l = require("./logic");
console.log(l.isSatisfiableSet([]));

/*const p = new Symbol("p");
const q = new Symbol("q");
const r = new Symbol("r");
const s = new Symbol("s");
console.log(
  dpp(
    [
      new Or(new Not(p), q),
      new Or(new Not(q), new Not(r), s),
      p,
      r,
      new Not(s),
    ],
    ["p", "q", "r", "s"]
  )
);*/
