'use strict';


var photomodule = angular.module('photomodule', []);

//angular.module('photomodule')
//    .controller('photoupoad', function ($scope, $location, Auth) {
//
//        console.log('hello there, upload controller is running')
//        $scope.updateTitle = function(){
//            var uploadParams = $scope.widget.fileupload('option', 'formData');
//            uploadParams["context"] = "photo=" + $scope.title;
//            $scope.widget.fileupload('option', 'formData', uploadParams);
//            console.log($scope.uploadParams)
//        };
//
//        $scope.widget = $(".cloudinary_fileupload")
//            .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {tags: 'myphotoalbum', context:'photo='}, {
//
//                dropZone: "#direct_upload",
//                start: function (e) {
//                    debugger;
//                    $scope.status = "Starting upload...";
//                    $scope.$apply();
//                },
//                fail: function (e, data) {
//                    $scope.status = "Upload failed";
//                    $scope.$apply();
//                }
//            })
//            .on("cloudinaryprogressall", function (e, data) {
//                $scope.progress = Math.round((data.loaded * 100.0) / data.total);
//                $scope.status = "Uploading... " + $scope.progress + "%";
//                $scope.$apply();
//            })
//            .on("cloudinarydone", function (e, data) {
//                $rootScope.photos = $rootScope.photos || [];
//                data.result.context = {custom: {photo: $scope.title}};
//                $scope.result = data.result;
//                $rootScope.photos.push(data.result);
//                $scope.$apply();
//            });
//
//});

photomodule.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location',
    function($scope, $rootScope, $routeParams, $location) {
        console.log('this is running')
        $scope.updateTitle = function(){
            var uploadParams = $scope.widget.fileupload('option', 'formData');
            uploadParams["context"] = "photo=" + $scope.title;
            $scope.widget.fileupload('option', 'formData', uploadParams);
            console.log($scope.uploadParams)
        };

        $scope.widget = $(".cloudinary_fileupload")
            .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {tags: 'myphotoalbum', context:'photo='}, {

                dropZone: "#direct_upload",
                start: function (e) {
                    debugger;
                    $scope.status = "Starting upload...";
                    $scope.$apply();
                },
                fail: function (e, data) {
                    $scope.status = "Upload failed";
                    $scope.$apply();
                }
            })
            .on("cloudinaryprogressall", function (e, data) {
                $scope.progress = Math.round((data.loaded * 100.0) / data.total);
                $scope.status = "Uploading... " + $scope.progress + "%";
                $scope.$apply();
            })
            .on("cloudinarydone", function (e, data) {
                $rootScope.photos = $rootScope.photos || [];
                data.result.context = {custom: {photo: $scope.title}};
                $scope.result = data.result;
                $rootScope.photos.push(data.result);
                $scope.$apply();
            });


    }]);