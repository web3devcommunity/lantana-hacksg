export type Cause = {
    title: string;
    date: Date;
    descriptionShort: string;
}

export type CauseInput = {
    title: string;
    date: string;
    descriptionShort?: string;
}
