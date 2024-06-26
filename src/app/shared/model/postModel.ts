export interface Post {
    _id?:string
    title:string;
    category:string;
    content: string;
    avatar:string
    view:number
    createdAt?:Date
}