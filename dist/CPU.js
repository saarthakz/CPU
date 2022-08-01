"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPU = exports.processor = void 0;
class CPU {
    constructor(RAM) {
        this.regA = 0;
        this.regB = 0;
        this.regC = 0;
        this.regD = 0;
        this.PC = 0;
        this.RAM = RAM;
        this.memSize = RAM.length;
    }
    ;
}
exports.CPU = CPU;
;
const processor = new CPU(new Array(2 ** 18).fill(-1));
exports.processor = processor;
