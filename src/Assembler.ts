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
// let inputFile = "/Code.asm";
let inputFile = "/AssemblerV2.asm";
let codeAddr = codeLoader(processor, inputFile);
let addrStart = 240;
let addr = addrStart;
let instructionCount = 14;
// let outputFileName = "Output.bin";
let outputFileName = "AssemblerV2.bin";

while (processor.RAM[codeAddr] != -1) {

  //Getting the Opcode and storing in Register B
  for (let opCode = 0; opCode < instructionCount; opCode++) {

    let instPtr = opCode * 16;
    let codePtr = codeAddr;
    processor.regA = 1;
    while (processor.RAM[instPtr] + 1 != 0) {
      if (processor.RAM[instPtr] != processor.RAM[codePtr]) {
        processor.regA = 0;
        break;
      }
      instPtr++;
      codePtr++;
    };
    if (processor.regA == 1) {
      processor.regB = opCode;
      codeAddr = codePtr;
      break;
    }
  };

  processor.RAM[addr] = processor.regB;
  addr++;

  codeAddr++;

  while (processor.RAM[codeAddr] != 59) {


    // while (processor.RAM[codeAddr] - 59 != 0) {

    if (processor.RAM[codeAddr] == 44) {
      // if (processor.RAM[codeAddr] - 44 == 0) {
      codeAddr++;
      continue;
    };

    //Immediate value or Address Value
    if (processor.RAM[codeAddr] == 35 || processor.RAM[codeAddr] == 38) {
      // if (processor.RAM[codeAddr] - 35 == 0 || processor.RAM[codeAddr] - 38 == 0) {
      processor.RAM[addr] = processor.RAM[codeAddr];
      addr++;
      codeAddr++;

      processor.regC = processor.RAM[codeAddr] - 48;
      codeAddr++;
      while (processor.RAM[codeAddr] != 44 && processor.RAM[codeAddr] != 59) {
        // while (processor.RAM[codeAddr] - 44 != 0 && processor.RAM[codeAddr] - 59 != 0) {
        processor.regC = processor.regC * 10 + (processor.RAM[codeAddr] - 48);
        codeAddr++;
      };
    }
    //Register value
    else if (processor.RAM[codeAddr] == 64) {
      // else if (processor.RAM[codeAddr] - 64 == 0) {
      processor.RAM[addr] = processor.RAM[codeAddr];
      addr++;
      codeAddr++;
      processor.regC = processor.RAM[codeAddr] - 64;
      codeAddr++;
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

  codeAddr++;
};

const bufferArr = [];

for (let ptr = addrStart; ptr < addr; ptr++) bufferArr.push(processor.RAM[ptr]);

fs.writeFileSync(outputFileName, Buffer.from([]));

fs.writeFileSync(outputFileName, Buffer.concat([fs.readFileSync(outputFileName), Buffer.from(bufferArr)]));