import {Component, OnDestroy, OnInit} from '@angular/core';
import {pairwise, Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackBarComponent} from "./components/custom-snack-bar/custom-snack-bar.component";
import {select, Store} from "@ngrx/store";
import {selectMessages} from "../../store/websocket.selectors";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit, OnDestroy{

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar,
                public store: Store) {
    }

    ngOnInit(): void {
        this.initializedSideEffects();
    }

    openSnackBar(message: string) {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
            data: { messageText: message },
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

    initializedSideEffects(): void {
        this.store.pipe(
            select(selectMessages),
            pairwise(),
            takeUntil(this.destroy$)
        ).subscribe(([prevMessages, currMessages]) => {
            if (currMessages.length > prevMessages.length) {
                const lastMessage = currMessages[currMessages.length - 1].messageText;
                this.openSnackBar(lastMessage);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
