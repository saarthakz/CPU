import { CPU } from "../CPU";
import { input } from "../functions/Execute";

export default function storeWord(processor, first, second) {
  let addr = first.operand;

  if (second.identifier == 38) processor.RAM[addr] = second.operand;
  else processor.RAM[addr] = processor[`reg${String.fromCharCode(second.operand + 64)}`];
};