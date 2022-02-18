export interface IRV32IO {
  readInstruction(address: number): number;
  read8(address: number): number;
  read16(address: number): number;
  read32(address: number): number;
  write8(address: number, value: number): void;
  write16(address: number, value: number): void;
  write32(address: number, value: number): void;
  onECALL(): void;
  onBREAK(): void;
}

export declare class RV32Emu {
  readonly instance: any;
  readonly io: IRV32IO;
  private rv;
  constructor(instance: any, io: IRV32IO);
  reset(pc: number): void;
  step(cycles: number): void;
  set PC(value: number);
  get PC(): number;
  getReg(index: number): number;
  setReg(index: number, value: number): number;
  halt(): void;
  get hasHalted(): any;
}
