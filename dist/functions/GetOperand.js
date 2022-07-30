"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOperand(processor, addr) {
    let identifier = processor.RAM[addr];
    addr++;
    let operand;
    if (identifier == 64) {
        //Register Operand
        operand = processor.RAM[addr] - 65;
        addr++;
    }
    else {
        //Immediate or Address as operand
        let firstByte = processor.RAM[addr];
        addr++;
        let secondByte = processor.RAM[addr];
        addr++;
        let num = 0;
        let exp = 0;
        for (let idx = 0; idx < 2; idx++) {
            num += (firstByte % 16) * (16 ** exp);
            firstByte = Math.floor(firstByte / 16);
            exp++;
        }
        ;
        for (let idx = 0; idx < 2; idx++) {
            num += (secondByte % 16) * (16 ** exp);
            secondByte = Math.floor(secondByte / 16);
            exp++;
        }
        ;
        operand = num;
    }
    ;
    return { operand, identifier, returnAddr: addr };
}
exports.default = getOperand;
