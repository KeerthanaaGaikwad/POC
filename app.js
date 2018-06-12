var app= angular.module('BMOApp', ['n3-pie-chart', 'ngFileUpload','angular-popover','ngRoute']);

app.config(function($routeProvider,) {
    $routeProvider
        .when('/CustomerAssesment', {
            templateUrl : 'pages/CustomerAssesmentForm.html',
            controller  : 'MainController'
        })
        .when('/thirdPartyAssesment', {
            templateUrl : 'pages/ThirdPartyAssesmentForm.html',
            controller  : 'ThirdPartyAssesmentCtrl'
        })
        .when('/BMOAssesment', {
            templateUrl : 'pages/BMOAssesmentForm.html',
            controller  : 'BMOAssesmentCtrl'
        })
        .when('/', {
		    redirectTo: '/CustomerAssesment'
		})

});

app.controller('MainController',['$scope','$http', function($scope, $http) {
	$scope.files=[];
	$scope.options = {thickness: 30, mode: "gauge", total: 100};
	$scope.data = [
	  {label: "", value: 0, color: "lightblue", suffix: "%"}
	];

	$scope.test = function(){
		console.log($scope.POFT4)
	}

	$scope.uploadFiles = function(files, ind) {
        if($scope.files[ind] == undefined){
        	$scope.data[0].value = $scope.data[0].value + 20;
        }
        $scope.files[ind] = files[0].name;
        switch(ind){
        	case '0':
        		$scope.POFT4 = files[0].name;
        		break;
        	case '1':
        		$scope.POIA01 = files[0].name;
        		break;
        	case '2':
        		$scope.POIA02 = files[0].name;
        		break;
        	case '3':
        		$scope.CCC01 = files[0].name;
        		break;
        	case '4':
        		$scope.CCC02 = files[0].name;
        		break;
        	case '5':
        		$scope.PurDeed = files[0].name;
        		break;
        }
        var req = {
			method: 'POST',
			url: 'https://upload.box.com/api/2.0/files/content',
			withCredentials : false,
			headers:{ 
				'Authorization':  'Bearer ' + "OHcXAfDRyy0JNuhQ9WxFqoyc2tMfYFEJ",
				'Access-Control-Allow-Origin': '*'
			},
			data: { name: files[0], parent : {id:0} }
		}

		$http(req).then(function(){
			console.log("success")
		}, function(){
			console.log("failure")
		});
	}

}]);

app.controller('ThirdPartyAssesmentCtrl', function($scope) {
	$scope.uploadFiles = function(files, ind) {
        switch(ind){
        	case '0':
        		$scope.CCR = files[0].name;
        		break;
        	case '1':
        		$scope.AssessorRpt = files[0].name;
        		break;
        	case '2':
        		$scope.AttorneyRpt = files[0].name;
        		break;
        	case '3':
        		$scope.HouseInspRpt = files[0].name;
        		break;
        	case '4':
        		$scope.AttorneyRpt1 = files[0].name;
        		break;
        	case '5':
        		$scope.AssessorRpt1 = files[0].name;
        		break;
        }
     }

});

app.controller('BMOAssesmentCtrl', function($scope) {
	$scope.CustFilesToBeUploaded = ["Proof of Income – T4","Proof of Income – assessment 2016","Proof of Income – assessment 2017",
								"Consent form for credit check", "Purchase Deed"];
	$scope.OtherFilesToBeUploaded = ["Credit Check Report", "Assessor Report1","Attorney Report1",
								"House Inspection","Attorney Report2"]

});