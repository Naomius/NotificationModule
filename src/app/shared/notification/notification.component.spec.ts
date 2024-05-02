import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';
import { Store, StoreModule } from '@ngrx/store';
import {BehaviorSubject, from, of} from 'rxjs';
import {CustomSnackBarComponent} from "./components/custom-snack-bar/custom-snack-bar.component";

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationComponent, CustomSnackBarComponent],
            providers: [
                {
                    provide: MatSnackBar,
                    useValue: {
                        openFromComponent: jasmine.createSpy('openFromComponent')
                    }
                },
            ],
            imports: [
                StoreModule.forRoot({})
            ]
        }).compileComponents();
        snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
        snackBarSpy.openFromComponent.and.callThrough(); // Ensure the spy is active
        fixture = TestBed.createComponent(NotificationComponent);
        component = TestBed.createComponent(NotificationComponent).componentInstance;
    });

    afterEach(() => {
        component.ngOnDestroy();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe from the observable on destroy', () => {
        spyOn(component.destroy$, 'next');

        component.ngOnDestroy();

        expect(component.destroy$.next).toHaveBeenCalledWith(true);
    });

    it('should call openFromComponent with correct parameters when openSnackBar is called', () => {
        const testMessage = 'Test Message';
        component.openSnackBar(testMessage);

        expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(CustomSnackBarComponent, {
            data: { messageText: testMessage },
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    });
});
