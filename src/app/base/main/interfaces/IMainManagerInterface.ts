import {Message} from "./message";

export interface IMainManagerInterface {
    sendMessageToServer(message: Message): void;
}
