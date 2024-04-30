import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { WebSocketService } from "../services/webSocket/web-socket.service";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import {CustomSnackBarComponent} from "./components/custom-snack-bar/custom-snack-bar.component";

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let webSocketServiceStub: Partial<WebSocketService>;
    let snackBarSpy: any;

    beforeEach(() => {
        webSocketServiceStub = {
            Notification: of({ messageText: 'Test Message' })
        };

        snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

        TestBed.configureTestingModule({
            declarations: [ NotificationComponent ],
            providers: [
                { provide: MatSnackBar, useValue: snackBarSpy },
                { provide: WebSocketService, useValue: webSocketServiceStub }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open snackbar with correct message', () => {
        component.initializedSideEffects();
        expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
            CustomSnackBarComponent,
            {
                data: 'Test Message',
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            }
        );
    });
});
