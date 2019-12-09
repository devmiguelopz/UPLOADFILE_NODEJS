// #region Using
const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const router = require('./routes/index.routes');
// #endregion

// #region Instance
const app = express();
// #endregion

// #region Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// #endregion

// #region Middlewares
app.use(multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(request, file, callBack) {
      callBack(null, `${uuid()}${path.extname(file.originalname.toLowerCase())}`)
    }
  }),
  limits:{
    fileSize:1000000
  },
  fileFilter(request, file, callBack){
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname.toLowerCase()));
    if (mimeType && extName) callBack(null,true) 
    else callBack("Error Type File");
  }
}).single('file'));
// #endregion

// #region Static File
app.use(express.static(path.join(__dirname,'public')))
// #endregion

// #region Routes
app.use(router);
// #endregion

app.listen(app.get('port'), () => {
  try {
    console.info(`Connect Express with port ${app.get('port')}`)
  } catch (error) {
    console.error("src/index.js/app.listen =>", error)
  }
});