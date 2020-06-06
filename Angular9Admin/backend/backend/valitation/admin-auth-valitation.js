module.exports = function (app) {
    const { check, validationResult } = require('express-validator');

    var data = {};
    data.status = 0;
    data.response = 'Invalid Request';

    var validator = {};

    validator.insertadmindata = [

        check('name').notEmpty().withMessage('Name Required'),
        check('email').notEmpty().withMessage('Email Required'),
        check('email').isEmail().withMessage('Invalid Email'),
        check('password').exists(),
        check('confirmPassword', 'Confirm Password field must have the same value as the password field')
            .exists()
            .custom((value, { req }) => value === req.body.password),
        (req, res, next) => {

            const errors = validationResult(req).array();

            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];

    validator.deleteadmindata = [

        check('delData').notEmpty().withMessage('Delete feild is Required'),
        (req, res, next) => {

            const errors = validationResult(req).array();

            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];

    validator.requestemaildata = [

        check('email').notEmpty().withMessage('Email is Required'),
        check('email').isEmail().withMessage('Email should be the real one!'),
        (req, res, next) => {

            const errors = validationResult(req).array();

            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];

    validator.resetpassword = [

        check('password').notEmpty().withMessage('Password is Required'),
        (req, res, next) => {

            const errors = validationResult(req).array();

            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];

    validator.settingsave = [
        check('site_title').notEmpty().withMessage('Site Title is Required'),
        check('site_url').notEmpty().withMessage('Site Url is Required'),
        check('siteaddress').notEmpty().withMessage('Site Address is Required'),
        check('email_address').notEmpty().withMessage('Email Address is Required'),
        check('admin_commission').notEmpty().withMessage('Admin Commission is Required'),
        check('service_tax').notEmpty().withMessage('Service Tax is Required'),
        check('tasker_distance').notEmpty().withMessage('Tasker Distance is Required'),
        check('tasker_radius').notEmpty().withMessage('Tasker Radius is Required'),
        check('map_api').notEmpty().withMessage('Map Api is Required'),
        (req, res, next) => {

            const errors = validationResult(req).array();

            if (errors.length > 0) {
                data.response = errors[0].msg;
                return res.send(data);
            }
            return next();
        }];

    return validator;
};