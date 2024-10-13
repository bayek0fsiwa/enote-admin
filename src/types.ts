export interface Author {
    _id: string;
    name: string;
}


export interface Note {
    _id: string;
    title: string;
    description: string;
    genre: string;
    author: Author;
    coverImage: string;
    file: string;
    createAt: string;
    updatedAt: string;
}
