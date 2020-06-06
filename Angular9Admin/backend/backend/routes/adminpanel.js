module.exports = function (app) {

	try {
		var admin = require('../controllers/admin/admin.js')();
		var settings = require('../controllers/admin/settings')();
		var authvalidation = require('../valitation/admin-auth-valitation')(app);
		var middlewares = require('../mongo/middlewares');

		app.post("/admin/login",admin.login);
		app.post("/admin/admin-request-password",authvalidation.requestemaildata,admin.adminrequestpassword);
		app.post("/admin/admin-reset-password",authvalidation.resetpassword,admin.resetpassword);
		app.post("/admin/admin-list",admin.getadmins);
		app.post("/admin/admin-save",authvalidation.insertadmindata,admin.save);
		app.post("/admin/admin-delete",authvalidation.deleteadmindata,admin.delete);

		//setting
		app.post("/admin/get-settings",settings.Getsettings);
		app.post("/admin/setting-file",middlewares.commonUpload('./uploads').any(),settings.settingfile);
		app.post("/admin/setting-save",authvalidation.settingsave,settings.settingSave);
	}
	catch(e){
		console.log('erroe in index.js---------->>>>', e);
	}
};