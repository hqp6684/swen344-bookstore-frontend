
export class Book {
    $key?: string;
    isbn: string;
    title: string;
    // published_by: number;
    price: number;
    available: boolean;
    count: number;
    thumbnail_url: string;
    authors: string[];
    reviews: Review[];
    courses: string[];
    constructor() {
        // this.key$ = '';
        this.isbn = '';
        this.title = '';
        this.price = 0;
        this.count = 0;
        this.thumbnail_url = '';
        this.available = false;
        this.authors = new Array();
        this.reviews = new Array();
        this.courses = new Array();
    }

}

export class Author {
    name: string;
}

export class Review {
    email: string;
    time: string;
    content: string;
    rate: number;
    constructor(content: string, email: string, rate: number) {
        this.content = content;
        this.email = email;
        this.time = new Date().toDateString();
    }
}


export class Course {
    department: string;
    id: number;
    name: string;
}


