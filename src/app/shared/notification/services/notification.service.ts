import { Injectable } from '@angular/core';
import {
    filter,
    map,
    merge,
    Observable,
    ReplaySubject,
    scan, share, shareReplay,
    Subject,
} from "rxjs";
import {WebSocketService} from "../../services/webSocket/web-socket.service";
import {Message} from "../../../base/main/interfaces/message";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    get NotificationCount(): Observable<string> {
        return this.notificationCount$
    }

    get MessagesArray(): Observable<Message[]> {
        return this.notifications$
    }

    private readonly notifications$: Observable<Message[]>;
    private readonly notificationCount$: Observable<string>;

    private removeNotification$: Subject<string> = new Subject<string>();
    private removeAllNotifications$: Subject<void> = new Subject<void>();
    private addMessage$: ReplaySubject<string> = new ReplaySubject<string>();

    constructor(private webSocketService: WebSocketService) {
        this.notifications$ = merge(
            this.addMessage$.pipe(
                map((message) => {
                    return {action: 'initial', payload: message}
                })
            ),
            this.removeNotification$.pipe(
                map((index: string) => {
                    return {action: 'removeMessageByIndex', payload: index}
                })
            ),
            this.removeAllNotifications$.pipe(
                map(_ => ({action: 'removeAllNotifications', payload: ''}))
            )
        ).pipe(
            scan((messages: Message[], {action, payload}): Message[] => {
                switch (action) {
                    case 'initial':
                        return [...messages, {messageText: payload}]
                    case 'removeMessageByIndex':
                        const index = parseInt(payload, 10)
                        return messages.filter((_,i) => i !== index)
                    case 'removeAllNotifications':
                        return []
                    default:
                        return messages
                }
                }, []),
            share(),
            shareReplay({refCount: true, bufferSize: 1})
        );

        this.webSocketService.Notification.pipe(
            filter(message => message != null)
        ).subscribe((message) => {
            this.addMessage(message.messageText)
        })

        this.notificationCount$ = this.notifications$.pipe(
            map((messages) => {
                const count = messages.length;
                return count > 99 ? '99+' : count === 0 ? '' : String(count);
            })
        );
    }

     addMessage(message: string): void {
        this.addMessage$.next(message);
    }

    removeNotification(index: string): void {
        this.removeNotification$.next(index)
    }

    removeAllNotifications(): void {
        this.removeAllNotifications$.next()
    }
}
