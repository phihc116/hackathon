import { Entity } from "../../domain";
import { IRepository } from "./repository.interface";

export abstract class PrismaRepository<
  TDomain extends Entity,
  TPrisma extends object, 
  TId
> implements IRepository<TDomain, TId>
{
  protected constructor( 
    protected readonly model: any  
  ) {}
 
  protected abstract fromPrisma(prismaModel: TPrisma): TDomain;

  async findById(id: TId): Promise<TDomain | null> {
    const record = await this.model.findUnique({ where: { id } });
    return record ? this.fromPrisma(record) : null;
  }

  async findAll(): Promise<TDomain[]> {
    const records: TPrisma[] = await this.model.findMany();
    return records.map((r) => this.fromPrisma(r));
  }

  async create(entity: TDomain): Promise<TDomain> {  
    const created = await this.model.create({ data: entity });
    return this.fromPrisma(created);
  }

  async update(entity: TDomain): Promise<TDomain> { 
    const updated = await this.model.update({
      where: { id: (entity as any).id },
      entity,
    });
    return this.fromPrisma(updated);
  }

  async delete(id: TId): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}