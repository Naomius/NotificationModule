import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Message} from "../../../../base/main/interfaces/message";
import {Store} from "@ngrx/store";
import {selectAllMessages} from "../../../../store/websocket.selectors";
import {clearAllMessages, removeMessageByIndex} from "../../../../store/websocket.actions";


@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrl: './notification-center.component.scss'
})
export class NotificationCenterComponent implements OnInit, OnDestroy{

    private readonly store = inject(Store);

    notifications$!: Observable<Message[]>;

    removeNotification$: Subject<number> = new Subject<number>();
    removeAllNotifications$: Subject<void> = new Subject<void>();
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor() {}

    ngOnInit(): void {
        this.notifications$ = this.store.select(selectAllMessages);

        this.initializedSideEffects();
    }

    initializedSideEffects(): void {
        this.removeNotification$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((index) => {
            this.store.dispatch(removeMessageByIndex({index}))
        })

        this.removeAllNotifications$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(_ => {
            this.store.dispatch(clearAllMessages())
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
