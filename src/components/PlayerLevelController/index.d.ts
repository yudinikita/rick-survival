export type PlayerSkillType =
  | 'regen'
  | 'health'
  | 'body'
  | 'bullet'
  | 'damage'
  | 'reload'
  | 'speed'

export type PlayerSkill = {
  readonly type: PlayerSkillType
  level: number
}

export type PlayerSkills = {
  [key in PlayerSkillType]: PlayerSkill
}
