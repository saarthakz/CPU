import { CPU } from "../CPU";
import fs from "node:fs";

export default function binaryLoader(processor: CPU) {
  let addr = 4000;
  const data = fs.readFileSync("Output.bin");
  data.forEach((num, idx) => processor.RAM[addr + idx] = num);
  processor.PC = addr;
};