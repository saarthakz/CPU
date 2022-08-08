import { CPU } from "./CPU";
import runVM from "./functions/RunVM";

const processor = new CPU(new Array<number>(2 ** 16).fill(-1));
runVM(processor, "Output.bin");