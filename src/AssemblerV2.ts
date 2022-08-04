import fs from "node:fs";
import { processor } from "./CPU";
import codeLoader from "./functions/CodeLoader";
import instructionLoader from "./functions/InstructionLoader";
import runVM from "./functions/RunVM";

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
(async () => {
  instructionLoader(processor);
  // let inputFile = "/AssemblerV2.asm";
  let inputFile = "/Code.asm";
  codeLoader(processor, inputFile);
  let outputFileName = "Output.bin";
  // let outputFileName = "AssemblerV2.bin";

  await runVM(processor, "AssemblerV2.bin");

  console.log(processor);

  // let outputFileName = "Output.bin";
  // let outputFileName = "AssemblerV2.bin";


  // const bufferArr: number[] = [];


  // fs.writeFileSync(outputFileName, Buffer.from([]));

  // fs.writeFileSync(outputFileName, Buffer.concat([fs.readFileSync(outputFileName), Buffer.from(bufferArr)]));

})();