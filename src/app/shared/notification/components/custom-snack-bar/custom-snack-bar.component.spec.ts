import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { CustomSnackBarComponent } from './custom-snack-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomSnackBarComponent', () => {
    let component: CustomSnackBarComponent;
    let fixture: ComponentFixture<CustomSnackBarComponent>;
    let snackBarRefMock: any;

    beforeEach(async () => {
        snackBarRefMock = { dismiss: jasmine.createSpy('dismiss') };

        await TestBed.configureTestingModule({
            declarations: [CustomSnackBarComponent],
            providers: [
                { provide: MatSnackBarRef, useValue: snackBarRefMock },
                { provide: MAT_SNACK_BAR_DATA, useValue: 'Test Message' },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CustomSnackBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should initialize 'messageText$' with provided message`, (done: DoneFn) => {
        component.messageText$.subscribe((message) => {
            expect(message).toEqual('Test Message');
            done();
        });
    });

    it('should dismiss snackBar when close button is clicked', (done: DoneFn) => {
        component.closeSnakeBarBtnClick$.subscribe(() => {
            expect(snackBarRefMock.dismiss).toHaveBeenCalled();
            done();
        });
        component.closeSnakeBarBtnClick$.next();
    });
});
