class getUsersModel {
    public id:string;
    public userName:string;
    public email:string;
    public password:string;

    constructor(data:any){
        this.id = data.id;
        this.userName = data.userName;
        this.email = data.email;
        this.password = data.password;
    }
}

class addUserModel {
    
    public userName:string;
    public email:string;
    public password:string;

    constructor(data:any){
        
        this.userName = data.userName;
        this.email = data.email;
        this.password = data.password;
       
    }
}

class loginModel{
    public id : string;
    public email:string;
    public password:string;

    constructor(data:any){
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;

}
}

export {
    getUsersModel,
    addUserModel,
    loginModel
}