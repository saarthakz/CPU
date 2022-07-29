import { CPU } from "../CPU";
import fs from "node:fs";

export default function codeLoader(processor: CPU, path: string) {
  let data = fs.readFileSync(process.cwd() + path);
  let stringData = new Array<string>(data.length);
  data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));

  stringData = stringData.join("").split("\r\n");

  let addr = 4000;

  stringData.forEach((dataLine) => {
    for (let idx = 0; idx < dataLine.length; idx++) {
      processor.RAM[addr] = dataLine[idx].charCodeAt(0);
      addr++;
    };
  });

};