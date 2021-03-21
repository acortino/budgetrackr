import {Component, OnInit}    from "@angular/core";
import {HomeService}          from "./home.service";
import {RouterExtensions}     from "nativescript-angular";
import {getNumber, setNumber} from "@nativescript/core/application-settings";

@Component({
               selector   : "ns-home",
               moduleId   : module.id,
               templateUrl: "./home.component.html",
           })
export class HomeComponent implements OnInit {
    constructor(private homeService: HomeService,
                private routerExtensions: RouterExtensions) {
        this._income         = getNumber("income");
        this._fixedAmount    = getNumber("fixedAmount");
        this._currentExpense = getNumber("currentExpense");
        this._currentAmount  = this._income - (this._fixedAmount + this._currentExpense);

    }

    private _showReset: boolean = false;

    public get showReset(): boolean {
        return this._showReset;
    }

    public set showReset(value: boolean) {
        this._showReset = value;
    }

    private _income: number;

    public get income(): number {
        return this._income;
    }

    public set income(value: number) {
        this._income = value;
    }

    private _currentAmount: number;

    public get currentAmount(): number {
        return this._currentAmount;
    }

    public set currentAmount(value: number) {
        this._currentAmount = value;
    }

    private _fixedAmount: number;

    public get fixedAmount(): number {
        return this._fixedAmount;
    }

    public set fixedAmount(value: number) {
        this._fixedAmount = value;
    }

    private _currentExpense: number;

    public get currentExpense(): number {
        return this._currentExpense;
    }

    public set currentExpense(value: number) {
        this._currentExpense = value;
    }

    ngOnInit(): void {
        if (getNumber("income") && getNumber("currentExpense")) {
            this.showReset = true;
        }
    }

    resetValue() {
        setNumber("currentExpense", 0);
        this._currentExpense = 0;
        this._currentAmount  = this._income - (this._fixedAmount + this._currentExpense);
    }

    goTo(path) {
        this.routerExtensions.navigate([path], {clearHistory: true});
    }

    public setIncome() {

    }
}
