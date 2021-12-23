"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectSymbols = exports.generateValuations = void 0;
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
//# sourceMappingURL=Utils.js.map