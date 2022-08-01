"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const CPU_1 = require("./CPU");
const CodeLoader_1 = __importDefault(require("./functions/CodeLoader"));
const InstructionLoader_1 = __importDefault(require("./functions/InstructionLoader"));
const ASCII_Map = {
    "\n": 10,
    "\r": 13,
    " ": 32,
    "#": 35,
    "&": 38,
    ",": 44,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
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
(0, InstructionLoader_1.default)(CPU_1.processor);
(0, CodeLoader_1.default)(CPU_1.processor, "/Code.txt");
let RAM_Addr = 4000;
let addr = 200;
let instructionCount = 14;
while (CPU_1.processor.RAM[RAM_Addr] != -1) {
    //Getting the Opcode and storing in Register B
    for (let opCode = 0; opCode < instructionCount; opCode++) {
        const baseAddress = opCode * 16;
        let RAM_Ctr = baseAddress;
        CPU_1.processor.regA = 1;
        while (CPU_1.processor.RAM[RAM_Ctr] != -1) {
            if (CPU_1.processor.RAM[RAM_Ctr] != CPU_1.processor.RAM[RAM_Addr]) {
                CPU_1.processor.regA = 0;
                break;
            }
            RAM_Ctr++;
            RAM_Addr++;
        }
        ;
        if (CPU_1.processor.regA == 1) {
            CPU_1.processor.regB = opCode;
            break;
        }
        ;
    }
    ;
    RAM_Addr++;
    while (CPU_1.processor.RAM[RAM_Addr] != 59) {
        if (CPU_1.processor.RAM[RAM_Addr] == 44) {
            RAM_Addr++;
            continue;
        }
        ;
        //Immediate value or Address Value
        if (CPU_1.processor.RAM[RAM_Addr] == 35 || CPU_1.processor.RAM[RAM_Addr] == 38) {
            CPU_1.processor.RAM[addr] = CPU_1.processor.RAM[RAM_Addr];
            addr++;
            RAM_Addr++;
            CPU_1.processor.regC = CPU_1.processor.RAM[RAM_Addr] - 48;
            RAM_Addr++;
            while (CPU_1.processor.RAM[RAM_Addr] != 44 && CPU_1.processor.RAM[RAM_Addr] != 59) {
                CPU_1.processor.regC = CPU_1.processor.regC * 10 + (CPU_1.processor.RAM[RAM_Addr] - 48);
                RAM_Addr++;
            }
            ;
        }
        //Register value
        else if (CPU_1.processor.RAM[RAM_Addr] == 64) {
            CPU_1.processor.RAM[addr] = CPU_1.processor.RAM[RAM_Addr];
            addr++;
            RAM_Addr++;
            CPU_1.processor.regC = CPU_1.processor.RAM[RAM_Addr] - 64;
            RAM_Addr++;
        }
        ;
        CPU_1.processor.regD = addr;
        while (CPU_1.processor.regC != 0) {
            CPU_1.processor.RAM[addr] = CPU_1.processor.regC % 16;
            CPU_1.processor.regC = Math.floor(CPU_1.processor.regC / 16);
            CPU_1.processor.RAM[addr] += (16 * (CPU_1.processor.regC % 16));
            CPU_1.processor.regC = Math.floor(CPU_1.processor.regC / 16);
            addr++;
        }
        ;
        if (CPU_1.processor.regD + 1 == addr) {
            CPU_1.processor.RAM[addr] = 0;
            addr++;
        }
        ;
    }
    ;
    RAM_Addr++;
}
;
const bufferArr = [Number(CPU_1.processor.regB)];
for (let ptr = 200; ptr < addr; ptr++)
    bufferArr.push(CPU_1.processor.RAM[ptr]);
node_fs_1.default.writeFileSync("Output.bin", Buffer.concat([node_fs_1.default.readFileSync("Output.bin"), Buffer.from(bufferArr)]));
