"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.difference = exports.intersection = exports.union = exports.collectSymbols = exports.generateValuations = void 0;
function generateValuations(symbols) {
    if (symbols.size == 0) {
        return [];
    }
    const syms = [...symbols];
    const valuations = [];
    function generateBinaryStrings(bits, binary, index) {
        if (index == bits) {
            const valuation = {};
            binary.forEach((b, i) => (valuation[syms[i]] = Boolean(b)));
            valuations.push(valuation);
            return;
        }
        binary[index] = 0;
        generateBinaryStrings(bits, binary, index + 1);
        binary[index] = 1;
        generateBinaryStrings(bits, binary, index + 1);
    }
    generateBinaryStrings(syms.length, new Array(syms.length).fill(0), 0);
    return valuations;
}
exports.generateValuations = generateValuations;
function collectSymbols(formulas) {
    const symbols = new Set();
    formulas.forEach((f) => {
        f.getSymbols().forEach((s) => {
            symbols.add(s);
        });
    });
    return symbols;
}
exports.collectSymbols = collectSymbols;
function union(a, b) {
    return new Set([...a, ...b]);
}
exports.union = union;
function intersection(a, b) {
    return new Set([...a].filter((e) => b.has(e)));
}
exports.intersection = intersection;
function difference(a, b) {
    return new Set([...a].filter((e) => !b.has(e)));
}
exports.difference = difference;
//# sourceMappingURL=Utils.js.map