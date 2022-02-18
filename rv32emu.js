export class RV32Emu {
  constructor(instance, io) {
    this.instance = instance;
    this.io = io;
    const ioStruct = instance._malloc(4 * 9);
    const viFn = (fn) => instance.addFunction(fn, 'vi');
    const iiiFn = (fn) => instance.addFunction(fn, 'iii');
    const viiiFn = (fn) => instance.addFunction(fn, 'viii');
    let ioPtr = ioStruct >> 2;
    instance.HEAPU32[ioPtr++] = iiiFn((rv, addr) => io.readInstruction(addr));
    instance.HEAPU32[ioPtr++] = iiiFn((rv, addr) => io.read32(addr));
    instance.HEAPU32[ioPtr++] = iiiFn((rv, addr) => io.read16(addr));
    instance.HEAPU32[ioPtr++] = iiiFn((rv, addr) => io.read8(addr));
    instance.HEAPU32[ioPtr++] = viiiFn((rv, addr, value) => io.write32(addr, value));
    instance.HEAPU32[ioPtr++] = viiiFn((rv, addr, value) => io.write16(addr, value));
    instance.HEAPU32[ioPtr++] = viiiFn((rv, addr, value) => io.write8(addr, value));
    instance.HEAPU32[ioPtr++] = viFn(() => io.onECALL());
    instance.HEAPU32[ioPtr++] = viFn(() => io.onBREAK());
    this.rv = instance._rv_create(ioStruct);
  }
  reset(pc) {
    this.instance._rv_reset(this.rv, pc);
  }
  step(cycles) {
    this.instance._rv_step(this.rv, cycles);
  }
  set PC(value) {
    this.instance._rv_set_pc(this.rv, value);
  }
  get PC() {
    return this.instance._rv_get_pc(this.rv);
  }
  getReg(index) {
    return this.instance._rv_get_reg(this.rv, index);
  }
  setReg(index, value) {
    return this.instance._rv_set_reg(this.rv, index, value);
  }
  halt() {
    this.instance._rv_halt(this.rv);
  }
  get hasHalted() {
    return this.instance._rv_has_halted(this.rv);
  }
}
