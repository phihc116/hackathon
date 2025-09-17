export class EntityMapper {
  static toPrisma<TDomain extends object, TPrisma extends object>(
    domain: TDomain
  ): TPrisma {
    const result = {} as TPrisma;
    for (const key in domain) {
      if (Object.prototype.hasOwnProperty.call(domain, key)) {
        (result as any)[key] = (domain as any)[key];
      }
    }
    return result;
  }

  static fromPrisma<TDomain extends object, TPrisma extends object>(
    ctor: new () => TDomain,
    prisma: TPrisma
  ): TDomain {
    const entity = new ctor();
    for (const key in prisma) {
      if (key in entity) {
        (entity as any)[key] = (prisma as any)[key];
      }
    }
    return entity;
  }
}