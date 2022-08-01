import { CPU } from "../CPU";
import { input } from "../functions/Execute";

/*
Register Params
A: 1
B: 2
C: 3
D: 4
 */

export default function moveWord(processor, first, second) {

  let regA = first.operand;
  let regB = second.operand;

  processor[`reg${String.fromCharCode(regA + 65)}`] = processor[`reg${String.fromCharCode(regB + 64)}`];
};
