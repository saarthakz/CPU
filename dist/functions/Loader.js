"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
function loader(processor, path) {
    let data = node_fs_1.default.readFileSync(process.cwd() + path);
    let stringData = new Array(data.length);
    data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));
    stringData = stringData.join("").split("\r\n");
    let addr = 4000;
    stringData.forEach((dataLine) => {
        for (let idx = 0; idx < dataLine.length; idx++) {
            processor.RAM[addr] = dataLine[idx].charCodeAt(0);
            addr++;
        }
        ;
    });
}
exports.default = loader;
;
