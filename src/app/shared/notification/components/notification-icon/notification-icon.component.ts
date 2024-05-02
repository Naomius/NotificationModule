import {Component, inject, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {NotificationCenterComponent} from "../notification-center/notification-center.component";
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import { selectAllMessages } from '../../../../store/websocket.selectors';


@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrl: './notification-icon.component.scss'
})
export class NotificationIconComponent implements OnInit{

    notification$!: Observable<string>;

    constructor(private dialog: MatDialog,
                private store: Store) {
    }

    openNotificationCenter() {
        this.dialog.open(NotificationCenterComponent, {
            width: '650px',
            data: this.store.select(selectAllMessages)
        });
    }

    ngOnInit(): void {
        this.notification$ = this.store.pipe(
            select(selectAllMessages),
            map((messages) => {
                const count = messages.length;
                return count > 99 ? '99+' : count === 0 ? '' : String(count);
            })
        )
    }
}
