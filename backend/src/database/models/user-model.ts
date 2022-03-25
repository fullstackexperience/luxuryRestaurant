import { v4 as uuidv4 } from 'uuid';
import { BcryptService } from '../../utils/encrypt/bcrypt-service';

export class UserModel{
    Id: string = '';
    FirstName: string = '';
    LastName: string = '';
    DisplayName: string = '';
    Email: string = '';
    Password: string = '';

    public generateId(){
        if(!this.Id)
            this.Id = uuidv4();
    }

    public async hashPassword(passwordSecret: string){
        this.Password = await BcryptService.hashPassword(this.Password, passwordSecret);
    }

    public async checkPassWord(passwordFromRequest: string, passwordSecret: string){
        return await BcryptService.passwordCompare(passwordFromRequest, this.Password, passwordSecret);
    }
}