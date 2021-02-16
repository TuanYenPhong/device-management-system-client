export class Borrow {
  id: number;

  reson: string;

  description: string;

  dateBorrow: string;

  dateReturn: string;

  nameBorrow: string;

  idDevice: number;

  codeDevice: string;

  typeDevice: string;

  createdBy: string;

  createdDate: Date;

  modifiedBy: string;

  modifiedDate: Date;

  idDepartment: number;

  userId: number;

  status: number;
  deparmentBorrow: {
    nameDepartment: string;
    id: number;
  };

  constructor(){}
}

export class DP{
  constructor(){}
  name: string;
  region: string;
}

export class DataBorrow{
  borrows: any;
  outOfDate: number;
  deadline: number;
}
