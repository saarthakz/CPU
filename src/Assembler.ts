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

Boundaries:
  Addresses & Immediate values can only be in the range of [0,255]
*/

import { processor } from "./CPU";
import fs from "node:fs";
import codeLoader from "./functions/CodeLoader";
import instructionLoader from "./functions/InstructionLoader";


let instructions = [
  { mnemonic: 'MW', decimal: 0, opCode: 0 },
  { mnemonic: 'LW', decimal: 1, opCode: 1 },
  { mnemonic: 'SW', decimal: 2, opCode: 2 },
  { mnemonic: 'JNZ', decimal: 3, opCode: 3 },
  { mnemonic: 'IN', decimal: 4, opCode: 4 },
  { mnemonic: 'OUT', decimal: 5, opCode: 5 },
  { mnemonic: 'ADD', decimal: 6, opCode: 6 },
  { mnemonic: 'SUB', decimal: 7, opCode: 7 },
  { mnemonic: 'MUL', decimal: 8, opCode: 8 },
  { mnemonic: 'DIV', decimal: 9, opCode: 9 },
  { mnemonic: 'AND', decimal: 10, opCode: 10 },
  { mnemonic: 'OR', decimal: 11, opCode: 11 },
  { mnemonic: 'NOT', decimal: 12, opCode: 12 },
  { mnemonic: 'CMP', decimal: 13, opCode: 13 }
];

const ASCII_Map: any = {
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

codeLoader(processor, "/Code.txt");
instructionLoader(processor);

let data = fs.readFileSync("./Code.txt");
let stringData = new Array<string>(data.length);
data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));

stringData = stringData.join("").split("\r\n");

stringData.forEach((dataLine) => {

  let dataLinePtr = 0;

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
      dataLinePtr = ctr;
      break;
    };
  };

  //Invalid Instruction if Register B Value == 0

  //Opcode in Register B & Byte Pointer in Variable: dataLinePtr

  //Storing Operands in RAM from address 200 onwards


  let addr = 200;
  dataLinePtr++;

  while (dataLine[dataLinePtr].charCodeAt(0) != 59) {

    if (dataLine[dataLinePtr].charCodeAt(0) == 44) {
      dataLinePtr++;
      continue;
    };

    //Immediate value or Address Value
    if (dataLine[dataLinePtr].charCodeAt(0) == 35 || dataLine[dataLinePtr].charCodeAt(0) == 38) {
      processor.RAM[addr] = dataLine[dataLinePtr].charCodeAt(0);
      addr++;
      dataLinePtr++;
      processor.regC = Number(dataLine[dataLinePtr]);
      dataLinePtr++;
      while (dataLine[dataLinePtr].charCodeAt(0) != 44 && dataLine[dataLinePtr].charCodeAt(0) != 59) {
        processor.regC = (Number(processor.regC) * 10) + Number(dataLine[dataLinePtr]);
        dataLinePtr++;
      };

      while (processor.regC != 0) {
        processor.RAM[addr] = processor.regC % 16;
        processor.regC = Math.floor(processor.regC / 16);
        processor.RAM[addr] = (16 * processor.RAM[addr]) + processor.regC % 16;
        processor.regC = Math.floor(processor.regC / 16);
        addr++;
      };
    }
    //Register value
    else if (dataLine[dataLinePtr].charCodeAt(0) == 64) {

      while (dataLine[dataLinePtr].charCodeAt(0) != 44 && dataLine[dataLinePtr].charCodeAt(0) != 59) {
        processor.RAM[addr] = dataLine[dataLinePtr].charCodeAt(0);
        addr++;
        dataLinePtr++;
      };

    };

  };

  const bufferArr = [Number(processor.regB)];

  for (let ptr = 200; ptr < addr; ptr++) bufferArr.push(processor.RAM[ptr]);

  console.log(bufferArr);

  // fs.writeFileSync("Output.bin", Buffer.concat([fs.readFileSync("Output.bin"), Buffer.from(bufferArr)]));

});



