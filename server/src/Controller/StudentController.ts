import { Request, Response } from "express";
import * as studentService from "../Services/StudentService"
import { addStudentModel, updateStudentModel, removeStudentModel, getStudentModel} from "../Model/StudentModel";

async function GetAllStudents(req: Request, res: Response) {
    
    const response = await studentService.getAllStudents();
    res.send(response);
    }

async function GetStudent(req:Request, res:Response) {
  let model = new getStudentModel(req.body);
  const response = await studentService.getStudentById(model);
    res.send(response);
}


async function AddStudent(req: Request, res: Response) {
  try{
    let studentModel = new addStudentModel(req.body);
    const response = await studentService.addStudent(
      req,
      studentModel
    );
    res.json(response);
  }catch(error){
    console.log(error)
  }
}

  async function UpdateStudent(req: Request, res: Response) {
    let userModel = new updateStudentModel(req.body);
    const response = await studentService.updateStudent(
      req,
      userModel
    );
    res.json(response);
  }

  async function RemoveStudent(req: Request, res: Response) {
    let model = new removeStudentModel(req.params);
    const response = await studentService.removeStudent(req, model);
    res.json(response);
  }

  export{
    GetAllStudents,
    AddStudent,
    UpdateStudent,
    RemoveStudent,
    GetStudent
  }