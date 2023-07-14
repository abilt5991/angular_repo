  (function(){
      'use strict';  
      
      angular.module("filterApp", [])
      .controller("filterCtrl", filterCtrl)
      .filter("replace", replaceFilter);
      
      filterCtrl.$inject = ["$scope", "replaceFilter"];
      function filterCtrl($scope, replaceFilter) {
          $scope.replaceMe="";
          $scope.replaceWith="";
          $scope.thePassage = "Abi is a Developer.\nAbi is very smart and generous. \nAbi is learing Angular JS framework.\nAbi is ambitious.\nAbi works hard to get things done.\nAnd oh, Abi is very organised and plans things in prior..";
          $scope.errorMsg="";
          
          $("input[type=text]").keydown(function(){ //Remove error msg when input textbox is entered
              $scope.errorMsg ="";
          });
          
          $scope.replaceWord = function() {
            if($scope.replaceMe && $scope.replaceWith) {
                $scope.thePassage = replaceFilter($scope.thePassage, $scope.replaceMe, $scope.replaceWith);
                $("input[type=text]").val(""); //Empty textboxes after every successful replacement
            } else {
                $scope.errorMsg = "Please enter a valid input text";
            }
            
          }
      }
      
//    Filter Factory Function
      function replaceFilter() {
          return function (inpText, replaceWhat, replaceWith){
              var modifiedText = inpText.replaceAll(replaceWhat, replaceWith);
              return modifiedText;
              
          }
          
      }
      
  })();   
