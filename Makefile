# Base configurations for RISC-V extensions
CFLAGS = -std=gnu99 -Wall -Wextra
CFLAGS += -include common.h
CFLAGS += -D ENABLE_RV32M
CFLAGS += -D ENABLE_Zicsr
CFLAGS += -D ENABLE_Zifencei
CFLAGS += -D ENABLE_RV32A
CFLAGS += -D ENABLE_RV32C

# Set the default stack pointer
CFLAGS += -D DEFAULT_STACK_ADDR=0xFFFFF000 -D ENABLE_COMPUTED_GOTO

CC=emcc
SOURCES=rv32emu/riscv.c
EXPORTS=_rv_create,_rv_delete,_rv_reset,_rv_step,_rv_userdata,_rv_set_pc,_rv_get_pc,_rv_set_reg,_rv_get_reg,_rv_halt,_rv_has_halted,_malloc,_free
CFLAGS += -s MODULARIZE=1 -s 'EXPORT_NAME="rv32"' -I rv32emu \
	-s 'EXPORTED_FUNCTIONS=$(EXPORTS)' \
	-s EXPORTED_RUNTIME_METHODS="['addFunction', 'cwrap', 'allocate']" -s ALLOW_TABLE_GROWTH=1 -s ASSERTIONS=1

all: dist/rv32emu.js

dist/rv32emu.js: $(SOURCES) | dist
	$(CC) -o $@ $(CFLAGS) $^

dist:
	mkdir $@

clean:
	rm -rf dist
