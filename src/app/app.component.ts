import {Component}        from "@angular/core";
import {RouterExtensions}     from "@nativescript/angular";
import {getNumber, getString} from "@nativescript/core/application-settings";

@Component({
               selector   : "ns-app",
               templateUrl: "./app.component.html",
           })
export class AppComponent {
    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit() {
        if (!getString("fixedFees") || !getNumber("income")) {
            this.routerExtensions.navigate(["/settings"]);
        }
    }
}
