import mongoose from "mongoose";


const userSchema =mongoose.Schema({
    username:{
     type:'string',
     required:true
    },
    password:{
        type:'string',
        required:true
       },
       firstname:{
        type:'string',
        required:true
       },
       lastname:{
        type:'string',
        required:true
       },
       isAdmin:{
        type:'boolean',
        default:false
       },
       profilePicture:'string',
       coverPicture:'string',
       about:'string',
       livesin:'string',
       worksAt:'string',
       relationship:'string',
       followers:[],
       following:[],
},
{timestamps:true}
)

const UserModel =mongoose.model('users',userSchema);

export default  UserModel
