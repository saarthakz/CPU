import { CPU } from "../CPU";
import binaryLoader from "./BinaryLoader";
import execute from "./Execute";
import getOperand from "./GetOperand";

export default async function runVM(processor: CPU, binPath: string) {
  binaryLoader(processor, binPath);

  while (processor.RAM[processor.PC] != -1) {
    let opCode = processor.RAM[processor.PC];

    processor.PC++;
    let first = getOperand(processor);
    let second = getOperand(processor);

    await execute(processor, opCode, first, second);
  };
};