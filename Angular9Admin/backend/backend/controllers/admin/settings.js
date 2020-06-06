"use strict";
var db = require("../../mongo/connector.js");

module.exports = () => {

    var router = {};

    router.Getsettings = (req, res) => {
        var returndata = {
            status: 0,
            response: "Invalid response"
        }
        try {
            db.GetOneDocument('settings', {}, {}, {}, (err, docdata) => {
                if (err) {
                    returndata.response = err;
                    res.send(returndata);
                } else {
                    returndata.status = 1;
                    returndata.response = docdata;
                    res.send(returndata);
                }
            })
        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    }

    router.settingfile = (req, res) => {
        res.send(req.files[0]);
    }

    router.settingSave = (req, res) => {
        var returndata = {
            status: 0,
            response: "Invalid response"
        }
        try {
            var data = { settings: {} };
            data.settings.site_title = req.body.site_title;
            data.settings.site_url = req.body.site_url;
            data.settings.siteaddress = req.body.siteaddress;
            data.settings.email_address = req.body.email_address;
            data.settings.contact_number_one = req.body.contact_number_one;
            data.settings.contact_number_two = req.body.contact_number_two;
            data.settings.admin_commission = req.body.admin_commission;
            data.settings.minimum_amount = req.body.minimum_amount;
            data.settings.service_tax = req.body.service_tax;
            data.settings.tasker_distance = req.body.tasker_distance;
            data.settings.tasker_radius = parseInt(req.body.tasker_radius);
            data.settings.location = req.body.location;
            data.settings.sitelogo = req.body.file;
            data.settings.map_api = req.body.map_api;
            data.alias = req.body.alias;

            if (req.body._id) {
                db.UpdateDocument('settings', { _id: req.body._id }, data, {}, function (err, docdata) {
                    if (err) {
                        returndata.response = err;
                        res.send(returndata);
                    } else {
                        returndata.status = 1;
                        returndata.response = docdata;
                        res.send(returndata);
                    }
                });
            } else {
                db.InsertDocument('settings', data, (err, docdata) => {
                    if (err) {
                        returndata.response = err;
                        res.send(returndata);
                    } else {
                        returndata.status = 1;
                        returndata.response = docdata;
                        res.send(returndata);
                    }
                })
            }

        } catch (error) {
            returndata.response = error;
            res.send(returndata);
        }
    };

    return router;
}