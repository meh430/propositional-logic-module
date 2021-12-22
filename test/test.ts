import fs from "fs";

export interface TestSuite {
  [key: string]: () => void;
}

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "test.ts" || file.substr(file.lastIndexOf(".") + 1) !== "ts") {
    return;
  }

  const name = file.substring(0, file.indexOf("."));
  const test: TestSuite = require("./" + name);

  describe(name, () => {
    for (const t in test) {
      it(t, test[t]);
    }
  });
});
