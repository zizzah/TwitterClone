import UserModel from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";

 // login user
export const getUser  = async (req, res)=>{
 
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id).exec();


        if(user){
            const {password,... otherDetails}=user._doc
            res.status(200).json(otherDetails)
        }

        else{
            res.status(404).json('No such user exist')
        }



    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}


// update user 
export const updateUser = async (req,res) =>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminSatus,password}=req.body;

    if(id === currentUserId || currentUserAdminSatus){
        try {
            if(password){
                const salt = await bcryptjs.genSaltSync(10)
                req.body.password= await bcryptjs.hash(password,salt)
            }
            const user = await UserModel.findByIdAndUpdate(id,req.body, { new: true })
            res.status(200).json(user)
        } 
        
        
        catch (error) {
            res.status(500).json({ message: error.message });

        }
    }
    else{
        res.status(403).json('Access Denied! you can only update your on profile')
    }


}

// delete user

export const deleteUser = async (req, res) =>{
    const id = req.params.id;

    const {currentUserId ,currentUserAdminSatus,password}=req.body;

    if(currentUserId === id || currentUserAdminSatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User have been successfuly deleted")
            
        } catch (error) {
           
            res.status(500).json({ message: error.message });

        }
    }

    else{
        res.status(403).json('Access Denied! you can only delete your on profile')

    }
}

// user follow

export const followUser = async (req,res)=>{
    const id = req.params.id;

    const {currentUserId}=req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden")
    }

    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)
               console.log(followingUser)
            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push:{followers:currentUserId}});
                await followingUser.updateOne({$push:{following:id}});
                res.status(200).json("User followed!")


            }
            else{
                res.status(403).json("User is already followed by you")
            }
            
        } catch (error) {
            res.status(500).json('this is not working'+ error)
        }    }
}


// unfollow 


export const  unFollowUser = async (req,res)=>{
    const id = req.params.id;

    const {currentUserId}=req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden")
    }

    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)
               console.log(followingUser)
            if(followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$pull:{followers:currentUserId}});
                await followingUser.updateOne({$pull:{following:id}});
                res.status(200).json("User unfollowed!")


            }
            else{
                res.status(403).json("User is not followed by you")
            }
            
        } catch (error) {
            res.status(500).json('this is not working'+ error)
        }    }
}