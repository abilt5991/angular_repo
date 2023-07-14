(function(){
    'use strict';
    
    var studentDetails = {
        name : "Abinaya",
        roll_num : 502,
        course : "Web Development",
        college : "Self Learn"
    };
    var studentScore = [
        {
            subject : "HTML5",
            score : 90
        },
        {
            subject : "CSS3",
            score : 85
        },
        {
            subject : "JQuery",
            score : 92
        },
        {
            subject : "TypeScript",
            score : 88
        },
        {
            subject : "Angular JS",
            score : 100
        }
    ];    
    var knowledgeRank = [1,2,3,4,5];
    
    var skillset = [
        {
            skill : "Dance Classical",
            knowledge : 3
            
        },
        {
            skill : "Drawing",
            knowledge : 3
        }
    ];
    
    
    
    angular.module("studentApp", [])
    .controller("showController", showController)
    .controller("scoreController", scoreController)
    .controller("skillController", skillController)
    .provider("ManageskillService", ManageskillServiceProvider)
    .controller("displaySkillsCtrl", displaySkillsCtrl)
    .controller("achievementsController", achievementsController);
    
    
    function showController () {
        var show = this; //controller instance
        show.name = studentDetails.name;
        show.roll_num = studentDetails.roll_num;
        show.course = studentDetails.course;
        show.college = studentDetails.college;
    }
    
    

    scoreController.$inject = ["$filter"]; //dependency injection 
    function scoreController( $filter) {
        var score = this; //controller instance
        //var count = 1;
        score.studentScore = studentScore;
        score.ordermeBy = function(input) {
            score.studentScore = $filter("orderBy")(score.studentScore, input);  // In built filter 'uppercase'
        }
    }

    skillController.$inject = ["ManageskillService"];
    function skillController (ManageskillService){
        var manageSkills = this;
        manageSkills.knowledgeRank = knowledgeRank;
        manageSkills.selected = manageSkills.knowledgeRank[0];
        
        //var skillsetFac = ManageskillFactory();
        
        manageSkills.addSkill = function() {
            try{
                ManageskillService.addNewSkill(manageSkills.skill, manageSkills.selected);
                manageSkills.errorMsg = "";
            } catch (err){
                manageSkills.errorMsg = err.message;
        }
            
        }
        ManageskillService.removeSkill = function() {
        }
    }
    
    
    function displaySkillsCtrl() {
        var skills2 = this;
        skills2.skillset = skillset;
    }
    
    function ManageskillService() {
        var service = this;
        service.addNewSkill =  function (inp1, inp2) {
            if(!(inp1 == undefined || inp1 == "")) {
                var item = {
                "skill" : inp1,
                "knowledge" : inp2
                }; 
                skillset.push(item);
                
            } else {
                throw new Error("Give a Valid Input");
            }
            
        };
    }
    
    function ManageskillServiceProvider() {
        var provider = this;
        provider.$get = function () {
            return new ManageskillService();
        };
        
    }
    
    
})();