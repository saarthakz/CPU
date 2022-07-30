"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
function binaryLoader(processor) {
    let addr = 4000;
    const data = node_fs_1.default.readFileSync("Output.bin");
    data.forEach((num, idx) => processor.RAM[addr + idx] = num);
    return addr;
}
exports.default = binaryLoader;
;
