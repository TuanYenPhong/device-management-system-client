export class Repair{
    constructor(){

    }
    id:number;
    description:string;
    dateRepair:Date;
    dateFinish:Date;
    status:number;
    idDevice:number;
    entities:{
      codeDevice:string;
    };
  }
