document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('screen');
  const romInput = document.getElementById('rom-input');
  const playBtn = document.getElementById('play');
  const pauseBtn = document.getElementById('pause');
  
  // Initialize emulator
  const gb = new GameBoy();
  gb.init(canvas, {
    onFrame: () => console.log('Frame rendered'),
    onError: (err) => console.error('Emulator error:', err)
  });
  
  // ROM loading
  romInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const romData = new Uint8Array(event.target.result);
      gb.loadRom(romData);
    };
    reader.readAsArrayBuffer(file);
  });
  
  // Controls
  playBtn.addEventListener('click', () => gb.play());
  pauseBtn.addEventListener('click', () => gb.pause());
  
  // Keyboard input
  document.addEventListener('keydown', (e) => {
    const keyMap = {
      'ArrowRight': 'right',
      'ArrowLeft': 'left',
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'z': 'a',
      'x': 'b',
      'Enter': 'start',
      'Shift': 'select'
    };
    
    if (keyMap[e.key]) {
      gb.setKeyState(keyMap[e.key], true);
    }
  });
  
  document.addEventListener('keyup', (e) => {
    // Same keyMap as above
    // Send keyup events to emulator
  });
});
