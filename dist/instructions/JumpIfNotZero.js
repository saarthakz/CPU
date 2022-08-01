"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function jumpIfNotZero(processor, first, second) {
    let addr = second.operand;
    if (first.identifier == 35) {
        if (first.operand != 0)
            processor.PC = addr;
    }
    else {
        let regVal = processor[`reg${String.fromCharCode(first.operand + 64)}`];
        if (regVal != 0)
            processor.PC = addr;
    }
    ;
}
exports.default = jumpIfNotZero;
;
