import {NgModule, NO_ERRORS_SCHEMA}                  from "@angular/core";
import {NativeScriptFormsModule, NativeScriptModule} from "@nativescript/angular";

import {AppRoutingModule}   from "./app-routing.module";
import {AppComponent}       from "./app.component";
import {OperationComponent} from "~/app/operation/operation.component";
import {HomeComponent}      from "~/app/home/home.component";
import {FormsModule}        from "@angular/forms";
import {SettingsComponent}  from "~/app/settings/settings.component";

@NgModule({
              bootstrap   : [
                  AppComponent,
              ],
              imports     : [
                  NativeScriptModule,
                  AppRoutingModule,
                  FormsModule,
                  NativeScriptFormsModule,
              ],
              declarations: [
                  AppComponent,
                  HomeComponent,
                  OperationComponent,
                  SettingsComponent,
              ],
              providers   : [],
              schemas     : [
                  NO_ERRORS_SCHEMA,
              ],
          })
export class AppModule {
}
