import {NgModule}                 from "@angular/core";
import {Routes}                   from "@angular/router";
import {NativeScriptRouterModule} from "@nativescript/angular";

import {HomeComponent}      from "~/app/home/home.component";
import {OperationComponent} from "~/app/operation/operation.component";
import {SettingsComponent}  from "~/app/settings/settings.component";

const routes: Routes = [
    {path         : "",
        redirectTo: "/home",
        pathMatch : "full",
    },
    {path        : "home",
        component: HomeComponent,
    },
    {path        : "settings",
        component: SettingsComponent,
    },
    {path        : "operation/:operation",
        component: OperationComponent,
    },
];

@NgModule({
              imports: [NativeScriptRouterModule.forRoot(routes)],
              exports: [NativeScriptRouterModule],
          })
export class AppRoutingModule {


}
