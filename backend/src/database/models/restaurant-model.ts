import { v4 as uuidv4 } from 'uuid';

export class RestaurantModel{
    Id: string = '';
    UserId: string = '';
    SocialReason: string = '';
    FantasyName: string = '';
    Cnpj: string = '';
    Address1: string = '';
    Address2: string = '';
    Address3: string = '';
    AddressNumber: string = '';
    City: string = '';
    StateId: number = 0;

    public generateId(){
        if(!this.Id)
            this.Id = uuidv4();
    }

    public validateRequiredProperty(): boolean{
        if(!this.UserId || !this.SocialReason || !this.FantasyName || !this.Cnpj || 
            !this.Address1 || !this.Address2 || !this.Address3 || !this.AddressNumber || !this.City || !this.StateId)
            return false;

        return true
    }
}