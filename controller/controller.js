const { isEmpty, get } = require('lodash');

const Student = require('../models/student');
const Course = require('../models/course');


const createUser = async(req, res) => {
    try {
        const email = get(req.body, 'email');
        const studentName = get(req.body, 'name');
        const password = get(req.body, 'password');
        const confirmPassword = get(req.body, 'confirmPassword');

        if (isEmpty(email) || isEmpty(studentName) || isEmpty(password) || isEmpty(confirmPassword)) {
            res.json({ message: 'Please pass all the required values', status: 'failed' });
            return;
        }

        if (password !== confirmPassword) {
            res.json({ messsage: 'Password are not matching, Please insert correct password', status: 'failed' });
            return;
        }

        const StudentDetails = new Student({
            email,
            studentName,
            password,
        })
        await StudentDetails.save();

        res.status(200).json({ message: `User : ${studentName}, registered successfully`, status: 'success', data: { studentName, email } });
    }
    catch (error) {
        res.json({ 'message': error.message, status: 'failed' });
    }

}

const loginUser = async(req, res) => {
    try {
        const email = get(req.body, 'email');
        const password = get(req.body, 'password');

        let userData = await Student.findOne({ email });
        if (isEmpty(userData)) {
            res.json({ message: 'User does not exist, Please sign up', status: 'failed' });
            return;
        }

        if (password !== get(userData, 'password')) {
            res.json({ message: 'Invalid Password', status: 'failed' });
            return;
        }

        const {liveCourse, upcomingCourse} = await getCourse();
        res.json({ data: {liveCourse, upcomingCourse}, message: 'User sigin successfull', status: 'success' });
    }

    catch (error) {
        res.status(400).json(error);
    }

}

const getCourse = async() => {
    const courseData = await Course.find({}); 
    let liveCourse = [];
    let upcomingCourse = [];
    await courseData.map(course => {
        const {isLive, courseName, quiz} = course;
        if(isLive) {
            
            liveCourse.push({courseName, quiz});
        }
        else {
            upcomingCourse.push({courseName, quiz});
        }
    })

    //res.json({ liveCourse, upcomingCourse, status: 'success' });
    return ({liveCourse, upcomingCourse});
}

const getQuiz = async(req, res) => {
    const {courseName} = req.body;
    const courseData = await Course.findOne({courseName});
    res.json({ data: courseData, status: 'success' });
}


// const createCourse = async(req, res) => {

//     const courseNames = ['English part 2', 'Maths part 2', 'ENV part 2', 'GK part 2', 'Arts part 2', 'Hindi part 2'];
    
//     await courseNames.map( async(course) => {
        
//         const courseDetails = new Course({
//             courseName: course,
//             isLive: false,
//             videos: [],
//             class: '5th',
//             quiz: [{
//                 ques: 'what is the capital of India ?',
//                 options: ['Mumbai', 'Kolkata', 'Bengaluru', 'Delhi'],
//                 answer: 'Delhi'
//             },
//             {
//                 ques: 'who is the prime minister of India ?',
//                 options: ['Virat Kohli', 'Sonia Gandhi', 'Narendra Modi', 'Rahul Gandhi'],
//                 answer: 'Narendra Modi'
//             },
//             {
//                 ques: '4 * 5 = ___ ?',
//                 options: ['20', '30', '22', '45'],
//                 answer: '20'
//             },
//             {
//                 ques: 'Find the missing number in series - 2, 5, 8, 11, ? , 17, 20',
//                 options: ['13', '14', '15', '16'],
//                 answer: '14'
//             },
//             {
//                 ques: 'The opposite of EMPTY is ?',
//                 options: ['ice', 'full', 'nice', 'good'],
//                 answer: 'full'
//             }]
//         })

//         await courseDetails.save()

//     })

// }

module.exports = {
    createUser,
    loginUser,
    getCourse,
    // createCourse,
    getQuiz
}
