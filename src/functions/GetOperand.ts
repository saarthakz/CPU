import { CPU } from "../CPU";

export default function getOperand(processor: CPU) {
  let identifier = processor.RAM[processor.PC]; // Currently PC points to identifier
  processor.PC++; // Now the PC points to the first digit of the operand
  let operand: number;

  if (identifier == 64) {
    //Register Operand
    operand = processor.RAM[processor.PC];
    processor.PC += 2;
  } else {
    //Immediate or processor.PC address as operand
    let firstByte = processor.RAM[processor.PC];
    processor.PC++;
    let secondByte = processor.RAM[processor.PC];
    processor.PC++;
    let num = 0;
    let exp = 0;
    for (let idx = 0; idx < 2; idx++) {
      num += (firstByte % 16) * (16 ** exp);
      firstByte = Math.floor(firstByte / 16);
      exp++;
    };

    for (let idx = 0; idx < 2; idx++) {
      num += (secondByte % 16) * (16 ** exp);
      secondByte = Math.floor(secondByte / 16);
      exp++;
    };
    operand = num;
  };

  return { operand, identifier };
}