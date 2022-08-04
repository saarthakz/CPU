4000: SW:&49152,#240; // addr = RAM[49152] = 240, Variables will start from 49152
4007: SW:&49153,#14; // instructionCount = RAM[49153] = 14
4014: SW:&49154,#32768; // codeAddr = RAM[49154] = 32768
4021: SW:&49155,#14; // opCode + 1 = RAM[49155] = 14
4028: LW:@A,&49155; //Loading opCode + 1 in Reg A
4035: SUB:@A,#1; //Reg A -= 1
4042: MUL:@A,#16; //Reg A *= 16
4049: SW:&49156,@A; //instPtr = RAM[49156] = opCode * 16
4056: LW:@A,&49154;
4063: SW:&49157,@A; // codePtr = RAM[49157] = codeAddr
4070: LW:@A,#1; //Reg A = 1
4077: LW:@C,&49156; //Reg C = instPtr
4084: MW:@C,@C; //Reg C = RAM[RegC]
4091: LW:@D,&49157; //Reg D = codePtr
4098: MW:@D,@D; //Reg D = RAM[Reg D]
4105: CMP:@C,@D; //Comparing Reg C and Reg D
4112: JNZ:@C,&4133; //Jump to codePtr ++ and instPtr++
4119: LW:@A,#0; //Reg A = 0
4126: JNZ:#1,&4245; //Jump to opCode--
4133: LW:@C,&49157; //Reg C = codePtr
4140: ADD:@C,#1; //Reg C += 1
4147: SW:&49157,@C; //codePtr incremented
4154: LW:@C,&49156; //Reg C = instPtr
4161: ADD:@C,#1; //Reg C += 1
4168: SW:&49156,@C; //instPtr incremented
4175: MW:@C,@C; //Reg C = RAM[instPtr]
4182: ADD,@C,#1; //Incrementing the value of Reg C
4189: JNZ:@C,&4077; //Jumping to Address 4077 where if RAM[instPtr] + 1 != 0
4196: SUB:@A,#1; //Decrementing Reg A by 1
4203: JNZ:@A,&4245; //Jump to opCode--
4210: LW:@B,&49155; //Loading the current opCode + 1 in Reg B
4217: SUB:@B,#1; //Reg B = opCode + 1 - 1 = opCode
4224: LW:@C,&49156; //Reg C = codePtr
4231: SW:&49154,@C; //codeAddr = codePtr
4238: JNZ:#1,&4273; //Jumping out the entire Instruction map loop
4245: LW:@C,&49155; //Reg C = opCode + 1
4252: SUB:@C,#1; //Reg C Decrement
4259: SW:&49155,@C; //Storing the decremented opCode in it's memory
4266: JNZ:@C,&4028; //Jumping to 4028 if the opCode + 1 has not reached is not zero
4273: LW:@C,&49152; //Reg C = addr
4280: SW:@C,@B; // RAM[addr] = opCode
4287: ADD:@C,#1; //Increment addr
4294: SW:&49152,@C; // addr = addr + 1
4301: LW:@C,&49154; //RegC = codeAddr
4308: ADD:@C,#1; //Increment codeAddr
4315: SW:&49154,@C; // codeAddr = codeAddr + 1
4322: LW:@C,&49154; //RegC = codeAddr
4329: MW:@C,@C; //Reg C = RAM[codeAddr]
4336: SUB:@C,#44; //Reg C = Reg C == 44
4343: JNZ:@C,&4378; //Jump to 
4350: LW:@C,&49154; // Reg C = codeAddr
4357: ADD:@C,#1; // Reg C++
4364: SW:&49154,@C;// codeAddr = codeAddr + 1
4371: JNZ:#1,&4322; //Jumping to beginning of loop
4378: LW:@C,&49154; //Start of Immediate/Address Value check: Reg C = codeAddr
4385: MW:@C,@C; // Reg C = RAM[codeAddr]
4392: LW:@A,&49154; //Reg A = codeAddr
4399: MW:@A,@A; // Reg A = RAM[codeAddr]
4406: CMP:@C,#35; // Reg C = Reg C == 35
4413: CMP:@A,#38; // Reg A = Reg A == 38
4420: OR:@A,@C; // Reg A = Reg A | Reg C
4427: SUB:@A,#1; //Decrementing Reg A
4434: JNZ:@A,&xxxx; //Jump to Register Value check
4441: LW:@A,&49154; //Reg A = codeAddr
4448: MW:@A,@A; //Reg A = RAM[codeAddr]
4455: LW:@B,&49152; //Reg B = addr
4462: SW:@B,@A; //RAM[addr] = RAM[codeAddr]
4469: ADD:@B,#1; //Reg B++
4476: SW:&49152,@B; // addr = addr + 1
4483: LW:@A,&49154; // Reg A = codeAddr
4490: ADD:@A,#1; //Reg A++
4497: SW:&49152,@A // codeAddr = codeAddr + 1
4504: 
4511: 
