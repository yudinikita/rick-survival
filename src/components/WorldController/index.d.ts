export type CellKeyType =
  | 'sand'
  | 'grass'
  | 'water'
  | 'flower'
  | 'stone'
  | 'stoneTile'

export type CellType = {
  key: CellKeyType
  frame: string
  weight: number
}

export type CellsType = {
  [key in CellKeyType]: CellType
}
