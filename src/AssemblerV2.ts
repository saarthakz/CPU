import fs from "node:fs";
import { CPU } from "./CPU";
import codeLoader from "./functions/CodeLoader";
import instructionLoader from "./functions/InstructionLoader";
import runVM from "./functions/RunVM";

(async () => {
  const processor = new CPU(new Array<number>(2 ** 16).fill(-1));

  instructionLoader(processor);
  let inputFile = "/Code.asm";
  codeLoader(processor, inputFile);
  let outputFileName = "Output.bin";

  await runVM(processor, "AssemblerV2.bin");

  let addr = processor.RAM[49152];

  const bufferArr: number[] = [];

  for (let ptr = 270; ptr < addr; ptr++) {
    bufferArr.push(processor.RAM[ptr]);
  }

  fs.writeFileSync(outputFileName, Buffer.from([]));

  fs.writeFileSync(outputFileName, Buffer.concat([fs.readFileSync(outputFileName), Buffer.from(bufferArr)]));

})();