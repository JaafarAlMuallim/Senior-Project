export type Message = {
    id: string;
    text?: string;
    time: string;
    fromUser: boolean;
    file?: any;
    audio?: any;
    fileType?: string;
};
