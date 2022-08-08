import { CPU } from "../CPU";

export default function instructionLoader(processor: CPU) {

  let instructions = [
    { mnemonic: 'MW', decimal: 0, opCode: 0 },
    { mnemonic: 'LW', decimal: 1, opCode: 1 },
    { mnemonic: 'SW', decimal: 2, opCode: 2 },
    { mnemonic: 'JNZ', decimal: 3, opCode: 3 },
    { mnemonic: 'IN', decimal: 4, opCode: 4 },
    { mnemonic: 'OUT', decimal: 5, opCode: 5 },
    { mnemonic: 'ADD', decimal: 6, opCode: 6 },
    { mnemonic: 'SUB', decimal: 7, opCode: 7 },
    { mnemonic: 'MUL', decimal: 8, opCode: 8 },
    { mnemonic: 'DIV', decimal: 9, opCode: 9 },
    { mnemonic: 'MOD', decimal: 10, opCode: 10 },
    { mnemonic: 'AND', decimal: 11, opCode: 11 },
    { mnemonic: 'OR', decimal: 12, opCode: 12 },
    { mnemonic: 'NOT', decimal: 13, opCode: 13 },
    { mnemonic: 'CMP', decimal: 14, opCode: 14 }
  ];

  instructions.forEach((instruction) => {
    const baseAddress = instruction.decimal * 16;
    const mnemonicBytes = instruction.mnemonic.split("").map((char) => char.charCodeAt(0));
    let ctr = baseAddress;
    mnemonicBytes.forEach((byte) => {
      processor.RAM[ctr] = byte;
      ctr++;
    });
  });
};