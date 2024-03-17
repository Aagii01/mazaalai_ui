export interface Order {
    id?: number;
    trackCode?: string;
    status?: string;
    description?: string;
    createdAt?: Date; // Assuming you want to work with Date objects in TypeScript
    updatedAt?: Date; // Same assumption as above
    userId?: number;
}
