import { CPU } from "../CPU";
import fs from "node:fs";

export default function binaryLoader(processor: CPU, path: string) {
  let addr = 4000;
  const data = fs.readFileSync(path);

  data.forEach((num, idx) => processor.RAM[addr + idx] = num);
  processor.PC = addr;
};