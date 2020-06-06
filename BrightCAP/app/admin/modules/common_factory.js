var app = angular.module('handyforall.admin');
app.factory('AppService', AppService);

function AppService($http, $q, Upload, /* socket */ ) {
    var appservice = {};
    appservice.httpRequest = function(method, url, data) {
        var deferred = $q.defer();
        $http({
            method: method,
            url: url,
            data: data
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    appservice.httpGetRequestCallback = function(url, data, callback) {
        var deferred = $q.defer();
        $http.get(url, data)
            .success(function(response) {
                callback(response);
            }).error(function(err) {
                toastr.error('login error', 'Error');
            });
    };

    appservice.httpPostRequestCallback = function(url, data, callback) {
        var deferred = $q.defer();
        $http.post(url, data)
            .success(function(response) {
                callback(response);
            }).error(function(err) {
                toastr.error('login error', 'Error');
            });
    };

    /* appservice.socketcall = function (event, data) {
        var deferred = $q.defer();
        socket.emit(event, data);
        socket.on(event, function (d) {
            deferred.resolve(d);
        });
        return deferred.promise;
    }

    appservice.getfilesocketCall = function (event, eventdata) {
        var deferred = $q.defer();
        var stream = ss.createStream({
            highWaterMark: 1024,
            objectMode: true,
            allowHalfOpen: true
        });
        ss(socketStream).emit(event, stream, eventdata);
        if (eventdata.type == 'json') {
            var data = "";
        } else {
            var data = [];
        }
        stream.on('data', function (chunk) {
            data += chunk;
        });
        stream.on('end', function () {
            data = data.replace(/'/g, '"');
            deferred.resolve(JSON.parse(data));
        });
        return deferred.promise;
    } */
    appservice.httpUploadRequest = function(url, data) {
        var deferred = $q.defer();
        Upload.upload({
            url: url,
            arrayKey: '',
            data: data
        }).then(function(data) {
            deferred.resolve(data);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return appservice;
}