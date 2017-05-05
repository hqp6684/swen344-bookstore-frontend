export class Order {
    time: string;
    books: { isbn: number, quantity: number }[];
    total: number;
};

