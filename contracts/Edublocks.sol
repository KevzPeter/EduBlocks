pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Edublocks {
    struct Student {
        int256 id;
        string user_name;
        string password;
        int256 balance;
        int256[] courses_id;
        int256[] courses_deadline;
        int256[] marks;
    }
    struct Educator {
        int256 id;
        string user_name;
        string password;
        int256 balance;
        int256[] courses_id;
    }
    struct Course {
        int256 id;
        string name;
        string description;
        string author_name;
        int256 author_id;
        int256 price;
        int256 users;
        int256 deadline;
    }

    int256 studentCount;
    int256 educatorCount;
    int256 courseCount;

    mapping(int256 => Student) students;
    mapping(int256 => Educator) educators;
    mapping(int256 => Course) courses;
    mapping(address => bool) hasAccount;
    mapping(address => bool) isEducator;

    function addStudent(string memory n, string memory pass) public {
        require(!hasAccount[msg.sender], "Address already has account");
        studentCount++;
        students[studentCount].id = studentCount;
        students[studentCount].user_name = n;
        students[studentCount].password = pass;
        students[studentCount].balance = 0;
        hasAccount[msg.sender] = true;
    }

    function addEducator(string memory n, string memory pass) public {
        require(!hasAccount[msg.sender], "Address already has account");
        educatorCount++;
        educators[educatorCount].id = educatorCount;
        educators[educatorCount].user_name = n;
        educators[educatorCount].password = pass;
        educators[educatorCount].balance = 0;
        hasAccount[msg.sender] = true;
        isEducator[msg.sender] = true; // set the account as an Educator
    }

    function studentLogin(string memory n, string memory p)
        public
        view
        returns (int256, bool)
    {
        //require(!isEducator[msg.sender], "Cannot login as Student"); //check if it's a student account
        bool found = false;
        for (int256 i = 0; i <= studentCount; i++) {
            if (
                keccak256(abi.encodePacked(students[i].user_name)) ==
                keccak256(abi.encodePacked(n)) &&
                keccak256(abi.encodePacked(students[i].password)) ==
                keccak256(abi.encodePacked(p))
            ) {
                found = true;
                return (i, true);
            }
        }
        if (!found) {
            return (-1, false);
        }
    }

    function educatorLogin(string memory n, string memory p)
        public
        view
        returns (int256, bool)
    {
        // require(isEducator[msg.sender], "Cannot login as Eeucator"); //check if it's an Educator account
        bool found = false;
        for (int256 i = 0; i <= educatorCount; i++) {
            if (
                keccak256(abi.encodePacked(educators[i].user_name)) ==
                keccak256(abi.encodePacked(n)) &&
                keccak256(abi.encodePacked(educators[i].password)) ==
                keccak256(abi.encodePacked(p))
            ) {
                found = true;
                return (i, true);
            }
        }
        if (!found) {
            return (-1, false);
        }
    }

    function addCourse(
        string memory n,
        string memory desc,
        string memory auth,
        int256 p,
        int256 d,
        int256 e_id
    ) public {
        require(isEducator[msg.sender], "Not authorized to add course"); //check if it's an Educator account
        courseCount++;
        courses[courseCount].id = courseCount;
        courses[courseCount].name = n;
        courses[courseCount].description = desc;
        courses[courseCount].author_name = auth;
        courses[courseCount].author_id = e_id;
        courses[courseCount].price = p;
        courses[courseCount].users = 0;
        courses[courseCount].deadline = d * 1 days;
        //adding course ID to educator struct
        educators[e_id].courses_id.push(courseCount);
    }

    function buyCourse(
        int256 s_id,
        int256 c_id,
        int256 _time,
        int256 e_id
    ) public {
        require(!isEducator[msg.sender], "Not authorized to buy course"); //check if it's a Student account
        courses[c_id].users++;
        students[s_id].courses_id.push(c_id);
        students[s_id].courses_deadline.push(courses[c_id].deadline + _time);
        students[s_id].balance -= courses[c_id].price; //deducting student balance
        educators[e_id].balance += courses[c_id].price; //payment for educator
        students[s_id].marks.push(0); //initializing marks for course
    }

    function reviewAssignment(
        int256 s_id,
        int256 c_id,
        int256 _m
    ) public {
        require(isEducator[msg.sender], "Not authorized to review course"); //only educator can review assignments
        uint256 totalCourses = students[s_id].courses_id.length;
        for (uint256 i = 0; i < totalCourses; i++) {
            if (students[s_id].courses_id[i] == c_id) {
                students[s_id].marks[i] = _m;
            }
        }
        if (_m >= 90) {
            students[s_id].balance += 20;
        } else if (_m >= 80) {
            students[s_id].balance += 10;
        } else if (_m >= 70) {
            students[s_id].balance += 5;
        } else if (_m < 40) {
            revert("Sorry, you have failed.");
        }
    }

    function submitAssignment(
        int256 s_id,
        int256 c_id,
        int256 _time
    ) public returns (bool) {
        require(!isEducator[msg.sender], "Not authorized to submit course"); //check if it's a Student account
        uint256 totalCourses = students[s_id].courses_id.length;
        for (uint256 i = 0; i < totalCourses; i++) {
            if (students[s_id].courses_id[i] == c_id) {
                if (_time <= students[s_id].courses_deadline[i]) {
                    return (true);
                }
                //if deadline passed,set marks=0
                else {
                    students[s_id].marks[i] = 0;
                    return (false);
                }
            }
        }
    }

    function getCourse(int256 _id) public view returns (Course memory) {
        return (courses[_id]);
    }

    function getStudent(int256 _id) public view returns (Student memory) {
        return (students[_id]);
    }

    function getEducator(int256 _id) public view returns (Educator memory) {
        return (educators[_id]);
    }

    function getCourseCount() public view returns (int256) {
        return (courseCount);
    }
}
