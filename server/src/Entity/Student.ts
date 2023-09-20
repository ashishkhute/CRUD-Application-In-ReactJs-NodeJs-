import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"students"})
export class Student {
    @PrimaryGeneratedColumn({name:"id"})
    id:string

    @Column({type:"varchar", length:30, })
    name:string

    @Column({type:"integer"})
    age:string

    @Column({type:"varchar"})
    email:string

    @Column({type:"varchar"})
    address:string | null

    @Column({type:"varchar"})
    mobile:string | null
}