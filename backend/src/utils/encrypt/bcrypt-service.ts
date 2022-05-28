import bcrypt from 'bcrypt';

export class BcryptService{
    private static _saltRounds: number = 10;
    
    public static async hashPassword(plaintextPassword: string, passwordSecret: string): Promise<string>{
        const password = plaintextPassword + passwordSecret;   

       return await new Promise((resolve, reject) =>{
            bcrypt.genSalt(this._saltRounds, (err, salt) =>{
                if(err)
                    reject(err);
    
                bcrypt.hash(password, salt, (err, hash)=>{
                    if(err)
                        reject(err);
                    
                    resolve(hash);
                });
            });
        });
    }

    public static async passwordCompare(plaintextPassword:string, hash: string, passwordSecret: string) : Promise<boolean>{
        const password = plaintextPassword + passwordSecret;

        return await new Promise((resolve, reject) =>{
            bcrypt.compare(password, hash, (err, result) => {
                if(err)
                    reject(err);
                
                resolve(result);
            });
        })        
    }
}