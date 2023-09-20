import { addUserModel, getUsersModel, loginModel } from "../Model/UserModel";
import { Request, Response } from "express";
import * as userService from "../Services/UserService"
import { AppDataSource } from "../../data-source";
import { User } from "../Entity/User";



async function GetUsers(req: Request, res: Response) {
    
    const response = await userService.getUsers();
    res.send(response);
    }


async function AddUser(req: Request, res: Response) {
  try{
    let userModel = new addUserModel(req.body);
    const response = await userService.addUser(
      req,
      userModel
    );
    res.json(response);
  }catch(error){
    console.log(error)
  }
}

async function Login(req:Request, res:Response) {
    let model = new loginModel(req.body);
    var response = await userService.login(model);
    res.json(response);
}
  
async function GetUser(req:Request, res:Response){
  let model = new getUsersModel(req.body)
  const response = await userService.getUser(model);
  res.send(response);

}
export{
    GetUsers,
    AddUser,
    Login, 
    GetUser
}