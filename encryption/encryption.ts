import bcrypt from 'bcryptjs';


const SALT_ROUND = 12;

export async function HashPassword(password : string) : Promise<string> {
    return bcrypt.hash(password, SALT_ROUND)
}

export async function ComparePassword(password: string, hash : string) : Promise<boolean>  {
    return bcrypt.compare(password, hash)
}

