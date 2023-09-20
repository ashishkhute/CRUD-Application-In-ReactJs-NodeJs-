import { AppDataSource } from "../../data-source";
import * as entities from "../Entity/User";
import { addUserModel, getUsersModel, loginModel } from "../Model/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from 'jsonwebtoken'
const repository = AppDataSource.getRepository(entities.User);

export const TOKEN_SECRET:Secret ="Secret_JWT_Key";
const getUsers = async () =>{
    const student = await repository.find();
    return student; 
}

const addUser = async (req:Request, model:addUserModel) => {
    try{
        const user =  new entities.User();
        if(user){
        user.userName = model.userName? model.userName:user.userName;
        user.email = model.email? model.email:user.email;
        user.password = model.password? model.password:user.password;
        let foundUser = await repository.findOneBy({email:user.email})
        if(foundUser ){return {
          message:"Email already Exists"
        }}else{
        await repository.save(user);}
        return user;}
        
}catch(error){
    console.log(error)
}
}

async function login( model: loginModel) {
    try{
      if(model?.email && model?.password){
      const user = await repository.findOne({
        where:{
            email: model.email
        }
    });
    if(user){
      const match = await bcrypt.compare(model.password,user.password);
      
      if(match){
        const token = jwt.sign({id:user?.id }, TOKEN_SECRET,{
        expiresIn: '1h'
    });


return {
  status:200,
  success:true,
  data:{
    userDetails:{
      token:token,
      user:user
    }},
}
    };
    
  }else{
    return{ status:400, message:"Wrong Password"}
  }
  } 
  }catch(err){
       return{
        status:500, message:'internal error',data:null
       }
    }

}

async function getUser(model:getUsersModel){
  const id = model?.id;
  try{
    const user = await repository.findOneBy({id:id})
    if(!user){
      return{
        status:401,
        message:'User Not Found',
        success:false,
        data:{}
      }
    }

      return{
        status:200,
        message:'User Found',
        success:true,
        data:{user}
    }
  } catch(error){
    console.log(error)
  }
}

export {
    getUsers,
    addUser,
    login,
    getUser
}