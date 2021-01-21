export class Device {

  constructor(){}

  id:number;
  typeDevice:string;
  codeDevice:string;
  description:string;
  inputDay:Date;
  guarantee:string;
  supplyUnit:string;
  firstTime:Date;

  //customer device
  dateIssue:Date;
  dateReturn:Date;
  dateReturnCustomer:Date;

  //device work
  deviceInclude:string;
  dateRange:Date;
  deviceManager:string;

  //phân loại thiết bị
  classificationDevice:number;
}
