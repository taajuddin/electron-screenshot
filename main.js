// Modules to control application life and create native browser window
const {app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
let mainWindow, count=0;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

//starting when the app is ready
app.on('ready', () => {
  //setting the time interval for 3 second (3000 in millis)
  setInterval(()=>{
    console.log(`Capturing Count: ${count}`)
    //start capturing the window
    mainWindow.webContents.capturePage().then(image => 
    {
      //writing  image to the disk
          fs.writeFile(`test${count}.png`, image.toPNG(), (err) => {
          if (err) throw err
          console.log('Image Saved')
          count++
          })
    })
    }, 3000); //tome in millis

  });