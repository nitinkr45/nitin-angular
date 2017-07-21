crud.controller("userController", function ($scope, $http) {
//    $scope.users = {};
    $scope.errMsg = "";            
            $scope.getData = function () { 
            $http.get("http://www.localhost:2020/get-user")
                .then(function (succ) {
                    
                    $scope.users = succ.data;
                    angular.forEach($scope.users, function (u) {
                        u["checkRow"] = false;
                    })
                    //Header check box click
                    $scope.checkAll = function ()
                    {
                        angular.forEach($scope.users, function (u) {
                            u["checkRow"] = $scope.chkHeader;
                        })
                    }
                    //Header check box click

                }, function (err) {

                });
            }
            $scope.getData();
        });