import { RoleDto } from "../role/role-dto";
import { UserDto } from "./user-dto";

export interface UserRegisterDto{
    User: UserDto
    Roles: Array<RoleDto>
}