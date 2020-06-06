var multer = require('multer');
var fs = require('fs');


function commonUpload(destinationPath) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, destinationPath);
        },
        filename: function (req, file, callback) {
            var uploadName = file.originalname.split('.');
            var extension = '.' + uploadName[uploadName.length - 1];
            var fileName = /* file.fieldname + ' ' +  */Date.now().toString();
            fs.readFile(destinationPath + file.originalname, function (err, res) {
                if (!err) {
                    callback(null, fileName + extension);
                } else {
                    callback(null, fileName + extension);
                }
            });
        }
    });

    var uploaded = multer({ storage: storage }); /**----{limits : {fieldNameSize : 100}}---*/    
    return uploaded;
}

module.exports = {
    commonUpload: commonUpload,
};