class getAllStudentsModel {
    public id:string;
    public name:string;
    public age:string;
    public email:string;
    public address:string;
    public mobile:string;

    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.email = data.email;
        this.address = data.address;
        this.mobile = data.mobile;
    }
}

class addStudentModel {
    
    public name:string;
    public age:string;
    public email:string;
    public address:string;
    public mobile:string;

    constructor(data:any){
        
        this.name = data.name;
        this.age = data.age;
        this.email = data.email;
        this.address = data.address;
        this.mobile = data.mobile;
    }
}

class updateStudentModel {

    public id:string;
    public name:string;
    public age:string;
    public email:string;
    public address:string;
    public mobile:string;

    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.email = data.email;
        this.address = data.address;
        this.mobile = data.mobile;
    }
}

class removeStudentModel {
    public id:string;
   
    constructor(data:any){
        this.id = data.id;    
    }
}

class getStudentModel {
    public id:string;
   
    constructor(data:any){
        this.id = data.id;    
    }
}


export {
    getAllStudentsModel,
    addStudentModel,
    updateStudentModel,
    removeStudentModel, getStudentModel
}