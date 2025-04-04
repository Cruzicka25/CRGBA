


  
  drawScreen() {
    // Update screen buffer
    this.ctx.putImageData(this.screenBuffer, 0, 0);
  
  }

class GameBoy {
  constructor() {
    this.cpu = new CPU();
    this.mem = new Memory();
    this.gpu = new GPU();
    this.cycles = 0;
     this.canvas = document.getElementById('screen');
    this.ctx = this.canvas.getContext('2d');
    this.screenBuffer = new ImageData(160, 144);
  }

  loadROM(romData) {
    this.mem.loadROM(new Uint8Array(romData));
    this.cpu.reset();
  }

  runFrame() {
    const targetCycles = 70224; // Cycles per frame
    while (this.cycles < targetCycles) {
      const cycles = this.cpu.execute();
      this.cycles += cycles;
      this.gpu.step(cycles);
    }
    this.cycles -= targetCycles;
    this.gpu.render();
  }
}

// Add CPU, Memory, GPU classes with actual implementations
}
