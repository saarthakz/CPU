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
codeLoader(processor, "/Code.asm");

let CodeAddr = 4000;
let addr = 200;
let instructionCount = 14;

while (processor.RAM[CodeAddr] != -1) {

  //Getting the Opcode and storing in Register B
  for (let opCode = 0; opCode < instructionCount; opCode++) {
    const baseAddress = opCode * 16;
    let RAM_Ctr = baseAddress;
    let codePtr = CodeAddr;
    processor.regA = 1;
    while (processor.RAM[RAM_Ctr] != -1) {
      if (processor.RAM[RAM_Ctr] != processor.RAM[codePtr]) {
        processor.regA = 0;
        break;
      }
      RAM_Ctr++;
      codePtr++;
    };
    if (processor.regA == 1) {
      processor.regB = opCode;
      CodeAddr = codePtr;
      break;
    }
  };

  processor.RAM[addr] = processor.regB;
  addr++;

  CodeAddr++;

  while (processor.RAM[CodeAddr] != 59) {

    if (processor.RAM[CodeAddr] == 44) {
      CodeAddr++;
      continue;
    };

    //Immediate value or Address Value
    if (processor.RAM[CodeAddr] == 35 || processor.RAM[CodeAddr] == 38) {
      processor.RAM[addr] = processor.RAM[CodeAddr];
      addr++;
      CodeAddr++;

      processor.regC = processor.RAM[CodeAddr] - 48;
      CodeAddr++;
      while (processor.RAM[CodeAddr] != 44 && processor.RAM[CodeAddr] != 59) {
        processor.regC = processor.regC * 10 + (processor.RAM[CodeAddr] - 48);
        CodeAddr++;
      };
    }
    //Register value
    else if (processor.RAM[CodeAddr] == 64) {
      processor.RAM[addr] = processor.RAM[CodeAddr];
      addr++;
      CodeAddr++;
      processor.regC = processor.RAM[CodeAddr] - 64;
      CodeAddr++;
    };

    processor.regD = addr;

    if (processor.regC == 0) {
      processor.RAM[addr] = 0;
      addr++;
    };

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

    if (processor.regD == addr) {
      processor.RAM[addr] = 0;
      addr++;
    };

  };

  CodeAddr++;
};

const bufferArr = [];

for (let ptr = 200; ptr < addr; ptr++) bufferArr.push(processor.RAM[ptr]);

fs.writeFileSync("Output.bin", Buffer.from([]));

fs.writeFileSync("Output.bin", Buffer.concat([fs.readFileSync("Output.bin"), Buffer.from(bufferArr)]));

