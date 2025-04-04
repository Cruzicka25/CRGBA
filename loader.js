async function main() {
  let pyodide = await loadPyodide();
  await pyodide.loadPackage(['numpy', 'pygame']);
  
  // Load your Python code
  await pyodide.runPythonAsync(`
    # Paste your Python emulator code here
  `);
  
  document.getElementById('rom-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    pyodide.runPythonAsync(`
      rom_data = bytes(${Array.from(new Uint8Array(buffer))})
      gb.load_rom(rom_data)
      gb.run_frame()
    `);
  });
}

main();
