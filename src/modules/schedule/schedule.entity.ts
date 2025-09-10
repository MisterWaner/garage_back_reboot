export enum OpeningStatus {
    OPEN = 'open',
    CLOSED = 'closed',
}

export class Schedule {
    private readonly id: number;
    private day: string;
    private openingTime: string;
    private closingTime: string;
    private status: OpeningStatus;
    private addedBy: string;

    constructor(
        id: number,
        day: string,
        openingTime: string,
        closingTime: string,
        status: OpeningStatus,
        addedBy: string
    ) {
        this.id = id;
        this.day = day;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.status = status;
        this.addedBy = addedBy;
    }

    getId(): number {
        return this.id;
    }

    getDay(): string {
        return this.day;
    }

    getOpeningTime(): string {
        return this.openingTime;
    }

    getClosingTime(): string {
        return this.closingTime;
    }

    getStatus(): OpeningStatus {
        return this.status;
    }

    getAddedBy(): string {
        return this.addedBy;
    }
}
