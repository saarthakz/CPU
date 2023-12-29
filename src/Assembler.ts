import fs from "node:fs";
import { CPU } from "./CPU";
import codeLoader from "./functions/CodeLoader";
import instructionLoader from "./functions/InstructionLoader";

const processor = new CPU(new Array<number>(2 ** 16).fill(-1));

// let inputFile = "/Code.asm";
instructionLoader(processor)
let inputFile = "/AssemblerV2.asm";
let codeAddr = codeLoader(processor, inputFile); // 2 ** 15 = 32768
let addrStart = 270; // Address where the 'compiled' code starts from
let addr = addrStart;
let instructionCount = 15;
// let outputFileName = "Output.bin";
let outputFileName = "AssemblerV2.bin";

// While parsing the Assembly code text
while (processor.RAM[codeAddr] != -1) {

  // Get the Opcode and storing in Register B [Do so by iterating through all the opcodes ]
  for (let opCode = 0; opCode < instructionCount; opCode++) {

    
    let instPtr = opCode * 3; // For each opcode, the instruction text is loaded at the base address: opcode * 3
    let codePtr = codeAddr; // Setting the code pointer as the code starting address 

    processor.regA = 1; // Setting the Register A value as 1 [as a flag] 1 = Opcode found, 0 = Opcode not found

    // While we don't reach the end of the instruction text 
    while (processor.RAM[instPtr] + 1 != 0) {

      // If the instruction text is not matching with the code text break out of this instruction text loop and move to the next opcode for checking 
      if (processor.RAM[instPtr] != processor.RAM[codePtr]) {
        processor.regA = 0; // Setting the Register A value = 0 because current opcode is not the one in the code
        break;
      };
      instPtr++;
      codePtr++;
    };

    // Check to see if the opcode is found or not [If the above loop runs completely, the opcode is found hence Register A value = 1] If found, break out of the opcode finding loop
    if (processor.regA == 1) {
      // Storing the opcode value in Register B
      processor.regB = opCode;
      codeAddr = codePtr; // Update the code address to the current code pointer which is now pointing to ":" as per the syntax it comes after the opcode mnemonic 
      break;
    };
  }; 

  codeAddr++; // codeAddr previously pointing to ":" is now pointing to the highest digit of the first operand
  processor.RAM[addr] = processor.regB;

  // Until we reach the end of code line seperator ';', run this loop
  while (processor.RAM[codeAddr] != 59) {

    // If you encounter an operand seperator "," ignore it and move to the next address
    if (processor.RAM[codeAddr] == 44) {
      codeAddr++;
      continue;
    };

    //If you encounter an Immediate value [# | 35] or Address Value [& | 38]
    if (processor.RAM[codeAddr] == 35 || processor.RAM[codeAddr] == 38) {
      codeAddr++;

      // ASCII 48 value is 0, 49 is 1 and so on
      // Register C stores the highest decimal digit of the operand
      processor.regC = processor.RAM[codeAddr] - 48;
      codeAddr++; // Moving to the next character

      // While the current character is not a ',' [Operand seperator] or not a ';' [End of line character] do the following
      while (processor.RAM[codeAddr] != 44 && processor.RAM[codeAddr] != 59) {
        processor.regC *= 10
        processor.regD = processor.RAM[codeAddr] - 48
        processor.regC += processor.regD
        codeAddr++; //Getting the decimal from ASCII
      };
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