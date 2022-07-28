"use strict";
/*

Instruction Set:
  0: MW   regA, regB       -> regA = regB
  1: LW   regA, imm8/addr  -> reg = imm8/RAM[addr]
  2: SW   addr, imm8/reg   -> RAM[addr] = reg/imm8
  3: JNZ  imm8/reg addr    -> imm8/reg != 0 ? PC = addr : PC+1
  4: IN  reg, imm8/reg     -> reg = PORT[imm8/reg]
  5: OUT imm8/reg, reg     -> PORT[imm8/reg] = reg
  6: ADD regA, imm8/regB     -> regA = regA + imm8/regB
  7: AND  regA, imm8/regB    -> regA = regA & imm8/regB
  8: OR   regA, imm8/regB    -> regA = regA | imm8/regB
  9: NOT  regA, imm8/regB    -> regA = ~(imm8/regB)
  A: CMP regA, imm8/regB     -> regA = reg XOR imm8/regB

Prefix:
  # -> Immediate
  & -> Address
  @ -> Register

Syntax:
  Opcode:Op1,Op2;

Boundaries:
  Addresses & Immediate values can only be in the range of [0,255]
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CPU_1 = __importDefault(require("./CPU"));
let instructions = [
    { mnemonic: 'MW', decimal: 0, opCode: 0 },
    { mnemonic: 'SW', decimal: 1, opCode: 1 },
    { mnemonic: 'LW', decimal: 2, opCode: 2 },
    { mnemonic: 'JNZ', decimal: 3, opCode: 3 },
    { mnemonic: 'IN', decimal: 4, opCode: 4 },
    { mnemonic: 'OUT', decimal: 5, opCode: 5 },
    { mnemonic: 'ADD', decimal: 6, opCode: 6 },
    { mnemonic: 'AND', decimal: 7, opCode: 7 },
    { mnemonic: 'OR', decimal: 8, opCode: 8 },
    { mnemonic: 'NOT', decimal: 9, opCode: 9 },
    { mnemonic: 'CMP', decimal: 10, opCode: 10 }
];
const ASCII_Map = {
    "\n": 10,
    "\r": 13,
    " ": 32,
    "#": 35,
    "&": 38,
    ",": 44,
    ":": 58,
    ";": 59,
    "@": 64,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
};
instructions.forEach((instruction) => {
    const baseAddress = instruction.decimal * 16;
    const mnemonicBytes = instruction.mnemonic.split("").map((char) => char.charCodeAt(0));
    let ctr = baseAddress;
    mnemonicBytes.forEach((byte) => {
        CPU_1.default.RAM[ctr] = byte;
        ctr++;
    });
});
const node_fs_1 = __importDefault(require("node:fs"));
let data = node_fs_1.default.readFileSync("./Code.txt");
let stringData = new Array(data.length);
data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));
stringData = stringData.join("").split("\r\n");
stringData.forEach((dataLine) => {
    let dataLinePtr = 0;
    for (let _idx = 0; _idx < instructions.length; _idx++) {
        const instruction = instructions[_idx];
        const baseAddress = instruction.decimal * 16;
        let RAM_Ctr = baseAddress;
        let ctr = 0;
        CPU_1.default.regA = 1;
        while (CPU_1.default.RAM[RAM_Ctr] != -1) {
            if (CPU_1.default.RAM[RAM_Ctr] != dataLine[ctr].charCodeAt(0)) {
                CPU_1.default.regA = 0;
                break;
            }
            RAM_Ctr++;
            ctr++;
        }
        ;
        if (CPU_1.default.regA == 1) {
            CPU_1.default.regB = instruction.opCode;
            dataLinePtr = ctr;
            break;
        }
        ;
    }
    ;
    //Invalid Instruction if Register B Value == 0
    //Opcode in Register B & Byte Pointer in Variable: dataLinePtr
    //Storing Operands in RAM from address 200 onwards
    let addr = 200;
    dataLinePtr++;
    while (dataLine[dataLinePtr].charCodeAt(0) != 59) {
        if (dataLine[dataLinePtr].charCodeAt(0) == 44) {
            dataLinePtr++;
            continue;
        }
        ;
        //Immediate value or Address Value
        if (dataLine[dataLinePtr].charCodeAt(0) == 35 || dataLine[dataLinePtr].charCodeAt(0) == 38) {
            CPU_1.default.RAM[addr] = dataLine[dataLinePtr].charCodeAt(0);
            addr++;
            dataLinePtr++;
            CPU_1.default.regC = Number(dataLine[dataLinePtr]);
            dataLinePtr++;
            while (dataLine[dataLinePtr].charCodeAt(0) != 44 && dataLine[dataLinePtr].charCodeAt(0) != 59) {
                CPU_1.default.regC = (Number(CPU_1.default.regC) * 10) + Number(dataLine[dataLinePtr]);
                dataLinePtr++;
            }
            ;
            CPU_1.default.RAM[addr] = CPU_1.default.regC;
            addr++;
        }
        //Register value
        else if (dataLine[dataLinePtr].charCodeAt(0) == 64) {
            while (dataLine[dataLinePtr].charCodeAt(0) != 44 && dataLine[dataLinePtr].charCodeAt(0) != 59) {
                CPU_1.default.RAM[addr] = dataLine[dataLinePtr].charCodeAt(0);
                addr++;
                dataLinePtr++;
            }
            ;
        }
        ;
    }
    ;
    const bufferArr = [Number(CPU_1.default.regB)];
    for (let ptr = 200; ptr < addr; ptr++)
        bufferArr.push(CPU_1.default.RAM[ptr]);
    node_fs_1.default.readFileSync("Output.bin");
    node_fs_1.default.writeFileSync("Output.bin", Buffer.concat([node_fs_1.default.readFileSync("Output.bin"), Buffer.from(bufferArr)]));
});
