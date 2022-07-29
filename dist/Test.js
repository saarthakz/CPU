"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const buffer = (0, fs_1.readFileSync)("Output.bin");
console.log(buffer);
let arr = [2, 64, 65, 35, 255];
console.log(Buffer.from(arr));
