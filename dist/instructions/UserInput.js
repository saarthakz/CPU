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
Object.defineProperty(exports, "__esModule", { value: true });
function userInput(processor, first, second) {
    return __awaiter(this, void 0, void 0, function* () {
        function input() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    process.stdin.resume();
                    process.stdin.on("data", (buff) => {
                        resolve(Number(buff.toString().split("\r\n")[0]));
                        process.stdin.pause();
                    });
                });
            });
        }
        ;
        if (first.identifier == 38) {
            process.stdout.write(`RAM[${first.operand}]: `);
        }
        else
            process.stdout.write(`Register ${String.fromCharCode(first.operand + 64)}: `);
        let inputVal = yield input();
        if (first.identifier == 38)
            processor.RAM[first.operand] = inputVal;
        else
            processor[`reg${String.fromCharCode(first.operand + 64)}`] = inputVal;
    });
}
exports.default = userInput;
;
