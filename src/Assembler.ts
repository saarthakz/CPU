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

import processor from "./CPU";

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

const ASCII_Map: any = {
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
    processor.RAM[ctr] = byte;
    ctr++;
  });
});

import fs from "node:fs";
let data = fs.readFileSync("./Code.txt");
let stringData = new Array<string>(data.length);
data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));

stringData = stringData.join("").split("\r\n");

stringData.forEach((dataLine) => {
  for (let _idx = 0; _idx < instructions.length; _idx++) {
    const instruction = instructions[_idx];
    const baseAddress = instruction.decimal * 16;
    let RAM_Ctr = baseAddress;
    let ctr = 0;
    processor.regA = 1;
    while (processor.RAM[RAM_Ctr] != -1) {
      if (processor.RAM[RAM_Ctr] != dataLine[ctr].charCodeAt(0)) {
        processor.regA = 0;
        break;
      }
      RAM_Ctr++;
      ctr++;
    };
    if (processor.regA == 1) {
      processor.regB = instruction.opCode;
      break;
    };
  };


});



