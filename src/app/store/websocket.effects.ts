import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { webSocket } from 'rxjs/webSocket';
import { tap } from 'rxjs/operators';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import { Store} from "@ngrx/store";
import {connectWebSocket, messageReceived, sendMessage} from "./websocket.actions";
import {Message} from "../base/main/interfaces/message";

@Injectable()
export class WebSocketEffects {
    private readonly store = inject(Store);
    private webSocket$: WebSocketSubject<Message> | undefined;

    constructor(private actions$: Actions) {}

    connectWebSocket$ = createEffect(() => this.actions$.pipe(
        ofType(connectWebSocket),
        tap(action => {
            const wsSubject = webSocket({
                url: action.url,
                deserializer: msg => {
                    if (typeof msg.data === 'undefined') {
                        console.error('Undefined data received from server');
                        return null;
                    }
                    try {
                        return JSON.parse(msg.data);
                    } catch (e) {
                        if (typeof msg.data === 'string' && msg.data.startsWith('Request served by')) {
                            return null;
                        }
                        console.error('Data received from server is not valid JSON:', msg.data);
                        return null;
                    }
                }
            });

            wsSubject.subscribe({
                next: message => {
                    this.store.dispatch(messageReceived({ message }));
                },
                error: err => {
                    console.error('WebSocket Error:', err);
                },
                complete: () => console.log('WebSocket connection closed')
        });
            this.webSocket$ = wsSubject
        })
    ), { dispatch: false });


    sendMessage$ = createEffect(() => this.actions$.pipe(
        ofType(sendMessage),
        tap(action => {
            if (this.webSocket$ && !this.webSocket$.closed) {
                this.webSocket$?.next(action.message);
            } else {
                console.error('WebSocket is not connected.');
            }
        })
    ), { dispatch: false });
}
