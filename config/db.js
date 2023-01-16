const mongoose = require("mongoose")
mongoURL ="mongodb+srv://kanwarpal:jmskpbanna@cluster0.1slzfjj.mongodb.net/SocialMedia?retryWrites=true&w=majority"
const connection = mongoose.connect(mongoURL)

module.exports = {connection}