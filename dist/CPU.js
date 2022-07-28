"use strict";
/*
0: MW   regA, regB       -> regA = regB
1: LW   regA, imm8/addr  -> reg = imm8/RAM[addr]
2: SW   addr, imm8/reg   -> RAM[addr] = reg/imm8
3: JNZ  imm8/reg addr    -> imm8/reg != 0 ? PC = addr : PC+1
4: IN  reg, imm8/reg     -> reg = PORT[imm8/reg]
5: OUT imm8/reg, reg     -> PORT[imm8/reg] = reg
6: ADD regA, imm8/regB     -> regA = regA + imm8/regB
7: AND  regA, imm8/regB    -> regA = regA & imm8/regB
8: OR   regA, imm8/regB    -> regA = regA | imm8/regB
9: NOT  regA, imm8/regB    -> regA = ~(imm8/regB)
A: CMP regA, imm8/regB     -> regA = reg XOR imm8/regB
*/
Object.defineProperty(exports, "__esModule", { value: true });
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
;
const processor = new CPU(new Array(8192).fill(-1));
exports.default = processor;
