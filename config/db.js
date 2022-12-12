const mongoose=require('mongoose');
const config = require ('config');
//const db=config.get('mongoURI');

const ConnectDB=async()=>{ 
    try {
        await mongoose.connect('mongodb+srv://louay:louay@cluster0.hn0kvwg.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser:true ,

        })
        console.log('connecter a  mongoose')
    } catch (error) {
        console.error(err.message);
        //sortir avec echou 

        process.exit(1)
    }
}
module.exports=ConnectDB;