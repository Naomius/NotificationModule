import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {catchError, EMPTY, Observable, share, shareReplay, switchMap, tap, timer} from "rxjs";
import {webSocket} from "rxjs/webSocket";
import {Message} from "../../../base/main/interfaces/message";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    private webSocket$!: WebSocketSubject<Message> | null;
    private readonly notification$!: Observable<Message>;

    get Notification(): Observable<Message> {
        return this.notification$;
    }

    constructor() {
        this.notification$ = this.connect('wss://echo.websocket.org').pipe(
            shareReplay({bufferSize: 1, refCount: true})
        )
    }

    private connect(url: string): WebSocketSubject<Message> {
        if (this.webSocket$) {
            this.close();
        }

        this.webSocket$ = webSocket<Message>({
            url: url,
            deserializer: msg => {
                try {
                    return JSON.parse(msg.data);
                } catch {
                    if (typeof msg.data === 'string' && msg.data.startsWith('Request served by')) {
                        return null;
                    }
                    console.error('Data received from server is not valid JSON and not a recognized status message:', msg.data);
                    return null;
                }
            },
        });

        this.webSocket$.pipe(
            catchError((error: Event) => {
                console.error('WebSocket connection error: ', error);
                return timer(5000).pipe(
                    tap(() => console.log('Attempting to reconnect...')),
                    switchMap(() => {
                        this.reconnect(url);
                        return EMPTY;
                    })
                );
            }));

        return this.webSocket$
    }

    sendMessage(message: Message): void {
        if (this.webSocket$) {
            this.webSocket$.next(message);
        }
    }

    close(): void {
        if (this.webSocket$) {
            this.webSocket$.complete();
        }
    }

    reconnect(url: string): void {
        if (this.webSocket$) {
            this.close();
            this.webSocket$ = null;
        }

        timer(1000).pipe(
            tap(() => {
                this.webSocket$ = this.connect(url);
            }),
            share(),
            shareReplay({refCount: true, bufferSize: 1})
        );
    }
}
