"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CPU {
    constructor(RAM, regA = 0, regB = 0, regC = 0, regD = 0) {
        this.RAM = RAM;
        this.memSize = RAM.length;
        this.regA = regA;
        this.regB = regB;
        this.regC = regC;
        this.regD = regD;
    }
    ;
}
;
const processor = new CPU(new Array(8192).fill(-1));
exports.default = processor;
