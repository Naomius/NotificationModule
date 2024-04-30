import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationIconComponent } from './notification-icon.component';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {NotificationCenterComponent} from "../notification-center/notification-center.component";

describe('NotificationIconComponent', () => {
    let component: NotificationIconComponent;
    let fixture: ComponentFixture<NotificationIconComponent>;
    let notificationServiceMock: any;
    let matDialogMock: any;

    beforeEach(async () => {
        notificationServiceMock = jasmine.createSpyObj('NotificationService', ['NotificationCount']);
        notificationServiceMock.NotificationCount = of('3');

        matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            declarations: [ NotificationIconComponent ],
            providers: [
                { provide: NotificationService, useValue: notificationServiceMock },
                { provide: MatDialog, useValue: matDialogMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get notification count', (done) => {
        component.notification$.subscribe(value => {
            expect(value).toBe('3');
            done();
        });
    });

    it('should call open NotificationCenter on icon click', () => {
        let expectedDialogData = notificationServiceMock.MessagesArray;

        component.openNotificationCenter();

        expect(matDialogMock.open).toHaveBeenCalledWith(
            NotificationCenterComponent,
            {
                width: '650px',
                data: expectedDialogData
            }
        );
    });
});
