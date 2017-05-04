
export class Book {
    key$: string;
    isbn: number;
    title: string;
    // published_by: number;
    price: number;
    available: boolean;
    count: number;
    authors: Author[];
    reviews: Review[];
    courses: Course[];

}

export class Author {
    name: string;
}

export class Review {
    email: string;
    time: Date;
    content: string;
}


export class Course {
    department: string;
    id: number;
    name: string;
}


