import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import {MatListItem, MatNavList} from "@angular/material/list";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatDialogContent,
        MatNavList,
        MatListItem,
        MatDialogModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatDialogContent,
        MatNavList,
        MatListItem,
        MatDialogModule,
    ]
})
export class SharedModule {
}

