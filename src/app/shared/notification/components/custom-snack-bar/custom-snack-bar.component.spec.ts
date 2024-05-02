import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { CustomSnackBarComponent } from './custom-snack-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {BehaviorSubject, firstValueFrom, of} from "rxjs";
import {Store} from "@ngrx/store";
import {selectLastMessage} from "../../../../store/websocket.selectors";

const lastMessage$ = new BehaviorSubject({ messageText: 'Test Message' });
describe('CustomSnackBarComponent', () => {
    let component: CustomSnackBarComponent;
    let fixture: ComponentFixture<CustomSnackBarComponent>;
    let storeMock: any;
    let snackBarRefMock: any;

    beforeEach(async () => {
        snackBarRefMock = {
            dismiss: jasmine.createSpy('dismiss')
        };

        storeMock = {
            select: jasmine.createSpy('select').and.callFake((selector) => {
                switch (selector) {
                    case selectLastMessage:
                        return lastMessage$.asObservable();
                    default:
                        return of(null);
                }
            }),
            dispatch: jasmine.createSpy('dispatch'),
            pipe: jasmine.createSpy('pipe').and.callFake((any) => lastMessage$.asObservable()),
        };

        await TestBed.configureTestingModule({
            declarations: [ CustomSnackBarComponent ],
            providers: [
                { provide: MatSnackBarRef, useValue: snackBarRefMock },
                { provide: MAT_SNACK_BAR_DATA, useValue: 'Test Message' },
                { provide: Store, useValue: storeMock },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();

        fixture = TestBed.createComponent(CustomSnackBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set currentDate$ to the current date', async () => {
        const value = await firstValueFrom(component.currentDate$);
        expect(value).toBeInstanceOf(Date);
    });

    it('should set titleText$ to "Уведомление"', (done) => {
        component.titleText$.subscribe(value => {
            expect(value).toEqual('Уведомление');
            done();
        });
    });

    it('should dismiss the snackbar when close button click event is emitted', () => {
        component.closeSnakeBarBtnClick$.next();
        expect(snackBarRefMock.dismiss).toHaveBeenCalledTimes(1);
    });
});
