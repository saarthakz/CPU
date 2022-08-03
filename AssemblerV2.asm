//Address for variables will start from 49152
4000: SW:&49152,#200; // addr = RAM[49152] = 200
4007: SW:&49153,#14; // instructionCount = RAM[49153] = 200
4014: SW:&49154,#32768; // codeAddr = RAM[49154] = 32768
4021: SW:&49155,#15; // opCode + 1 = RAM[49155] = 15
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
4119: LW:@A,#0; //Reg A = 0
4126: JNZ:@A,&4252 //Jump to opCode--
4133: LW:@C,&49156; //Reg C = instPtr
4140: ADD:@C,#1; //Reg C += 1
4147: SW:&49156,@C; instPtr incremented
4154: LW:@C,&49157; //Reg C = codePtr
4161: ADD:@C,#1; //Reg C += 1
4168: SW:&49156,@C; codePtr incremented
4175: LW:@C,&49156 //Reg C = instPtr
4182: MW:@C,@C; //Reg C = RAM[Reg C]
4189: ADD,@C,#1; //Incrementing the value of Reg C
4196: JNZ:@C,&4077; //Jumping to Address 4077 if RAM[instPtr] + 1 != 0
4203: SUB:@A,#1; //Decrementing Reg A by 1
4210: JNZ:@A,&4252; //Jump to opCode--
4217: LW:@B,&49155; //Loading the current opCode + 1in Reg B
4224: SUB:@B,#1; //Reg B = opCode + 1 - 1 = opCode
4231: LW:@C,&49156; //Reg C = codePtr
4238: SW:&49154,@C; //codeAddr = Reg C
4245: JNZ:#1,&4280 //Jumping out the entire Instruction map loop
4252: LW:@C,&49155; //Reg C = opCode + 1
4259: SUB:@C,#1; //Reg C Decrement
4266: SW:&49155,@C; //Storing the decremented opCode in it's memory
4273: JNZ,@C,&4028;
4280: To be Continued



