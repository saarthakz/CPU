import { CPU } from "../CPU";
import add from "../instructions/Add";
import divide from "../instructions/Divide";
import jumpIfNotZero from "../instructions/JumpIfNotZero";
import loadWord from "../instructions/LoadWord";
import bitwiseAND from "../instructions/BitwiseAND";
import bitwiseNOT from "../instructions/BitwiseNOT";
import bitwiseOR from "../instructions/BitwiseOR";
import moveWord from "../instructions/MoveWord";
import multiply from "../instructions/Multiply";
import storeWord from "../instructions/StoreWord";
import subtract from "../instructions/Subtract";
import userInput from "../instructions/UserInput";
import userOutput from "../instructions/UserOutput";
import compare from "../instructions/Compare";

type input = {
  operand: number,
  identifier: number,
};

export default async function execute(processor: CPU, opCode: number, first: input, second: input): Promise<void> {
  let instructionMap: any = {
    0: moveWord,
    1: loadWord,
    2: storeWord,
    3: jumpIfNotZero,
    4: userInput,
    5: userOutput,
    6: add,
    7: subtract,
    8: multiply,
    9: divide,
    10: bitwiseAND,
    11: bitwiseOR,
    12: bitwiseNOT,
    13: compare,
  };

  const func = instructionMap[opCode];
  await func(processor, first, second);

};