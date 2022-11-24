"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    getAllAsync() {
        throw new Error("Method not implemented.");
    }
}
exports.Repository = Repository;
/*  async getAllAsync(): any[] {
    const [rows] = await ConnectionDB.pool.query(`SELECT * FROM ${nameof(Ministros)};`);
    return rows;
  }






  protected field: T;

  constructor(field:T) {
    this.field = field;
  } */
/*   async getAll<T>()
  {
    const [rows] = await ConnectionDB.pool.query(`SELECT * FROM ${this.field};`);
    return rows;
  }
}*/
/* export class Repository implements IRepository<Ministros>{

  async getAllAsync(): Promise<any[]>{
    const min = [new Ministros('1','jaja','123','M','asx','12345','1','1','jaja','123','M','asx',true,false,'1')];
    const [rows] = await ConnectionDB.pool.query("SELECT * FROM Ministros");
    return rows;
  }
} */
/*    public nameofOptions = <T>(name: keyof T) => name;
  //protected  propertyName = nameof(this.nameofOptions);//nameof<T>(T); */
