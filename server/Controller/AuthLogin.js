import UserModel from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";

export const loginUser =async(req,res)=>{

    const { username, password } = req.body;
    
    try {
      const user = await UserModel.findOne({ username }).exec();
  
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      const validity = await bcryptjs.compare(password, user.password);
  
      if (!validity) {
        return res.status(400).json({ message: 'Wrong password' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    }
    