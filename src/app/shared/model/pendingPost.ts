export interface PendingPost {
    _id?:string,
    kindService:String,
    name: String , 
    location: String ,
    number:  String ,
    email:String,
    img:Array<string>,
    introduce:String,
    view?: number,
    like?: number, 
    accept?:boolean,
    createdAt?: Date,
}