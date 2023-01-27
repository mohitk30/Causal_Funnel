const mongoose=require('mongoose')
const {blogsConnection} = require('../dbConnection/dbconnect');

 

const blogsSchema= new mongoose.Schema({
    
    blogAddedOn:{ type: Number ,default: () => new Date(+new Date() + 7*24*60*60*1000)},
    blogTitle:{type:String,required:true },
    blogCategory:{type:String,required:true },
    blogDescription:{type:String,required:false},
    blogAddedByUser:{type:String,required:true},
    blogAddedByUserEmail:{type:String,required:true},
  
     

},{collection:'blogs'});

const model=blogsConnection.model('BlogModel',blogsSchema);
 
module.exports=model


 