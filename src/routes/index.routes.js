const {Router} = require('express');

const router = Router();


// #region Routes
router.get("/", (request, response) => {
  try {
    response.render('index');
  } catch (error) {
    console.error("routes/index.routes.js/app.get(/) =>", error)
  }

});
router.post("/upload", (request, response) => {
  try {
    console.info(request.file);
    response.send('upload!!!!!!!!!!!!!!!!!! :D');
  } catch (error) {
    console.error("routes/index.routes.js/app.post(/upload) =>", error)
  }
});
// #endregion

module.exports =  router;