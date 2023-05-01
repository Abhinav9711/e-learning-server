const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  studentName: {
   type: String,
   required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    index: {
      unique: true
    }
  },
  password: {
      type: String,
      required: [true, 'Password is required']
    }
    //,
    // rollNumber: {
    //     type: String,
    //     index: {
    //         unique: true
    //       }
    // },
    // class: {
    //     type: Number
    // }
    //,
    // quize: {
    //     type: Array
    //     // quize: [
    //     //     {
    //     //         subject: 'hindi',
    //     //         answer: [ {
    //     //             1: 'selected option/answer',
    //     //             2: 'selected option/answer',
    //     //             3: 'selected option/answer'
    //     //         }]
    //     //     }
    //     // ]
    // }

});
module.exports = mongoose.model('student', userSchema);