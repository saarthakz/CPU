import fs from "node:fs";
import { CPU } from "./CPU";
import codeLoader from "./functions/CodeLoader";
import instructionLoader from "./functions/InstructionLoader";

const processor = new CPU(new Array<number>(2 ** 16).fill(-1));
instructionLoader(processor);
// let inputFile = "/Code.asm";
let inputFile = "/AssemblerV2.asm";
let codeAddr = codeLoader(processor, inputFile);
let addrStart = 270;
let addr = addrStart;
let instructionCount = 15;
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

    if (processor.RAM[codeAddr] == 44) {
      codeAddr++;
      continue;
    };

    //Immediate value or Address Value
    if (processor.RAM[codeAddr] == 35 || processor.RAM[codeAddr] == 38) {
      processor.RAM[addr] = processor.RAM[codeAddr];
      addr++;
      codeAddr++;

      processor.regC = processor.RAM[codeAddr] - 48;
      codeAddr++;
      while (processor.RAM[codeAddr] != 44 && processor.RAM[codeAddr] != 59) {
        processor.regC = processor.regC * 10 + (processor.RAM[codeAddr] - 48);
        codeAddr++; //Getting the decimal from ASCII
      };
    }
    //Register value
    else if (processor.RAM[codeAddr] == 64) {
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
    // Jump back to while loop
  };

  codeAddr++;
};

const bufferArr = [];

for (let ptr = addrStart; ptr < addr; ptr++) bufferArr.push(processor.RAM[ptr]);

fs.writeFileSync(outputFileName, Buffer.from([]));

fs.writeFileSync(outputFileName, Buffer.concat([fs.readFileSync(outputFileName), Buffer.from(bufferArr)]));