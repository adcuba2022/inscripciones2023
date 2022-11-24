import { IRepository } from "../Domain/IRepository";
import { Ministros } from "../Domain/Ministros/ministro.entity";
import { Repository } from "../Infraestructura/Repository";

export class MySqlRepository extends Repository implements IRepository<Ministros> {
  /**
   *
   */
  constructor(field:Ministros) {
    super();
  }
  getAllAsync(): Ministros[] {
    throw new Error("Method not implemented.");
  }

}
