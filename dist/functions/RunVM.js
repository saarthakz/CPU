"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryLoader_1 = __importDefault(require("./BinaryLoader"));
const Execute_1 = __importDefault(require("./Execute"));
const GetOperand_1 = __importDefault(require("./GetOperand"));
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
function runVM(processor) {
    (0, BinaryLoader_1.default)(processor);
    while (processor.RAM[processor.PC] != -1) {
        let opCode = processor.RAM[processor.PC];
        processor.PC++;
        let first = (0, GetOperand_1.default)(processor);
        let second = (0, GetOperand_1.default)(processor);
        console.log(opCode, first, second);
        (0, Execute_1.default)(processor, opCode, first, second);
    }
    ;
}
exports.default = runVM;
;
