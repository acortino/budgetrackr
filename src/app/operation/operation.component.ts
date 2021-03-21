import {Component, OnInit}    from "@angular/core";
import {ActivatedRoute}       from "@angular/router";
import {RouterExtensions}     from "nativescript-angular";
import {Feedback}             from "nativescript-feedback";
import {getNumber, setNumber} from "@nativescript/core/application-settings";
import {OperationService}     from "~/app/operation/operation.service";


@Component({
               selector   : "ns-operation",
               moduleId   : module.id,
               templateUrl: "./operation.component.html",
           })
export class OperationComponent implements OnInit {
    private feedback: Feedback;

    constructor(private operationService: OperationService,
                private route: ActivatedRoute,
                private routerExtensions: RouterExtensions) {
        this.feedback = new Feedback();
        this.route.params.subscribe(params => {
            if (params["operation"] === "add") {
                this._toAdd = true;
            } else {
                this._toAdd = false;
            }
        });
    }

    private _value: number;

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    private _toAdd: boolean;

    public get toAdd(): boolean {
        return this._toAdd;
    }

    public set toAdd(value: boolean) {
        this._toAdd = value;
    }

    ngOnInit(): void {
    }

    setValue() {
        if (!isNaN(Number(this._value))) {
            if (this._toAdd) {
                setNumber("currentExpense", Math.ceil(getNumber("currentExpense") - Number(this._value)));
            } else {
                setNumber("currentExpense", Math.ceil(getNumber("currentExpense") + Number(this._value)));
            }
            this.back();
        } else {
            this.feedback.warning({
                                      message: "This is not a correct value, are you drunk?",
                                  });
        }
    }

    back() {
        this.routerExtensions.navigate(["/home"], {clearHistory: true});
    }

}
