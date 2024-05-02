import {Component, inject, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {combineLatest, map, Observable, of, startWith, Subject, tap} from "rxjs";
import {SnakeBar} from "./interfaces/snakeBarData";
import {select, Store} from "@ngrx/store";
import {selectLastMessage} from "../../../../store/websocket.selectors";

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss'
})
export class CustomSnackBarComponent implements OnInit{

    private readonly store = inject(Store);

    snakeBarData$!: Observable<SnakeBar>;
    messageText$!: Observable<string>;
    titleText$!: Observable<string>;
    currentDate$!: Observable<Date>;

    closeSnakeBarBtnClick$: Subject<void> = new Subject<void>();
    constructor(public snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public message: string) {

    }
    ngOnInit(): void {
        this.currentDate$ = of(null).pipe(
            startWith(0),
            map(() => new Date())
        );

        this.titleText$ = of(null).pipe(
            map(() => 'Уведомление')
        );

        this.messageText$ = this.store.pipe(
            select(selectLastMessage),
            map(message => message ? message.messageText : ''),
        )

        this.snakeBarData$ = combineLatest([
            this.messageText$,
            this.titleText$,
            this.currentDate$
        ]).pipe(
            map(([message, title, date]): SnakeBar => ({message, title, date}))
        )

        this.initializedSideEffects();

    }

    initializedSideEffects(): void {
        this.closeSnakeBarBtnClick$.subscribe(() => {
            this.snackBarRef.dismiss()
        })
    }

}
