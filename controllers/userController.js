crud.controller("userController", function ($scope, $http) {
    $scope.errMsg = "";
    $scope.successMsg = "";
    $scope.templateDir = "views/";
    $scope.page = "index.html";
    
    $scope.genderList = [
        {key : "0", val : "Female"},
        {key : "1", val : "Male"}
    ];

    $scope.checkAll = function () {
        angular.forEach($scope.users, function (u) {
            u["checkRow"] = $scope.allCheck;
        });
    }
    $scope.checkEveryRow = function () {
        $scope.allCheck = $scope.users.every(function (u) {
            return u.checkRow;
        });
    }

    $scope.sort = {
        column: '',
        order: false
    }
    var sort = $scope.sort
    $scope.sortData = function (column) {
        sort.column = column;
        sort.order = !sort.order;
    };

    /*
     * @author : Nitin Kumar
     * Date : 21 July 2017
     * Description : Get User List From Database
     */

    $scope.getData = function () {
        $http.get("http://www.localhost:2020/get-user").then(function (succ) {
            $scope.users = succ.data;

            angular.forEach($scope.users, function (u) {
                u["checkRow"] = false;
            });

        }, function (err) {
            $scope.errMsg = "404 Page Not Found";
        });
    }

    /*
     * @author : Nitin Kumar
     * Date : 21 July 2017
     * Description : Delete Single User
     */
    $scope.delete = function (userid) {
        $http.delete("http://www.localhost:2020/delete", {params: {id: userid}}).then(function (succ) {
            if (succ.data.success) {
                $scope.successMsg = "User successfully deleted";
                $scope.getData();
            } else {
                $scope.errMsg = (typeof succ.data.msg != 'undefined' && succ.data.msg != "") ? succ.data.msg : "Something wrong"
            }
        }, function (err) {
            $scope.errMsg = "Could not able to delete user. Please try later";
        });

    }

    /*
     * @author : Nitin Kumar
     * Date : 21 July 2017
     * Description : Delete Multiple User
     */
    $scope.deleteSelected = function () {
        var empList = [];

        angular.forEach($scope.users, function (u) {
            if (u.checkRow == true) {
                empList.push(u.id);
            }
        });

        if (empList.length > 0) {
            $http.delete("http://www.localhost:2020/delete-selected", {params: {user_list: empList}})
                    .then(function (succ) {
                        if (succ.data.success) {
                            $scope.successMsg = "User successfully deleted";
                            $scope.getData();
                        } else {
                            $scope.errMsg = (typeof succ.data.msg != 'undefined' && succ.data.msg != "") ? succ.data.msg : "Something wrong"
                        }
                    }, function (err) {
                        $scope.errMsg = "Could not able to delete user. Please try later";
                    });
        } else {
            $scope.errMsg = "No user selected";
        }
    }
    
    /*
     * @author : Nitin Kumar
     * Date : 21 July 2017
     * Description : Change Page Content On Click
     */
    
    $scope.changePage = function(page){
        $scope.page = page+".html";
    }
    
    /*
     * @author : Nitin Kumar
     * Date : 21 July 2017
     * Description : Add New User
     */
    
    $scope.saveData = function(user){
        if($scope.userForm.$valid){
            $http.post("http://www.localhost:2020/save",user).then(function(succ){
                console.log("succ : ");
                console.log(succ);
            },function(err){
                console.log("Error : ");
                console.log(succ);
            });
        }
    }

    $scope.getData();
});