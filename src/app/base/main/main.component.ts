import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {filter, map, Subject, withLatestFrom} from "rxjs";
import {MainFacadeManagerService} from "./services/main-facade/main-facade-manager.service";
import {MainManagerServiceToken} from "./tokens/MainManagerServiceToken";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    providers: [
        MainFacadeManagerService,
        {
            provide: MainManagerServiceToken,
            useExisting: MainFacadeManagerService
        }
    ]
})
export class MainComponent implements OnInit, OnDestroy {

    messageForm = this.formBuilder.group({
        messageText: ['', Validators.required]
    });

    sendMessageBtnClick$: Subject<void> = new Subject<void>();
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(@Inject(MainManagerServiceToken) private mainFacadeManager: MainFacadeManagerService,
                private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initializedSideEffects();
    }



    initializedSideEffects(): void {
        this.sendMessageBtnClick$.pipe(
            filter(_ => this.messageForm.valid),
            withLatestFrom(this.messageForm.valueChanges),
            map(([_,value]) => value as { messageText: string }),
        ).subscribe(message => {
            this.mainFacadeManager.sendMessageToServer(message)
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}

