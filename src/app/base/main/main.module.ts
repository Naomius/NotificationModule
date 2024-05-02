import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {SharedModule} from "../../shared/shared.module";
import {HeaderModule} from "../header/header.module";
import {FormsModule} from "@angular/forms";
import {NotificationModule} from "../../shared/notification/notification.module";


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        FormsModule,
        NotificationModule,
    ],
    exports: [HeaderModule]
})
export class MainModule {
}

