import {db} from "../../data/dbcofig";


export function findById(id:number) {
    return db("users").select("id", "username").where({id}).first();
}

export async function add(user:any) {
    const [id] = await db("users").insert(user).returning("id");
    return findById(id);
}

export function find() {
    return db("users").select("id", "username");
}

export function findBy(filter:any) {
    return db("users").select("id", "username", "password").where(filter);

}