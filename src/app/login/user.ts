export class User{

    _id?:string;
    firstName?:string;
    lastName?:string;
    email: string;
    phoneNumber?: string;
    birthDate?: Date;
    address?: String;
    apiKey?: String;
    userGroupIds?: [String];
    userId?: String;


    constructor(
        email: string,
      _id?: string,
  ) { 
      this._id = _id;
      this.email = email;
  }
  

}