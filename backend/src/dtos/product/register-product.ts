export class RegisterProductDto{
    Id: string = '';
    Name: string = '';
    RestaurantId: string = '';
    BrandId: number = 0;
    CateroryId: number = 0;
    ExpirationDate: Date = new Date();
    Price: number = 0.0;
    Amount: number = 0;
}