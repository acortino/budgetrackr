export class FixedFee {
    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }
    public get amount(): number {
        return this._amount;
    }

    public set amount(value: number) {
        this._amount = value;
    }
    private _amount: number;
    private _label: string;


    constructor(fixedFee: any = null){
        if(fixedFee && fixedFee._label !== undefined && fixedFee._amount !== undefined) {
            this.label = fixedFee._label;
            this.amount = fixedFee._amount;
        } else {
            this.amount = null;
            this.label  = null;
        }
    };
}
