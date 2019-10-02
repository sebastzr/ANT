export interface Roles {
    user?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}