"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const buffer = (0, fs_1.readFileSync)("Output.bin");
console.log(buffer);
