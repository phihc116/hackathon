import { Entity } from "../../domain";
export interface IRepository<TDomain extends Entity, TId> {
  findById(id: TId): Promise<TDomain | null>;
  findAll(): Promise<TDomain[]>;
  create(entity: TDomain): Promise<TDomain>;
  update(entity: TDomain): Promise<TDomain>;
  delete(id: TId): Promise<void>;
}