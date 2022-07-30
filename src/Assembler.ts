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

import fs from "node:fs";
import { processor } from "./CPU";
import codeLoader from "./functions/CodeLoader";
import instructionLoader from "./functions/InstructionLoader";

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

instructionLoader(processor);
codeLoader(processor, "/Code.txt");

let RAM_Addr = 4000;
let addr = 200;
let instructionCount = 14;

while (processor.RAM[RAM_Addr] != -1) {

  //Getting the Opcode and storing in Register B
  for (let opCode = 0; opCode < instructionCount; opCode++) {
    const baseAddress = opCode * 16;
    let RAM_Ctr = baseAddress;
    processor.regA = 1;
    while (processor.RAM[RAM_Ctr] != -1) {
      if (processor.RAM[RAM_Ctr] != processor.RAM[RAM_Addr]) {
        processor.regA = 0;
        break;
      }
      RAM_Ctr++;
      RAM_Addr++;
    };
    if (processor.regA == 1) {
      processor.regB = opCode;
      break;
    };
  };

  RAM_Addr++;

  while (processor.RAM[RAM_Addr] != 59) {


    if (processor.RAM[RAM_Addr] == 44) {
      RAM_Addr++;
      continue;
    };

    //Immediate value or Address Value
    if (processor.RAM[RAM_Addr] == 35 || processor.RAM[RAM_Addr] == 38) {
      processor.RAM[addr] = processor.RAM[RAM_Addr];
      addr++;
      RAM_Addr++;
      processor.regC = processor.RAM[RAM_Addr] - 48;
      RAM_Addr++;
      while (processor.RAM[RAM_Addr] != 44 && processor.RAM[RAM_Addr] != 59) {
        processor.regC = processor.regC * 10 + (processor.RAM[RAM_Addr] - 48);
        RAM_Addr++;
      };
    }
    //Register value
    else if (processor.RAM[RAM_Addr] == 64) {
      processor.RAM[addr] = processor.RAM[RAM_Addr];
      addr++;
      RAM_Addr++;
      processor.regC = processor.RAM[RAM_Addr] - 64;
      RAM_Addr++;
    };

    processor.regD = addr;

    while (processor.regC != 0) {
      processor.RAM[addr] = processor.regC % 16;
      processor.regC = Math.floor(processor.regC / 16);
      processor.RAM[addr] += (16 * (processor.regC % 16));
      processor.regC = Math.floor(processor.regC / 16);
      addr++;
    };

    if (processor.regD + 1 == addr) {
      processor.RAM[addr] = 0;
      addr++;
    };
  };

  RAM_Addr++;
};

const bufferArr = [Number(processor.regB)];

for (let ptr = 200; ptr < addr; ptr++) bufferArr.push(processor.RAM[ptr]);

console.log(bufferArr);
console.log(Buffer.from(bufferArr));


// fs.writeFileSync("Output.bin", Buffer.concat([fs.readFileSync("Output.bin"), Buffer.from(bufferArr)]));

