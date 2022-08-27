const mongoose = require('mongoose');

const schema = mongoose.Schema({
    testfiled1: {
        type: String,
        require: true
    },
    testfiled2: {
        type: String,
        require: true
    }
})

const TestModel = mongoose.model('TestModel', schema);
module.exports = TestModel;