import UserModel from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";
  export const registerUser =async(req,res)=>{
    const {username,password, firstname,lastname}=req.body;

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    
    const newUser =UserModel({username,password:hashedPassword,firstname,lastname})

    try{
      await newUser.save()
      res.status(200).json(newUser)
    }
    catch (error){
     res.status(500).json({message:error.message})
    }
}

 
// login user

/* export const loginUser =async(req,res)=>{
  const {username,password}=req.body

  try{
  const user = await UserModel.find({username:username})
  if(user){
    const validity = await bcryptjs.compare(password, user.password)

    validity? res.status(200).json(user):res.status(400).json('Wrong password')
  }
  else{
    res.status(400).json('User does not exist')
  } 
  }
   catch (error){
    res.status(500).json({message:error.message})

   }
} */