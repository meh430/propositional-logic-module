"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenDisjunction = exports.flattenConjunction = exports.equalSets = exports.difference = exports.intersection = exports.union = exports.collectSymbols = exports.generateValuations = void 0;
const logic_1 = require("../logic");
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
function equalSets(a, b) {
    if (a.size !== b.size) {
        return false;
    }
    for (const elem of a) {
        if (!b.has(elem)) {
            return false;
        }
    }
    return true;
}
exports.equalSets = equalSets;
// given ((A and H) and ((B and (F and G)) and (C and D)))
// return (A and H and B and F and G and C and D)
function flattenConjunction(conjunction) {
    const operands = [];
    conjunction.getOperands().forEach((c) => {
        if (c instanceof logic_1.And) {
            const flattened = flattenConjunction(c);
            if (flattened instanceof logic_1.And) {
                operands.push(...flattened.getOperands());
            }
            else {
                operands.push(flattened);
            }
        }
        else {
            operands.push(c);
        }
    });
    return operands.length <= 1 ? operands[0] : new logic_1.And(...operands);
}
exports.flattenConjunction = flattenConjunction;
function flattenDisjunction(disjunction) {
    const operands = [];
    disjunction.getOperands().forEach((d) => {
        if (d instanceof logic_1.Or) {
            const flattened = flattenDisjunction(d);
            if (flattened instanceof logic_1.Or) {
                operands.push(...flattened.getOperands());
            }
            else {
                operands.push(flattened);
            }
        }
        else {
            operands.push(d);
        }
    });
    return operands.length <= 1 ? operands[0] : new logic_1.Or(...operands);
}
exports.flattenDisjunction = flattenDisjunction;
//# sourceMappingURL=Utils.js.map