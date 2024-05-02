import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from "./header.component";
import {SharedModule} from "../../shared/shared.module";
import {NotificationModule} from "../../shared/notification/notification.module";


@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        SharedModule,
        NotificationModule,
    ],
    exports: [HeaderComponent],
})
export class HeaderModule {
}

