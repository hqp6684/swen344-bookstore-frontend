import { Book } from './book';
export class Order {
    $key?: string;
    email = '';
    time = '';
    books: Book[] = [];
    total = 0;
    ship_to = '';
    status: OrderStatus = 'Pending';
    discount = 0;
    subtotal = 0;
    discount_code = '';
    shipping = 0;
    constructor() {

    }
};

export type OrderStatus = 'Pending' | 'Completed' | 'Canceled';