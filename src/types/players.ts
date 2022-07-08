import { WeaponType } from './weapons'

export type PlayerProperties = {
  type: PlayerNameType
  title: string
  regeneration: number
  maximumHitPoints: number
  bodyDamage: number
  bulletSpeed: number
  bulletDamage: number
  attackRate: number
  speed: number
  weapon: WeaponType
  evolutions: PlayerNameType[]
}

export type PlayerConfigType = {
  [key in PlayerNameType]: PlayerProperties
}

export type PlayerNameType =
  | 'RickDefault'
  | 'CommanderRick'
  | 'CopRick'
  | 'CrowRick'
  | 'D99Rick'
  | 'DeepthroatRick'
  | 'FederationPrisonRick'
  | 'GeneralRick'
  | 'GhostcatcherRick'
  | 'MemoryRick'
  | 'PickleRick'
  | 'RaderRick'
  | 'RatSuitPickleRick'
  | 'Rick800'
  | 'RickBald'
  | 'RickBeefcake'
  | 'RickDoofus'
  | 'RickDude'
  | 'RickEvil'
  | 'RickFlatTop'
  | 'RickGreaser'
  | 'RickGuard'
  | 'RickJohnRick'
  | 'RickJunkYard'
  | 'RickKarate'
  | 'RickMiami'
  | 'RickMurderPatrol'
  | 'RickNinja'
  | 'RickRobot'
  | 'RickShibuya'
  | 'RickSmooth'
  | 'RickSpaceSuit'
  | 'RickSupremeGuard'
  | 'RickSurvivor'
  | 'RickTurberlent'
  | 'RickValentinesDay'
  | 'RickVapourWave'
  | 'RickWarrior'
  | 'RickZarchez'
  | 'SherlockRick'
  | 'SpaceTrooperRick'
  | 'SpiritualLeaderRick'
  | 'TinyRick'
  | 'WastelandRick'
  | 'WeirdRick'
