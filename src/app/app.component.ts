import {Component}        from "@angular/core";
import {RouterExtensions} from "@nativescript/angular";
import {getNumber}        from "@nativescript/core/application-settings";

@Component({
               selector   : "ns-app",
               templateUrl: "./app.component.html",
           })
export class AppComponent {
    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit() {
        if (!getNumber("fixedAmount") || !getNumber("income")) {
            this.routerExtensions.navigate(["/setValue"]);
        }
    }
}
