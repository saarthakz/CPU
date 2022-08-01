"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bitwiseAND(processor, first, second) {
    if (second.identifier == 35)
        processor[`reg${String.fromCharCode(first.operand + 64)}`] &= (second.operand);
    else
        processor[`reg${String.fromCharCode(first.operand + 64)}`] &= (processor[`reg${String.fromCharCode(second.operand + 64)}`]);
}
exports.default = bitwiseAND;
;
