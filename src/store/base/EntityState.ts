import { Entity, EntityIdentifier } from 'models/entity';

export interface EntityState<T extends Entity = Entity> {
  entities: { [key: EntityIdentifier]: T };
  currentId?: EntityIdentifier;
  loadingList?: boolean;
  loadingOne?: boolean;
  error?: string;
}
