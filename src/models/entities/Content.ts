export interface Content {
  identifier: string;
  name: Description;
  description: Description;
  tenant: string;
  repository: any;
  taxonomy: Taxonomy;
  sub_skills: SubSkill[];
  gradient: string;
  status: string;
  media: string[];
  created_by: string;
  updated_by: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Description {
  en: string;
}

export interface SubSkill {
  name: Name;
  identifier: string;
}

export interface Name {
  en: string;
  hi: string;
  kn: string;
}

export interface Taxonomy {
  board: SubSkill;
  class: SubSkill;
  l1_skill: Skill;
  l2_skill: Skill[];
  l3_skill: Skill[];
}

export interface Skill {
  name: Name;
  type: string;
  identifier: string;
}
