    angular.module('handyforall.accounts')
    .controller('AccountDocumentCtrl', AccountDocumentCtrl)
    .controller('DocumentModalInstanceCtrl', DocumentModalInstanceCtrl)
        .filter('checkTaskerDocs', checkTaskerDocs);
AccountDocumentCtrl.$inject = ['toastr', 'TaskerDocumentResolve', 'TaskerTaskResolve', '$uibModal', 'AppService'];
DocumentModalInstanceCtrl.$inject = ['docsResolve', '$uibModalInstance'];

function AccountDocumentCtrl(toastr, TaskerDocumentResolve, TaskerTaskResolve, $uibModal, AppService) {
    var adtc = this;    
    adtc.currenttassker = TaskerDocumentResolve.result[0];
    adtc.taskerStatus = TaskerTaskResolve;
    adtc.allowDocUpload = true;
    if(adtc.taskerStatus == 'Tasker Engaged') {
        adtc.allowDocUpload = false;
    }
    adtc.documentLists = [];
    AppService.httpRequest('POST', '/site/users/taskerDocument', {}).then(function (response) {
        adtc.documentLists = (angular.isDefined(response) && response.length > 0) ? response : [];
		console.log('adtc.documentLists', adtc.documentLists);
    }).catch(function (err) {
        console.error('err = ', err);
    });
    adtc.showEditForm = function(doc) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/site/modules/accounts/views/new-account/upload.document.modal.html',
            controller: 'DocumentModalInstanceCtrl',
            controllerAs: 'ADCM',
            resolve: {
                docsResolve: function () {
                    return doc;
                }
            }
        });
        modalInstance.result.then(function (docdata) {
            if (angular.isDefined(docdata)) {
                var data = {};
                data.tasker = adtc.currenttassker._id;
                data.doc_id = doc._id;
                data.doc_name = doc.name;
                data.doc = docdata;
                AppService.httpUploadRequest('/site/tasker/taskerDocumentEdit', data).then(function (response) {
                    console.log('response', response);
                    if (response.status == 1) {
                        toastr.success('Document Updated Successfully');
                        if (response.result && response.result.length > 0) {
                            adtc.currenttassker.doc = response.result;
                        }
                    } else {
                        toastr.error("Unable to update document");
                    }
                });
            }
        });
    };
    adtc.deleteTaskerDocument = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/site/modules/accounts/views/new-account/delete.confirm.modal.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
                $scope.deleteData = function () {
                    var index = adtc.currenttassker.doc.findIndex(function (e) { return e.id.toString() === id.toString() });
                    if (index !== -1) {
                        adtc.currenttassker.doc.splice(index, 1);
                    }
                    var data = {};
                    data.tasker = adtc.currenttassker._id;
                    data.id = id;
                    $uibModalInstance.close(data);
                }
            },
            size: 'small'
        });
        modalInstance.result.then(function (docdata) {
            if (angular.isDefined(docdata)) {
                AppService.httpRequest('POST', '/site/tasker/update-documents', docdata).then(function (response) {
                    if (response.status === 1) {
                        toastr.success('Document deleted successfully');
                        adtc.currenttassker.doc = response.result;
                    } else {
                        toastr.error("Unable to delete document");
                    }
                });
            }
        });
    }
}

function DocumentModalInstanceCtrl(docsResolve, $uibModalInstance) {
    var adcm = this;
    adcm.documentData = (angular.isDefined(docsResolve) && Object.keys(docsResolve).length > 0) ? docsResolve : {};
    function updateTaskerDocument(doc) {
        adcm.docname = doc;
    };
    function loadFile(event) {
        adcm.output = document.getElementById('output');
        if (angular.isDefined(adcm.docname) && adcm.docname.type == 'image/jpg' || adcm.docname.type == 'image/jpeg' || adcm.docname.type == 'image/png') {
            adcm.output.src = URL.createObjectURL(event.target.files[0]);
        } else if (angular.isDefined(adcm.docname) && adcm.docname.type == 'application/pdf') {
            adcm.output.src = 'uploads/default/pdf.png';
        } else {
            adcm.output.src = 'uploads/default/doc.png';
        }
    };
    function ok(valid) {
        if (valid) {
            $uibModalInstance.close(adcm.docname);
        }
    };
    function cancel() {
        $uibModalInstance.dismiss('cancel');
    };
    angular.extend(adcm, {
        updateTaskerDocument: updateTaskerDocument,
        loadFile: loadFile,
        ok: ok,
        cancel: cancel
    });
}
function checkTaskerDocs() {
    return function (array, value) {
        var taskerDoc = {};
        var index = array.findIndex(function (e) { return e.id === value })
        if (index !== -1) {
            taskerDoc = array[index];
            taskerDoc.status = true;
        } else {
            taskerDoc.status = false;
        }
        return taskerDoc;
    }
}