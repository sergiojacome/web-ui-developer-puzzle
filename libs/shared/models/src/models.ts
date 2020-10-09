export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
  finishedDate?: string;
  finished?: boolean;
}

export interface ReadingListItem extends Omit<Book, 'id'> {
  bookId: string;
  finished?: boolean;
  finishedDate?: string;
}
