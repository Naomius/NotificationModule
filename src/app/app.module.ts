import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {BaseComponent} from "./base/base.component";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {BaseModule} from "./base/base.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {WebSocketEffects} from "./store/websocket.effects";
import {websocketReducer} from "./store/websocket.reducer";


@NgModule({
    declarations: [
        AppComponent,
        BaseComponent
    ],
    imports: [
        BrowserModule,
        BaseModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({webSocket: websocketReducer}),
        EffectsModule.forRoot([WebSocketEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})
export class AppModule {
}

