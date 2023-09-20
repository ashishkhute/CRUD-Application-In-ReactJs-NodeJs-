import request  from 'supertest'
import app from '../server';
import { AppDataSource } from '../data-source';
import dotenv from 'dotenv'
import { DataSource } from 'typeorm';
dotenv.config();
let connection : DataSource

beforeEach(async () => {
 await AppDataSource.initialize()
  .then((res)=>(connection = res )).then(() => {
    console.log("Database connection established successfully!");
  })
});

afterEach( async()=>{
  await AppDataSource.destroy()
  .then(()=>
  console.log("Connection Closed"))
})

  //  Unit Tests For Users

  describe("GET /users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
  
    });
  });

       // Register a user 
       
       describe("POST /users/register", () => {
        it("should add a user", async () => {
          const res = await request(app).post("/users/register").send({
           userName:'RamKrishna',
           email:'Ramkrishna@gmail.com',
           password:'$2y$10$RrpciHLre7UGsXL0HGVz/ezYXQVx.CLOb/BwUGcmTJ7a16uJL4PDe'
           });
          expect(res.statusCode).toBe(200);
        });
      });

     // Login Of User

     describe("POST /users/login", () => {
      it("should Login a user", async () => {
        const res = await request(app).post("/users/login").send({

         email:'Ramkrishna@gmail.com',
         password:'$2y$10$RrpciHLre7UGsXL0HGVz/ezYXQVx.CLOb/BwUGcmTJ7a16uJL4PDe'
         });
        expect(res.statusCode).toBe(200);
        
      });
    });


