import { Entity } from 'models/entity';

export interface QuestionSet extends Entity {
  identifier: string;
  title: Description;
  description: Description;
  question_set_id: string;
  repository: Repository;
  sequence: number;
  tenant: Tenant;
  taxonomy: Taxonomy;
  sub_skills: SubSkill[];
  purpose: string;
  is_atomic: boolean;
  gradient: string;
  group_name: number;
  content_id: null;
  instruction_text: string;
  status: string;
  is_active: boolean;
  created_by: string;
  updated_by: null;
  created_at: Date;
  updated_at: Date;
}

export interface Description {
  en: string;
}

export interface Repository {
  id: number;
  name: RepositoryName;
}

export interface RepositoryName {
  en: string;
  ta: string;
  te: string;
}

export interface SubSkill {
  id: number;
  name: SubSkillName;
}

export interface SubSkillName {
  en: string;
  ka: string;
}

export interface Taxonomy {
  board: Board;
  class: SubSkill;
  l1_skill: Board;
  l2_skill: Board[];
  l3_skill: Tenant[];
}

export interface Board {
  id: number;
  name: BoardName;
}

export interface BoardName {
  en: string;
  hi: string;
  kn: string;
}

export interface Tenant {
  id: number;
  name: TenantName;
}

export interface TenantName {
  en: string;
  hi: string;
}
