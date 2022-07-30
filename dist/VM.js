"use strict";
/*

Instruction Set:
  0: MW   regA, regB         -> regA = regB
  1: LW   regA, imm8/addr    -> reg = imm8/RAM[addr]
  2: SW   addr, imm8/reg     -> RAM[addr] = reg/imm8
  3: JNZ  imm8/reg addr      -> imm8/reg != 0 ? PC = addr : PC+1
  4: IN  reg, addr           -> reg = PORT[addr]
  5: OUT addr, reg           -> PORT[addr] = reg
  6: ADD regA, imm8/regB     -> regA = regA + imm8/regB
  7: SUB regA, imm8/regB     -> regA = regA - imm8/regB
  8: MUL regA, imm8/regB     -> regA = regA * imm8/regB
  9: DIV regA, imm8/regB     -> regA = regA / imm8/regB
  A: AND  regA, imm8/regB    -> regA = regA & imm8/regB
  B: OR   regA, imm8/regB    -> regA = regA | imm8/regB
  C: NOT  regA, imm8/regB    -> regA = ~(imm8/regB)
  D: CMP regA, imm8/regB     -> regA = reg XOR imm8/regB

Prefix:
  # -> Immediate
  & -> Address
  @ -> Register

Syntax:
  Opcode:Op1,Op2;
  Operands need to be in Big Endian Format

Boundaries:
  Addresses & Immediate values can only be in the range of [0,65535]
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CPU_1 = require("./CPU");
const BinaryLoader_1 = __importDefault(require("./functions/BinaryLoader"));
const Execute_1 = __importDefault(require("./functions/Execute"));
const GetOperand_1 = __importDefault(require("./functions/GetOperand"));
const ASCII_Map = {
    "\n": 10,
    "\r": 13,
    " ": 32,
    "#": 35,
    "&": 38,
    ",": 44,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    ":": 58,
    ";": 59,
    "@": 64,
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
let addr = (0, BinaryLoader_1.default)(CPU_1.processor);
while (CPU_1.processor.RAM[addr] != -1) {
    let opCode = CPU_1.processor.RAM[addr];
    addr++;
    let first = (0, GetOperand_1.default)(CPU_1.processor, addr);
    addr = first.returnAddr;
    let second = (0, GetOperand_1.default)(CPU_1.processor, addr);
    addr = second.returnAddr;
    (0, Execute_1.default)(CPU_1.processor, opCode, first, second);
}
;
