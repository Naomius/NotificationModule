import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { WebSocketService } from '../../services/webSocket/web-socket.service';
import { of } from 'rxjs';

describe('NotificationService', () => {
    let service: NotificationService;
    let webSocketServiceMock: any;

    beforeEach(() => {
        webSocketServiceMock = {
            Notification: of({ messageText: 'Test Message' })
        };

        TestBed.configureTestingModule({
            providers: [
                NotificationService,
                { provide: WebSocketService, useValue: webSocketServiceMock }
            ]
        });
        service = TestBed.inject(NotificationService);
        service.removeAllNotifications();
    });

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should add message when notification received from WebSocketService', (done: DoneFn) => {
        service.MessagesArray.subscribe((message) => {
            expect(message).toEqual([{ messageText: 'Test Message' }]);
            done();
        })
    })

    it('should increase notifications count when message added', (done: DoneFn) => {
        service.addMessage('Test Message');
        service.NotificationCount.subscribe((count) => {
            if(count === '1') {
                expect(count).toBe('1');
                done();
            }
        });
    });
});
