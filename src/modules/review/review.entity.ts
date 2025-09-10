export enum ReviewStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export class Review {
    private readonly id: number;
    private rating: number;
    private title: string;
    private author: string;
    private comment: string;
    private status: ReviewStatus;

    constructor(
        id: number,
        rating: number,
        title: string,
        author: string,
        comment: string,
        status: ReviewStatus
    ) {
        this.id = id;
        this.rating = rating;
        this.title = title;
        this.author = author;
        this.comment = comment;
        this.status = status;
    }

    getId(): number {
        return this.id;
    }

    getRating(): number {
        return this.rating;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getComment(): string {
        return this.comment;
    }

    getStatus(): string {
        return this.status;
    }
}
