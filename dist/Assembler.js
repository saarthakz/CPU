"use strict";
/*
0: MW   reg, imm8/reg   -> reg = imm8/reg
1: LW   reg, [HL/imm16] -> reg = [HL/imm16]
2: SW   [HL/imm16], reg -> [HL/imm16] = reg
3: JNZ  imm8/reg        -> imm8/reg != 0 ? PC = HL : NOP
4: IN  reg, imm8/reg   -> reg = PORT[imm8/reg]
5: OUT imm8/reg, reg   -> PORT[imm8/reg] = reg
6: ADD reg, imm8/reg   -> reg = reg + imm8/reg +
7: AND  reg, imm8/reg   -> reg = reg & imm8/reg
8: OR   reg, imm8/reg   -> reg = reg | imm8/reg
9: NOT  reg, imm8/reg   -> reg = ~(reg | imm8/reg)
A: CMP reg, imm8/reg   -> f = compare reg, imm8/reg (see below)
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CPU_1 = __importDefault(require("./CPU"));
let instructions = [
    { mnemonic: 'MW', decimal: 0, opCode: '0' },
    { mnemonic: 'SW', decimal: 1, opCode: '1' },
    { mnemonic: 'LW', decimal: 2, opCode: '2' },
    { mnemonic: 'JNZ', decimal: 3, opCode: '3' },
    { mnemonic: 'IN', decimal: 4, opCode: '4' },
    { mnemonic: 'OUT', decimal: 5, opCode: '5' },
    { mnemonic: 'ADD', decimal: 6, opCode: '6' },
    { mnemonic: 'AND', decimal: 7, opCode: '7' },
    { mnemonic: 'OR', decimal: 8, opCode: '8' },
    { mnemonic: 'NOT', decimal: 9, opCode: '9' },
    { mnemonic: 'CMP', decimal: 10, opCode: 'A' }
];
const ASCII_Map = {
    "\n": 10,
    "\r": 13,
    " ": 32,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
};
instructions.forEach((instruction) => {
    const baseAddress = instruction.decimal * 16;
    const mnemonicBytes = instruction.mnemonic.split("").map((char) => char.charCodeAt(0));
    let ctr = baseAddress;
    mnemonicBytes.forEach((byte) => {
        CPU_1.default.RAM[ctr] = byte;
        ctr++;
    });
});
const node_fs_1 = __importDefault(require("node:fs"));
let data = node_fs_1.default.readFileSync("./Code.txt");
let stringData = new Array(data.length);
data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));
stringData = stringData.join("").split("\r\n");
stringData.forEach((dataLine) => {
    // const byte = dataLine[idx].charCodeAt(0);
    for (let _idx = 0; _idx < instructions.length; _idx++) {
        const instruction = instructions[_idx];
        const baseAddress = instruction.decimal * 16;
        let RAM_Ctr = baseAddress;
        let ctr = 0;
        CPU_1.default.regA = 1;
        while (CPU_1.default.RAM[RAM_Ctr] != -1) {
            if (CPU_1.default.RAM[RAM_Ctr] != dataLine[ctr].charCodeAt(0)) {
                CPU_1.default.regA = 0;
                break;
            }
            RAM_Ctr++;
            ctr++;
        }
        ;
        if (CPU_1.default.regA == 1) {
            CPU_1.default.regB = instruction.opCode;
            break;
        }
        ;
    }
    ;
    console.log(CPU_1.default.regB);
});
// data.forEach((byte) => console.log(`Byte: ${byte.toString(16)}`));
// console.log(Array.from(data));
// console.log("#".charCodeAt(0));
