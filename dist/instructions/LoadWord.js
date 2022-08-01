"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadWord(processor, first, second) {
    let reg = first.operand;
    if (second.identifier == 35)
        processor[`reg${String.fromCharCode(reg + 64)}`] = second.operand;
    else
        processor[`reg${String.fromCharCode(reg + 64)}`] = processor.RAM[second.operand];
}
exports.default = loadWord;
;
