export interface IRepository<T>{
  getAllAsync(): T[];
}
