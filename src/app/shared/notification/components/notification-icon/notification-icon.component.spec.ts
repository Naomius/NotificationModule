import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationIconComponent } from './notification-icon.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {NotificationCenterComponent} from "../notification-center/notification-center.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('NotificationIconComponent', () => {
    let component: NotificationIconComponent;
    let fixture: ComponentFixture<NotificationIconComponent>;
    let storeMock;
    let matDialogMock: { open: any; };

    beforeEach(async () => {
        storeMock = {
            select: jasmine.createSpy().and.returnValue(of([{id: 1, message: 'Test Message'}])),
            pipe: jasmine.createSpy().and.returnValue(of([{message: 'Test Message'}]))
        };
        matDialogMock = {
            open: jasmine.createSpy('open')
        };

        await TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                MatIconModule,
                StoreModule.forRoot({}),
            ],
            declarations: [
                NotificationIconComponent,
            ],
            providers: [
                { provide: Store, useValue: storeMock },
                { provide: MatDialog, useValue: matDialogMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NotificationIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });



    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set notification$ based on the messages count', (done) => {
        component.notification$.subscribe((notifications) => {
            expect(notifications.length).toBe(1);
            done();
        });
    });

    it('openNotificationCenter should call MatDialog open with the correct arguments', () => {
        component.openNotificationCenter();
        expect(matDialogMock.open).toHaveBeenCalledWith(NotificationCenterComponent, {
            width: '650px',
            data: jasmine.any(Object)
        });
    });
});
