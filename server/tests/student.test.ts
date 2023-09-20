import request  from 'supertest'
import app from '../server';
import dotenv from 'dotenv'
import { AppDataSource } from '../data-source';
import { DataSource } from 'typeorm';
dotenv.config();
let connection : DataSource;

beforeEach(async () => {

 await AppDataSource.initialize()
  .then((res) => ( connection = res)).then(() => {
    console.log("Database connection established successfully!");
  })
  
});

afterEach( async()=>{

await AppDataSource.destroy()
  .then(()=>
  console.log("Connection Closed"))
})

          //   Unit Test for Students 

              // GetAllStudents

describe("GET /students", () => {
    it("should return all students", async () => {
      const res = await request(app).get("/students");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });


          // Add a student

  describe("POST /students", () => {
    it("should add a student", async () => {
      const res = await request(app).post("/students").send({
       id:1,name:'ram',age:'25',email:'ram@gmail.com',address:'Pune',mobile:'9874789548'
       });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('ram');
    });
  });

     // Update a student 

  describe("PUT /students/:id", () => {
    it("should update a student", async () => {
      const res = await request(app)
        .put("/students/20")
        .send({
          name:'Salman',
          age:'20',email:'ram@gmail.com',
          address:'Pune',
          mobile:'9874789548'
        });
      expect(res.statusCode).toBe(200);

    });
  });

       // Delete a student

  describe("DELETE /students/:id", () => {
    it("should delete a student", async () => {
      const res = await request(app).delete(
        "/students/20"
      );
      expect(res.statusCode).toBe(200);
    });
  });

  