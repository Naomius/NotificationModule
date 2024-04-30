import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterComponent } from './notification-center.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { of } from 'rxjs';

describe('NotificationCenterComponent', () => {
    let component: NotificationCenterComponent;
    let fixture: ComponentFixture<NotificationCenterComponent>;
    let notificationServiceMock: any;

    beforeEach(async () => {
        notificationServiceMock = jasmine.createSpyObj('NotificationService', [
            'removeNotification',
            'removeAllNotifications',
        ]);
        notificationServiceMock.MessagesArray = of([{ messageText: 'Test Message 1' }, { messageText: 'Test Message 2' }]);

        await TestBed.configureTestingModule({
            declarations: [NotificationCenterComponent],
            providers: [
                { provide: NotificationService, useValue: notificationServiceMock },
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize notifications stream on init', () => {
        component.ngOnInit();
        component.notifications$.subscribe((notifications) => {
            expect(notifications.length).toBe(2);
            expect(notifications[0].messageText).toBeDefined();
        });
    });

    it('should call removeNotification on method call with index', () => {
        const indexToRemove = 0;
        component.removeNotification$.next(indexToRemove);
        expect(notificationServiceMock.removeNotification).toHaveBeenCalledWith(String(indexToRemove));
    });

    it('should call removeAllNotifications on method call', () => {
        component.removeAllNotifications$.next();
        expect(notificationServiceMock.removeAllNotifications).toHaveBeenCalled();
    });
});
