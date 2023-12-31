const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueprefix = Date.now() + '-'
      cb(null, uniqueprefix+'-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;