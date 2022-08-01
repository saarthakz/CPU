"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Add_1 = __importDefault(require("../instructions/Add"));
const Divide_1 = __importDefault(require("../instructions/Divide"));
const JumpIfNotZero_1 = __importDefault(require("../instructions/JumpIfNotZero"));
const LoadWord_1 = __importDefault(require("../instructions/LoadWord"));
const BitwiseAND_1 = __importDefault(require("../instructions/BitwiseAND"));
const BitwiseNOT_1 = __importDefault(require("../instructions/BitwiseNOT"));
const BitwiseOR_1 = __importDefault(require("../instructions/BitwiseOR"));
const MoveWord_1 = __importDefault(require("../instructions/MoveWord"));
const Multiply_1 = __importDefault(require("../instructions/Multiply"));
const StoreWord_1 = __importDefault(require("../instructions/StoreWord"));
const Subtract_1 = __importDefault(require("../instructions/Subtract"));
const UserInput_1 = __importDefault(require("../instructions/UserInput"));
const UserOutput_1 = __importDefault(require("../instructions/UserOutput"));
const Compare_1 = __importDefault(require("../instructions/Compare"));
function execute(processor, opCode, first, second) {
    return __awaiter(this, void 0, void 0, function* () {
        let instructionMap = {
            0: MoveWord_1.default,
            1: LoadWord_1.default,
            2: StoreWord_1.default,
            3: JumpIfNotZero_1.default,
            4: UserInput_1.default,
            5: UserOutput_1.default,
            6: Add_1.default,
            7: Subtract_1.default,
            8: Multiply_1.default,
            9: Divide_1.default,
            10: BitwiseAND_1.default,
            11: BitwiseOR_1.default,
            12: BitwiseNOT_1.default,
            13: Compare_1.default,
        };
        const func = instructionMap[opCode];
        yield func(processor, first, second);
    });
}
exports.default = execute;
;
