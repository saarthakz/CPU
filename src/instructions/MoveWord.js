export default function moveWord(processor, first, second) {

  let regA = first.operand;
  let regB = second.operand;
  let addr = processor[`reg${String.fromCharCode(regB + 64)}`];

  processor[`reg${String.fromCharCode(regA + 65)}`] = processor.RAM[addr];
};
