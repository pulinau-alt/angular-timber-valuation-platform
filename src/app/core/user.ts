export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    roles?: Roles;
}

export interface Roles {
    admin?: boolean;
    manager?: boolean;
    fieldOfficer?: boolean;
    devOfficer?: boolean;
}
