export default function storeWord(processor, first, second) {
  let addr;
  if (first.identifier == 64) {
    // Address stored in a Register
    addr = processor[`reg${String.fromCharCode(first.operand + 64)}`];
  } else {
    addr = first.operand;
  };

  if (second.identifier == 35) processor.RAM[addr] = second.operand;
  else processor.RAM[addr] = processor[`reg${String.fromCharCode(second.operand + 64)}`];
};