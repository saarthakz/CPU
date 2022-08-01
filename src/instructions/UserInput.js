export default function userInput(processor, first, second) {
  process.stdin.resume();
  let inputVal = 0;
  process.stdin.on("readable", () => {
    let data = process.stdin.read();
    inputVal = Number(data.toString().split("\r\n")[0]);
  });

  if (first.identifier == 38) processor.RAM[first.operand] = inputVal;
  else processor[`reg${String.fromCharCode(first.operand + 64)}`] = inputVal;
};