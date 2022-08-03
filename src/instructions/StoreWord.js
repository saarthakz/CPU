export default function storeWord(processor, first, second) {
  let addr = first.operand;

  if (second.identifier == 35) processor.RAM[addr] = second.operand;
  else processor.RAM[addr] = processor[`reg${String.fromCharCode(second.operand + 64)}`];
};