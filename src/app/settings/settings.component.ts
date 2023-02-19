import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import {RouterExtensions}                        from "@nativescript/angular";
import {getString, hasKey, setNumber, setString} from "@nativescript/core/application-settings";
import {Feedback}                                from "nativescript-feedback";
import {FixedFee}                                from "~/app/classes/FixedFee.class";
import {ScrollView}                              from "@nativescript/core";
@Component({
               selector   : "ns-settings",
               moduleId   : module.id,
               templateUrl: "./settings.component.html",
           })
export class SettingsComponent implements OnInit, AfterViewInit {
    private feedback: Feedback;
    @ViewChild("scroller") sv: ElementRef;
    public errors: Array<Array<string> | null> = new Array<Array<string> | null>();
    private scrollLayout: ScrollView;

    constructor(private routerExtensions: RouterExtensions) {
    }

    ngAfterViewInit(): void {
        this.scrollLayout = this.sv.nativeElement;
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

    private _fixedAmounts: Array<FixedFee> = new Array<FixedFee>();

    private set fixedAmounts(fees: Array<FixedFee>) {
        this._fixedAmounts = fees;
    }

    public get fixedAmounts(): Array<FixedFee> {
        return this._fixedAmounts;
    }

    ngOnInit(): void {
        this.feedback = new Feedback();
        if (hasKey("fixedFees")) {
            this.fixedAmounts = JSON.parse(getString("fixedFees")).filter( y => {
               return (y._label && y._amount && !isNaN(y._amount) && y._label !== undefined)
            })
                                    .map(x => {
                                            return new FixedFee(x);
                                    });
        } else {
            this.fixedAmounts = new Array<FixedFee>();
            this.fixedAmounts.push(new FixedFee());
        }

        this.errors = new Array<Array<string> | null>(this.fixedAmounts.length).fill(null)
    }

    addFixedAmount() {
        this.fixedAmounts.push(new FixedFee());
        this.scrollLayout.scrollToVerticalOffset(this.scrollLayout.scrollableHeight, false);
    }

    setIncome() {
        if (!isNaN(Number(this._income))) {
            if (this._income) {
                setNumber("income", Number(this._income));
                setNumber("currentExpense", 0);
                setString("fixedFees", JSON.stringify(this.fixedAmounts));

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

    public removeFee(fee: FixedFee) {
        const index: number = this.fixedAmounts.indexOf(fee, 0);
        if (index > -1) {
            this.fixedAmounts.splice(index, 1);
        }

        if(this.fixedAmounts.length <= 0){
            this.fixedAmounts = new Array<FixedFee>();
            this.fixedAmounts.push(new FixedFee());
        }
        this.errors = new Array<Array<string> | null>(this.fixedAmounts.length).fill(null)
    }

    public setFixedAmount() {
        if(this.checkFixedAmounts()) {
            setString("fixedFees", JSON.stringify(this.fixedAmounts));
                this._step = 1;
        } else {
            this.feedback.error({
                message : "It seems like there are issues with your fees."
                                })
        }
    }

    private checkFixedAmounts() {
        this.errors = new Array<Array<string> | null>(this.fixedAmounts.length).fill(null)
        for(const [key, fee] of this.fixedAmounts.entries()) {
            const errors = []
            if(!fee.amount) errors.push("Amount is missing.")
            if(isNaN(fee.amount)) errors.push(fee.amount.toString() + " is not a number.")

            if(!fee.label) errors.push("Label is missing.")

            if(errors.length > 0) this.errors[key] = errors; else this.errors[key]=null;
        }

        return this.errors.every(element => element === null)
}
}
