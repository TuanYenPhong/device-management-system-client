export class Device {

  constructor(){}

  id:number;
  typeDevice:string;
  codeDevice:string;
  description:string;
  status:number;
  states:number;

  //phan device
  inputDay:string;
  guarantee:string;
  supplyUnit:string;
  firstTime:string;

  //device work
  deviceInclude:string;
  dateRange:string;
  additionalInformation:string;

  //customer device
  dateReceiveDevice:string;
  dateIssue:string;
  dateReturn:string;
  dateReturnCustomer:string;

  //phân loại thiết bị
  classificationDevice:number;

  //dung chung
  deviceManager:string;
}
