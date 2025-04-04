document.addEventListener('DOMContentLoaded', () => {
  const gb = new GameBoy();
  const fileInput = document.getElementById('file-input');
  
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const romData = new Uint8Array(event.target.result);
      gb.loadROM(romData);
      gb.runFrame();
    };
    reader.readAsArrayBuffer(file);
  });
});
