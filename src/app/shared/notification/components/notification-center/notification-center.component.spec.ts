import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterComponent } from './notification-center.component';
import { Store, StoreModule } from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {clearAllMessages, removeMessageByIndex} from "../../../../store/websocket.actions";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatDialogModule} from "@angular/material/dialog";
import {Message} from "../../../../base/main/interfaces/message";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('NotificationCenterComponent', () => {
    let component: NotificationCenterComponent;
    let fixture: ComponentFixture<NotificationCenterComponent>;
    let store: Store;
    let mockMessages: BehaviorSubject<Message[]>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationCenterComponent],
            imports: [
                StoreModule.forRoot({}),
                MatDialogModule,
                BrowserAnimationsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        store = TestBed.inject(Store);

        mockMessages = new BehaviorSubject<Message[]>([{
            messageText: 'Test Message',
        }]);

        spyOn(store, 'dispatch').and.callFake(() => {});
        spyOn(store, 'select').and.returnValue(mockMessages.asObservable());

        fixture = TestBed.createComponent(NotificationCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to notifications$', (done: DoneFn) => {
        component.notifications$.subscribe(notifications => {
            expect(notifications).toEqual(mockMessages.value);
            done();
        });
    });

    it('should dispatch removeMessageByIndex when removeNotification$ emits a value', () => {
        const testIndex = 0;
        component.removeNotification$.next(testIndex);
        expect(store.dispatch).toHaveBeenCalledWith(removeMessageByIndex({ index: testIndex }));
    });

    it('should dispatch clearAllMessages when removeAllNotifications$ emits a value', () => {
        component.removeAllNotifications$.next();
        expect(store.dispatch).toHaveBeenCalledWith(clearAllMessages());
    });

    it('should complete destroy$ Subject when ngOnDestroy is called', () => {
        spyOn(component.destroy$, 'next');

        component.ngOnDestroy();

        expect(component.destroy$.next).toHaveBeenCalledWith(true);
    });

});
