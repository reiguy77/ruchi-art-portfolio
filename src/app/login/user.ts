export class User{

    _id?:string;
    firstName?:string;
    lastName?:string;
    email: string;
    phoneNumber?: string;
    birthDate?: Date;
    address?: string;
    apiKey?: string;
    userGroupIds?: [String];
    userId?: string;


    constructor(
        email: string,
      _id?: string,
  ) { 
      this._id = _id;
      this.email = email;
  }
  

}