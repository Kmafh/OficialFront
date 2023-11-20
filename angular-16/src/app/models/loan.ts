export class Loan {
    tipe!:string;
    origin:String = '';
    cantFinish: Number = 0;
    cantPendiente: Number = this.cantFinish;
    recibos: Number = 0;
    recibosPendientes: Number = 0;
    cant:Number = 0;
    createAt: Date= new Date();
    finishAt!: Date;
    uid!:String;
    img!:String;
    interes!:String;
    description!:String;
    active: Boolean = true;
}
