"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CPU_1 = require("./CPU");
const RunVM_1 = __importDefault(require("./functions/RunVM"));
(0, RunVM_1.default)(CPU_1.processor);
