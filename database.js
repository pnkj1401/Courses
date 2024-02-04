const mongoose = require("mongoose");

class Database{

    constructor(){
        this.connect();
    }
    connect(){
    mongoose.connect("mongodb+srv://nvi16112:xJSoW7L6@confessioncluster.qlrql75.mongodb.net/?retryWrites=true&w=majority")
        .then(()=>{
            console.log("connected");
})
        .catch((err)=>{
            console.log(" not connected"+ err);
        })}

}
module.exports = new Database();