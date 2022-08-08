4000: SW:&49152,#270; // addr = RAM[49152] = 270, Variables will start from 49152
4007: SW:&49154,#32768; // codeAddr = RAM[49154] = 32768
4014: SW:&49153,#15; // instructionCount = RAM[49153] = 15
4021: SW:&49155,#15; // opCode + 1 = RAM[49155] = 15
4028: LW:@A,&49155; //Reg A = opCode + 1
4035: SUB:@A,#1; //Reg A = opCode
4042: MUL:@A,#16; //Reg A = 16 * opCode
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
4224: LW:@C,&49157; //Reg C = codePtr
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
4343: JNZ:@C,&4378; //Jump to next if check for Immediate/Address Value
4350: LW:@C,&49154; // Reg C = codeAddr
4357: ADD:@C,#1; // Reg C++
4364: SW:&49154,@C; //codeAddr = codeAddr + 1
4371: JNZ:#1,&4322; //Jumping to beginning of loop
4378: LW:@C,&49154; //Start of Immediate/Address Value check: Reg C = codeAddr
4385: MW:@C,@C; // Reg C = RAM[codeAddr]
4392: LW:@A,&49154; //Reg A = codeAddr
4399: MW:@A,@A; // Reg A = RAM[codeAddr]
4406: CMP:@C,#35; // Reg C = Reg C == 35
4413: CMP:@A,#38; // Reg A = Reg A == 38
4420: OR:@A,@C; // Reg A = Reg A | Reg C
4427: SUB:@A,#1; //Decrementing Reg A
4434: JNZ:@A,&4679; //Jump to Register Value check (else if statement)
4441: LW:@A,&49154; //Reg A = codeAddr
4448: MW:@A,@A; //Reg A = RAM[codeAddr]
4455: LW:@B,&49152; //Reg B = addr
4462: SW:@B,@A; //RAM[addr] = RAM[codeAddr]
4469: ADD:@B,#1; //Reg B = addr + 1
4476: SW:&49152,@B; // addr = addr + 1
4483: LW:@A,&49154; // Reg A = codeAddr
4490: ADD:@A,#1; //Reg A = codeAddr + 1
4497: SW:&49154,@A; // codeAddr = codeAddr + 1
4504: LW:@A,&49154; //Reg A = codeAddr
4511: MW:@A,@A; //Reg A = RAM[codeAddr]
4518: SUB:@A,#48; //Getting Decimal from ASCII, Reg A = RAM[codeAddr] - 48
4525: SW:&60000,@A; //RAM[60000] = RAM[codeAddr] - 48
4532: LW:@C,&60000; //Reg C = RAM[codeAddr] - 48
4539: LW:@A,&49154; // Reg A = codeAddr
4546: ADD:@A,#1; //Reg A = codeAddr + 1
4553: SW:&49154,@A; // codeAddr = codeAddr + 1
4560: LW:@A,&49154; // Reg A = codeAddr, While loop condition starts
4567: LW:@B,&49154; // Reg B = codeAddr
4574: MW:@A,@A; //Reg A = RAM[codeAddr]
4581: MW:@B,@B; //Reg B = RAM[codeAddr]
4588: CMP:@A,#44; //Reg A = Reg A == 44
4595: CMP:@B,#59; //Reg B = Reg B == 59
4602: OR:@A,@B; //Reg A = Reg | Reg B
4609: JNZ:@A,&4819; //Jump to Reg D = addr, skipping the else block
4616: MUL:@C,#10;
4623: LW:@A,&49154; // Reg A = codeAddr
4630: MW:@A,@A; // Reg A = RAM[codeAddr]
4637: SUB:@A,#48; // Reg = RAM[codeAddr] - 48
4644: ADD:@C,@A; // Reg C = Reg C + Reg A
4651: LW:@A,&49154; // Reg A = codeAddr
4658: ADD:@A,#1; //Reg A = codeAddr + 1
4665: SW:&49154,@A; // codeAddr = codeAddr + 1
4672: JNZ:#1,&4560; //Jump to while loop check
4679: LW:@A,&49154; // Reg A = codeAddr, Else condition starts
4686: MW:@A,@A; //Reg A = RAM[codeAddr]
4693: SUB:@A,#64; //Reg A = RAM[codeAddr]
4700: JNZ:@A,&4819; //Jump to Reg D = addr, skipping the else block
4707: LW:@A,&49152; //Reg A = addr
4714: LW:@B,&49154; //Reg B = codeAddr
4721: MW:@B,@B; //Reg B = RAM[codeAddr]
4728: SW:@A,@B; //RAM[addr] = RAM[codeAddr]
4735: LW:@A,&49152; //Reg A = addr
4742: LW:@B,&49154; //Reg B = codeAddr
4749: ADD:@A,#1; // Reg A = addr + 1
4756: ADD:@B,#1; // Reg B = codeAddr + 1
4763: SW:&49152,@A; //addr = addr + 1
4770: SW:&49154,@B; //codeAddr = codeAddr + 1
4777: LW:@C,&49154; //Reg C = codeAddr
4784: MW:@C,@C; //Reg C = RAM[codeAddr]
4791: SUB:@C,#64; //Reg C = RAM[codeAddr] - 64
4798: LW:@B,&49154; //Reg B = codeAddr
4805: ADD:@B,#1; // Reg B = codeAddr + 1
4812: SW:&49154,@B; //codeAddr = codeAddr + 1
4819: LW:@D,&49152; //Reg D = addr
4826: JNZ:@C,&4868; //Jump to while loop
4833: LW:@A,&49152; //Reg A = addr
4840: SW:@A,#0; //RAM[addr] = 0
4847: ADD:@A,#1; //Reg = addr + 1
4854: SW:&49152,@A; //addr = addr + 1
4861: JNZ:#1,&4994; //Jump to Reg D + 1 == addr check
4868: LW:@A,&49152; //Reg A = addr
4875: SW:&60000,@C; //RAM[60000] = Reg C, 60000 is temp location
4882: LW:@B,&60000;//Reg B = Reg C
4889: MOD:@B,#16; // Reg B = Reg C % 16
4896: SW:@A,@B; // RAM[addr] = Reg C % 16
4903: DIV:@C,#16; //Reg C = Reg C / 16
4910: SW:&60000,@C; //RAM[60000] = Reg C, 60000 is temp location
4917: LW:@B,&60000;//Reg B = Reg C
4924: MOD:@B,#16; //Reg B = Reg C % 16
4931: MUL:@B,#16; //Reg B = 16 * Reg B
4938: MW:@A,@A; //Reg A = RAM[addr]
4945: ADD:@B,@A; //Reg B += Reg A
4952: LW:@A,&49152; //Reg A = addr
4959: SW:@A,@B; //RAM[addr] = Reg B
4966: DIV:@C,#16; //Reg C = Reg C / 16
4973: ADD:@A,#1; //Reg A = addr + 1
4980: SW:&49152,@A; //addr = addr + 1
4987: JNZ:@C,&4868; //Jump to Start of loop
4994: LW:@A,&49152; //Reg A = addr
5001: SUB:@A,#1; //Reg A = addr - 1
5008: CMP:@A,@D; //Reg A = Reg A == Reg D
5015: SUB:@A,#1; //Reg A = Reg A == Reg D - 1
5022: JNZ:@A,&5057; //Jump to next if statement
5029: LW:@A,&49152; // Reg A = addr
5036: SW:@A,#0; // RAM[addr] = 0
5043: ADD:@A,#1; //Reg A = addr + 1
5050: SW:&49152,@A; //addr = addr + 1
5057: LW:@A,&49152; // Reg A = addr
5064: CMP:@A,@D; // Reg A = Reg A == Reg D
5071: SUB:@A,#1; //Reg A = Reg A == Reg D - 1
5078: JNZ:@A,&5113; //Jump to statement next to if
5085: LW:@A,&49152; // Reg A = addr
5092: SW:@A,#0; // RAM[addr] = 0
5099: ADD:@A,#1; //Reg A = addr + 1
5106: SW:&49152,@A; //addr = addr + 1
5113: LW:@A,&49154; //Reg A = codeAddr
5120: MW:@A,@A; //Reg A = RAM[codeAddr]
5127: SUB:@A,#59; //Reg A = RAM[codeAddr] - 59
5134: JNZ:@A,&4322; //Jumping to beginning of loop
5141: LW:@A,&49154; //Reg A = codeAddr
5148: ADD:@A,#1; //Reg A = codeAddr + 1
5155: SW:&49154,@A; //codeAddr = codeAddr + 1
5162: MW:@A,@A; //Reg A = RAM[codeAddr]
5169: ADD:@A,#1; //Reg A= RAM[codeAddr] + 1
5176: JNZ:@A,&4014; //Jump to the beginning of the opCode loop