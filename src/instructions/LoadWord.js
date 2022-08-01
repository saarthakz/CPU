import { CPU } from "../CPU";
import { input } from "../functions/Execute";

export default function loadWord(processor, first, second) {
  let reg = first.operand;

  if (second.identifier == 35) processor[`reg${String.fromCharCode(reg + 64)}`] = second.operand;
  else processor[`reg${String.fromCharCode(reg + 64)}`] = processor.RAM[second.operand];
};