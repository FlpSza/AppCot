const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 300, // Largura da janela
    height: 150, // Altura da janela
    frame: false, // Remover bordas da janela
    transparent: true, // Tornar a janela transparente
    alwaysOnTop: true, // Manter a janela sempre no topo
    resizable: false, // Impedir redimensionamento da janela
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  // e carrega o index.html do app.
  mainWindow.loadFile('src/index.html');

  // Abrir as ferramentas de desenvolvedor (apenas para desenvolvimento)
  // mainWindow.webContents.openDevTools();
}

// Este método será chamado quando Electron estiver pronto para criar janelas de navegador.
// Algumas APIs podem ser usadas somente depois que este evento ocorrer.
app.whenReady().then(createWindow);

// Sair quando todas as janelas forem fechadas, exceto no macOS. Existem aplicativos adicionais
// de código aberto do macOS que não têm processo de janela, mas continuam ativos até que seja
// explicitamente encerrado com `Cmd + Q`.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // No macOS, é comum recriar uma janela no aplicativo quando o ícone do dock é clicado e não há
  // outras janelas abertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
