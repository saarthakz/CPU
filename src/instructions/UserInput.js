export default async function userInput(processor, first, second) {

  async function input() {
    return new Promise((resolve, reject) => {
      process.stdin.resume();
      process.stdin.on("data", (buff) => {
        resolve(Number(buff.toString().split("\r\n")[0]));
        process.stdin.pause();
      });
    });
  };

  if (first.identifier == 38) {
    process.stdout.write(`RAM[${first.operand}]: `);
  } else process.stdout.write(`Register ${String.fromCharCode(first.operand + 64)}: `);
  let inputVal = await input();

  if (first.identifier == 38) processor.RAM[first.operand] = inputVal;
  else processor[`reg${String.fromCharCode(first.operand + 64)}`] = inputVal;
};