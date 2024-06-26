export interface User {
    id: string;
    name: string;
    email: string;
    emailverified?: Date | null;
    password: string;
    role: string;
    image: string | null;
}