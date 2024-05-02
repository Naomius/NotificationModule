import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import {SharedModule} from "../shared/shared.module";
import {HeaderModule} from "./header/header.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        HeaderModule,
        BaseRoutingModule
    ],
    exports: [HeaderModule]
})
export class BaseModule {
}

