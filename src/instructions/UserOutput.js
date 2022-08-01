export default function userOutput(processor, first, second) {
  if (first.identifier == 38)
    console.log(`RAM[${first.operand}]: ${processor.RAM[first.operand]}`);
  else console.log(`Register ${String.fromCharCode(first.operand + 64)}: ${processor[`reg${String.fromCharCode(first.operand + 64)}`]}`);
};