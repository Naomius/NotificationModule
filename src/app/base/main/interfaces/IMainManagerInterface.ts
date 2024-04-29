import {Message} from "./message";

export interface IMainManagerInterface {
    sendMessageToServer(text: Message): void;
}
