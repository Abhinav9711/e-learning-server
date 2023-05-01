const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'name is required']
    },
    isLive: {
        type: Boolean   // for checking upcoming courses
    },
    videos: {
        type: Array
    },
    class: {
        type: String
    },
    quiz: {
        type: Array
        // quize: [
        //     {
        //         question: 'question 1',
        //         options: ['option1', 'option2', 'option3', 'option4'],
        //         answer: 'option2/value'
        //     },
         //     {
        //         question: 'question 2',
        //         options: ['option1', 'option2', 'option3', 'option4'],
        //         answer: 'option2/value'
        //     },
         //     {
        //         question: 'question 3',
        //         options: ['option1', 'option2', 'option3', 'option4'],
        //         answer: 'option2/value'
        //     },
         //     {
        //         question: 'question 4',
        //         options: ['option1', 'option2', 'option3', 'option4'],
        //         answer: 'option2/value'
        //     },
        // ]
    },
});
module.exports = mongoose.model('course', userSchema);