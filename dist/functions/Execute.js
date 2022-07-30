"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*

Instruction Set:
  0: MW   regA, regB         -> regA = regB
  1: LW   regA, imm8/addr    -> reg = imm8/RAM[addr]
  2: SW   addr, imm8/reg     -> RAM[addr] = reg/imm8
  3: JNZ  imm8/reg addr      -> imm8/reg != 0 ? PC = addr : PC+1
  4: IN  reg, addr           -> reg = PORT[addr]
  5: OUT addr, reg           -> PORT[addr] = reg
  6: ADD regA, imm8/regB     -> regA = regA + imm8/regB
  7: SUB regA, imm8/regB     -> regA = regA - imm8/regB
  8: MUL regA, imm8/regB     -> regA = regA * imm8/regB
  9: DIV regA, imm8/regB     -> regA = regA / imm8/regB
  A: AND  regA, imm8/regB    -> regA = regA & imm8/regB
  B: OR   regA, imm8/regB    -> regA = regA | imm8/regB
  C: NOT  regA, imm8/regB    -> regA = ~(imm8/regB)
  D: CMP regA, imm8/regB     -> regA = reg XOR imm8/regB

Prefix:
  # -> Immediate
  & -> Address
  @ -> Register

Syntax:
  Opcode:Op1,Op2;
  Operands need to be in Big Endian Format

Boundaries:
  Addresses & Immediate values can only be in the range of [0,65535]
*/
function execute(processor, opCode, first, second) {
}
exports.default = execute;
