import { AppDataSource } from "../../data-source";
import * as entities from "../Entity/Student";
import dotenv from "dotenv";
import { addStudentModel, getAllStudentsModel, getStudentModel, removeStudentModel, updateStudentModel } from "../Model/StudentModel";
import { Request, Response } from "express";
dotenv.config();
const repository = AppDataSource.getRepository(entities.Student)

const getAllStudents = async () =>{
    const student = await repository.find();
    return student;
   
}

const getStudentById = async (model:getStudentModel) =>{
    const student = await repository.findOneBy({id:model.id});
    return student;
   
}

const addStudent = async (req:Request, model:addStudentModel) => {
    try{
        const student =  new entities.Student();
        if(student){
        student.name = model.name? model.name:student.name;
        student.age = model.age? model.age:student.age;
        student.email = model.email? model.email:student.email;
        student.address = model.address? model.address:student.address;
        student.mobile = model.mobile? model.mobile:student.mobile;
        await repository.save(student);
        return student;}
        
}catch(error){
    console.log(error)
}
}


const updateStudent = async (req:Request, model:updateStudentModel) =>{
    try{
        const student = await repository.findOneBy({id:model.id});
        if(student){
        student.name = model.name? model.name:student.name;
        student.age = model.age? model.age:student.age;
        student.email = model.email? model.email:student.email;
        student.address = model.address? model.address:student.address;
        student.mobile = model.mobile? model.mobile:student.mobile;
    
        await repository.save(student);
        return{
        status:200,
        message:"Update SuccessFul"
        };
        }
        else
        {
            return{
            status:201,
            message:"No Data"
        }
    }}
    catch(error){
        console.log(error)
}
}

const removeStudent =async (req:Request, model: removeStudentModel) => {
    try{
        const student = await repository.findOneBy({id:model.id});
        if(student){
            await repository.delete(req.params.id)
            return{
                status:200,
                message: "Student removed Successfully"
            }
        }
    }    
 catch(error){
    console.log(error)
}
}


export {getAllStudents, addStudent, updateStudent, removeStudent, getStudentById}