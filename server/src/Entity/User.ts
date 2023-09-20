import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from 'bcrypt'

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn({name:"id"})
    id:string

    @Column({type:"varchar", length:30, })
    userName:string

    @Column({type:"varchar"})
    email:string

    @Column({type:"varchar"})
    password:string 

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
    const salt = 10;
    this.password = bcrypt.hashSync(this.password, salt);


}
}