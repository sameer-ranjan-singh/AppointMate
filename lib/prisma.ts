import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()
export default db


/*

// sameeer : Why this is not working (some async await issue, db functions are being called before connection )
const prismaClientSingleton = () => {
    return new PrismaClient()
}
declare const globalThis :{
    prismaGlobal : ReturnType<typeof prismaClientSingleton>
} & typeof global

const db = globalThis.prismaGlobal || prismaClientSingleton
console.log("db :",db)
if(process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = db
}

export default db

*/