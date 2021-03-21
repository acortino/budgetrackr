import {Component, OnInit} from "@angular/core";

import {RouterExtensions} from "nativescript-angular";
import {setNumber}        from "@nativescript/core/application-settings";
import {Feedback}         from "nativescript-feedback";

@Component({
               selector   : "ns-settings",
               moduleId   : module.id,
               templateUrl: "./settings.component.html",
           })
export class SettingsComponent implements OnInit {
    private feedback: Feedback;

    constructor(private routerExtensions: RouterExtensions) {
    }

    private _step: number = 0;

    public get step(): number {
        return this._step;
    }

    public set step(value: number) {
        this._step = value;
    }

    private _fixed: number = 1025;

    public set fixed(value: number) {
        this._fixed = value;
    }

    private _income: number = 1545;

    public set income(value: number) {
        this._income = value;
    }

    ngOnInit(): void {
        this.feedback = new Feedback();
    }

    setFixedAmount() {
        if (!isNaN(Number(this._fixed))) {
            if (this._fixed) {
                this._step = 1;
            }
        } else {
            this.feedback.warning({
                                      message: "This is not a correct value, are you drunk?",
                                  });
        }
    }

    setIncome() {
        if (!isNaN(Number(this._income))) {
            if (this._income) {
                setNumber("income", Number(this._income));
                setNumber("fixedAmount", Number(this._fixed));
                setNumber("currentExpense", 0);

                this.routerExtensions.navigate(["home"], {clearHistory: true});

            }
        } else {
            this.feedback.warning({
                                      message: "This is not a correct value, are you drunk?",
                                  });
        }
    }

    public cancel() {
        this.routerExtensions.navigate(["home"], {clearHistory: true});
    }

    public previous_step() {
        this._step = 0;
    }
}
