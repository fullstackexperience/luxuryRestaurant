import { v4 as uuidv4 } from 'uuid';

export class ProductModel{
    Id: string = '';
    RestaurantId: string = '';
    Name: string = '';
    BrandId: number = 0;
    CategoryId: number = 0;
    ExpirationDate: Date = new Date();
    Price: number = 0.0;
    Amount: number = 0;

    public generateId(){
        if(!this.Id)
            this.Id = uuidv4();
    }
}