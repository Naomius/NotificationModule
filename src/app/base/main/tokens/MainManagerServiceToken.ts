import {InjectionToken} from "@angular/core";
import {IMainManagerInterface} from "../interfaces/IMainManagerInterface";

export const MainManagerServiceToken = new InjectionToken<IMainManagerInterface>('MainManagerServiceToken');
