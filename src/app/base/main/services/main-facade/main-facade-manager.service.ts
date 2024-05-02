import {inject, Injectable} from '@angular/core';
import {IMainManagerInterface} from "../../interfaces/IMainManagerInterface";
import {Message} from "../../interfaces/message";
import {Store} from "@ngrx/store";
import {connectWebSocket, sendMessage} from "../../../../store/websocket.actions";

@Injectable()
export class MainFacadeManagerService implements IMainManagerInterface{

    private readonly store  = inject(Store)

    constructor() {
        this.store.dispatch(connectWebSocket({ url: 'wss://echo.websocket.org' }));
    }

    sendMessageToServer(message: Message): void {
        this.store.dispatch(sendMessage({message}))
    }


}
