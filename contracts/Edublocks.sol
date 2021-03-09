pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract StudentContract {
    
    struct Student{
        int id;
        string user_name;
        string password;
        int balance;
        int[] courses_id;
        int[] courses_deadline;
        int[] marks;
    }
    struct Educator{
        int id;
        string user_name;
        string password;
        int balance;
        int[] courses_id;
    }
    struct Course{
        int id;
        string name;
        string description;
        string author_name;
        int author_id;
        int price;
        int users;
        int deadline;
    }
    
    int studentCount;
    int educatorCount;
    int courseCount;
    
    mapping(int=>Student) students;
    mapping(int=>Educator) educators;
    mapping(int=>Course) courses;
    mapping(address=>bool) hasAccount;
    mapping(address=>bool) isEducator;
    
    function addStudent(string memory n, string memory pass) public {
        require(!hasAccount[msg.sender],"Address already has account");
        studentCount++;
        students[studentCount].id=studentCount;
        students[studentCount].user_name=n;
        students[studentCount].password=pass;
        students[studentCount].balance=0;
        hasAccount[msg.sender]=true;
    }
    function addEducator(string memory n, string memory pass) public {
        require(!hasAccount[msg.sender],"Address already has account"); 
        educatorCount++;
        educators[educatorCount].id=educatorCount;
        educators[educatorCount].user_name=n;
        educators[educatorCount].password=pass;
        educators[educatorCount].balance=0;
        hasAccount[msg.sender]=true;
        isEducator[msg.sender]=true; // set the account as an Educator
    }
    function studentLogin(string memory n,string memory p) view public returns (int,bool){
        bool found=false;
        for(int i=0;i<=studentCount;i++){
            if(keccak256(abi.encodePacked(students[i].user_name)) == keccak256(abi.encodePacked(n)) && 
            keccak256(abi.encodePacked(students[i].password)) == keccak256(abi.encodePacked(p))){
                found=true;
               return(i,true);
            }
        }
        if(!found){
            return(-1,false);
        }
    }
    function educatorLogin(string memory n,string memory p) view public returns(int,bool){
        bool found=false;
        for(int i=0;i<=educatorCount;i++){
            if(keccak256(abi.encodePacked(educators[i].user_name)) == keccak256(abi.encodePacked(n)) && 
            keccak256(abi.encodePacked(educators[i].password)) == keccak256(abi.encodePacked(p))){
                found=true;
               return(i,true);
            }
        }
        if(!found){
            return(-1,false);
        }
    }
    function addCourse(string memory n,string memory desc,string memory auth,int p,int d,int e_id) public {
        require(isEducator[msg.sender],"Not authorized to add course"); //check if it's an Educator account
        courseCount++;
        courses[courseCount].id=courseCount;
        courses[courseCount].name=n;
        courses[courseCount].description=desc;
        courses[courseCount].author_name=auth;
        courses[courseCount].author_id=e_id;
        courses[courseCount].price=p;
        courses[courseCount].users=0;
        courses[courseCount].deadline=d*1 days;
        //adding course ID to educator struct
        educators[e_id].courses_id.push(courseCount);
    }
    function buyCourse(int s_id,int c_id,int _time,int e_id) public { 
        require(!isEducator[msg.sender],"Not authorized to buy course"); //check if it's a Student account
        courses[c_id].users++;
        students[s_id].courses_id.push(c_id);
        students[s_id].courses_deadline.push(courses[c_id].deadline+_time);
        students[s_id].balance-=courses[c_id].price; //deducting student balance
        educators[e_id].balance+=courses[c_id].price; //payment for educator
    }
    function reviewAssignment(int s_id,int c_id,int _m) public{
        require(isEducator[msg.sender],"Not authorized to review course"); //only educator can review assignments
        uint totalCourses=students[s_id].courses_id.length;
        for(uint i=0;i<totalCourses;i++){
            if(students[s_id].courses_id[i]==c_id){
                students[s_id].marks[i]=_m;
            }
        }
        if(_m>=90){
            students[s_id].balance+=10;
        }
        else if(_m>=80){
            students[s_id].balance+=5;
        }
        else if(_m>=70){
            students[s_id].balance+=2;
        }
        else if(_m<40){
            revert("Sorry, you have failed.");
        }
    }
    function submitAssignment() public {
        require(!isEducator[msg.sender],"Not authorized to submit course"); //check if it's a Student account
        //check deadline
        //if deadline passed->marks=0
    }
function getCourse(int _id) view public returns (Course memory){
    return(courses[_id]);
}
function getStudent(int _id) view public returns (Student memory){
    return(students[_id]);
}
function getEducator(int _id) view public returns (Educator memory){
    return(educators[_id]);
}

}