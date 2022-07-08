export type WorldName =
  | 'RickiLand'
  | 'Plumbubo'
  | 'Contaminated'
  | 'Doopidoo'
  | 'Crystal'
  | 'Autumn'
  | 'Alien'
  | 'Desert'
  | 'Blue'
  | 'Ash'
  | 'Swamp'

export type WorldConfig = {
  id: number
  title: string
  description: string
  cover: string
  music: string
}

export type WorldsConfig = {
  [key in WorldName]: WorldConfig
}

const worldsConfig: WorldsConfig = {
  RickiLand: {
    id: 0,
    title: 'Земля Рика',
    description: '',
    cover: 'world_0_cover',
    music: 'world_0',
  },
  Plumbubo: {
    id: 1,
    title: 'Плюмбубо',
    description: '',
    cover: 'world_1_cover',
    music: 'world_1',
  },
  Contaminated: {
    id: 2,
    title: 'Грязная Земля',
    description: '',
    cover: 'world_2_cover',
    music: 'world_2',
  },
  Doopidoo: {
    id: 3,
    title: 'Дупиду',
    description: '',
    cover: 'world_3_cover',
    music: 'world_3',
  },
  Crystal: {
    id: 4,
    title: 'Вечная мерзлота',
    description: '',
    cover: 'world_4_cover',
    music: 'world_4',
  },
  Autumn: {
    id: 5,
    title: 'Снова 3 сентября',
    description: '',
    cover: 'world_5_cover',
    music: 'world_5',
  },
  Alien: {
    id: 6,
    title: 'Планета Нибиру',
    description: '',
    cover: 'world_6_cover',
    music: 'world_6',
  },
  Desert: {
    id: 7,
    title: 'Пустыня',
    description: '',
    cover: 'world_7_cover',
    music: 'world_7',
  },
  Blue: {
    id: 8,
    title: 'Голубая планета',
    description: '',
    cover: 'world_8_cover',
    music: 'world_8',
  },
  Ash: {
    id: 9,
    title: 'Пепел',
    description: '',
    cover: 'world_9_cover',
    music: 'world_9',
  },
  Swamp: {
    id: 10,
    title: 'Болото',
    description: '',
    cover: 'world_10_cover',
    music: 'world_10',
  },
}

export default worldsConfig
