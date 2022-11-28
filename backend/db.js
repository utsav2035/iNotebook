const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/inotebook?readPreference=primary&ssl=false&directConnection=true'

const connectToMongoose = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("connected to mongo");
    })
}

module.exports = connectToMongoose;