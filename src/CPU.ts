class CPU {
  RAM: Array<number>;
  memSize: number;
  regA: number = 0;
  regB: number = 0;
  regC: number = 0;
  regD: number = 0;
  PC: number = 0;

  constructor(RAM: Array<number>) {
    this.RAM = RAM;
    this.memSize = RAM.length;
  };

};

const processor = new CPU(new Array<number>(2 ** 18).fill(-1));
export { processor, CPU };


