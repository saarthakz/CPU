//Address for variables will start from 49152
4000: SW:&49152,#200; // addr = RAM[49152] = 200
4007: SW:&49153,#14; // instructionCount = RAM[49153] = 200
4014: SW:&49154,#32768; // codeAddr = RAM[49154] = 32768
4021: SW:&49155,#32768; // opCode = RAM[49155] = 15
4028: LW:@A,&49155; //Loading opCode + 1 in Reg A
4035: SUB:@A,#1; //Reg A -= 1
4042: MUL:@A,#16; //Reg A *= 16
4049: SW:&49156,@A; //instPtr = RAM[49156] = (opCode + 1 - 1) * 16
4056: LW:@A,&49154;
4063: SW:&49157,@A; // codePtr = RAM[49157] = codeAddr
4070: LW:@A,#1; //Reg A = 1
4077: LW:@C,&49156; Reg C = instPtr
4084: MW:@C,@C; //Reg C = RAM[RegC]
4091: LW:@D,&49157; Reg D = codePtr
4098: MW:@D,@D; Reg D = RAM[Reg D]
4105: CMP:@C,@D; //Comparing Reg C and Reg D
4112: JNZ:@C,&4119; //Jump to instPtr++
4000: LW:@A,#0; //Reg A = 0
4000: // Increment
4000: JNZ:@A,
4000: LW:@C,&49156; //Reg C = instPtr
4000: ADD:@C,#1; //Reg C += 1
4000: SW:&49156,@C; instPtr incremented
4000: LW:@C,&49157; //Reg C = codePtr
4000: ADD:@C,#1; //Reg C += 1
4000: SW:&49156,@C; codePtr incremented
4000: LW:@C,&49156 //Reg C = instPtr
4000: MW:@C,@C; //Reg C = RAM[Reg C]



