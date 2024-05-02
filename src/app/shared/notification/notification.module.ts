import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./notification.component";
import {SharedModule} from "../shared.module";
import {CustomSnackBarComponent} from "./components/custom-snack-bar/custom-snack-bar.component";
import {NotificationIconComponent} from "./components/notification-icon/notification-icon.component";
import {NotificationCenterComponent} from "./components/notification-center/notification-center.component";

@NgModule({
    declarations: [
        NotificationComponent,
        CustomSnackBarComponent,
        NotificationIconComponent,
        NotificationCenterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        NotificationComponent,
        NotificationIconComponent,
        NotificationCenterComponent
    ]
})
export class NotificationModule {
}

