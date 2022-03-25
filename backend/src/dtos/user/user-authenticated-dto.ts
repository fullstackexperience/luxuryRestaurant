import { RoleDto } from "../role/role-dto";

export class UserAuthenticatedDto{
    Id: string = '';
    DisplayName: string = '';
    FirstName: string = '';
    LastName: string = '';
    Email: string = '';
    Roles: Array<RoleDto> = [];
}