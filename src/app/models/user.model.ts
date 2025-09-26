export interface User {
    uid: string;
    email: string;
    displayName?: string;
    role: 'Admin' | 'Member';
    teams: string[];
}
