const { default: mongoose } = require("mongoose");




module.exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log('mongodb connection error:',error);
    }
}


