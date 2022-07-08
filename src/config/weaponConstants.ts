import type { WeaponType } from '../types/weapons'

export type WeaponConfig = {
  ammoIndex: number
  type: WeaponType
  attackRate: number
  damage: number
  speed: number
  frameKey: string
  display: {
    radius: number
    scale?: number
  }
}

type WeaponConstantsType = {
  [key in WeaponType]: WeaponConfig
}

const weaponConstants: WeaponConstantsType = {
  Pistol: {
    ammoIndex: 0,
    type: 'Pistol',
    attackRate: 1,
    speed: 1,
    damage: 1.2,
    frameKey: 'pistol',
    display: {
      radius: 6,
    },
  },
  Pistol1: {
    ammoIndex: 1,
    type: 'Pistol1',
    attackRate: 1,
    speed: 1,
    damage: 1.25,
    frameKey: 'pistol1',
    display: {
      radius: 6,
    },
  },
  Pistol2: {
    ammoIndex: 2,
    type: 'Pistol2',
    attackRate: 1,
    speed: 1,
    damage: 1.3,
    frameKey: 'pistol2',
    display: {
      radius: 11,
    },
  },
  Pistol3: {
    ammoIndex: 3,
    type: 'Pistol3',
    attackRate: 1,
    speed: 1,
    damage: 1.35,
    frameKey: 'pistol3',
    display: {
      radius: 16,
    },
  },
  Blaster1: {
    ammoIndex: 4,
    type: 'Blaster1',
    attackRate: 1,
    speed: 1.2,
    damage: 1.2,
    frameKey: 'blaster1',
    display: {
      radius: 15,
    },
  },
  Blaster2: {
    ammoIndex: 5,
    type: 'Blaster2',
    attackRate: 1,
    speed: 1.25,
    damage: 1.25,
    frameKey: 'blaster2',
    display: {
      radius: 15,
    },
  },
  Blaster3: {
    ammoIndex: 6,
    type: 'Blaster3',
    attackRate: 1,
    speed: 1.3,
    damage: 1.3,
    frameKey: 'blaster3',
    display: {
      radius: 15,
    },
  },
  Revolver1: {
    ammoIndex: 7,
    type: 'Revolver1',
    attackRate: 1.1,
    speed: 1.2,
    damage: 1.3,
    frameKey: 'revolver1',
    display: {
      radius: 10,
    },
  },
  Revolver2: {
    ammoIndex: 8,
    type: 'Revolver2',
    attackRate: 1.1,
    speed: 1.2,
    damage: 1.4,
    frameKey: 'revolver2',
    display: {
      radius: 15,
    },
  },
  Revolver3: {
    ammoIndex: 9,
    type: 'Revolver3',
    attackRate: 1.2,
    speed: 1.2,
    damage: 1.5,
    frameKey: 'revolver3',
    display: {
      radius: 12,
    },
  },
  Rifle: {
    ammoIndex: 10,
    type: 'Rifle',
    attackRate: 1.1,
    speed: 1.1,
    damage: 1.1,
    frameKey: 'rifle',
    display: {
      radius: 10,
    },
  },
  Rifle1: {
    ammoIndex: 11,
    type: 'Rifle1',
    attackRate: 1.2,
    speed: 1.2,
    damage: 1.4,
    frameKey: 'rifle1',
    display: {
      radius: 12,
    },
  },
  Rifle2: {
    ammoIndex: 12,
    type: 'Rifle2',
    attackRate: 1.2,
    speed: 1.35,
    damage: 1.75,
    frameKey: 'rifle2',
    display: {
      radius: 15,
    },
  },
  Rifle3: {
    ammoIndex: 13,
    type: 'Rifle3',
    attackRate: 1.3,
    speed: 1.5,
    damage: 2,
    frameKey: 'rifle3',
    display: {
      radius: 20,
      scale: 0.8,
    },
  },
  GaussGun1: {
    ammoIndex: 14,
    type: 'GaussGun1',
    attackRate: 1.25,
    speed: 1.3,
    damage: 1.5,
    frameKey: 'gauss-gun1',
    display: {
      radius: 15,
      scale: 0.5,
    },
  },
  GaussGun2: {
    ammoIndex: 15,
    type: 'GaussGun2',
    attackRate: 1.3,
    speed: 1.5,
    damage: 2,
    frameKey: 'gauss-gun2',
    display: {
      radius: 15,
      scale: 0.5,
    },
  },
  GaussGun3: {
    ammoIndex: 16,
    type: 'GaussGun3',
    attackRate: 1.25,
    speed: 2,
    damage: 2.1,
    frameKey: 'gauss-gun3',
    display: {
      radius: 20,
      scale: 0.6,
    },
  },
  SubmachineGun: {
    ammoIndex: 17,
    type: 'SubmachineGun',
    attackRate: 0.9,
    speed: 1.1,
    damage: 0.95,
    frameKey: 'submachine-gun',
    display: {
      radius: 10,
    },
  },
  SubmachineGun1: {
    ammoIndex: 18,
    type: 'SubmachineGun1',
    attackRate: 0.8,
    speed: 1.2,
    damage: 0.85,
    frameKey: 'submachine-gun1',
    display: {
      radius: 10,
    },
  },
  SubmachineGun2: {
    ammoIndex: 19,
    type: 'SubmachineGun2',
    attackRate: 0.8,
    speed: 1.3,
    damage: 0.7,
    frameKey: 'submachine-gun2',
    display: {
      radius: 10,
    },
  },
  MachineGun3: {
    ammoIndex: 20,
    type: 'MachineGun3',
    attackRate: 0.5,
    speed: 2,
    damage: 0.5,
    frameKey: 'machine-gun3',
    display: {
      radius: 10,
    },
  },
  Machine1: {
    ammoIndex: 21,
    type: 'Machine1',
    attackRate: 0.9,
    speed: 1.3,
    damage: 1,
    frameKey: 'machine1',
    display: {
      radius: 10,
    },
  },
  Machine2: {
    ammoIndex: 22,
    type: 'Machine2',
    attackRate: 0.8,
    speed: 1.3,
    damage: 0.85,
    frameKey: 'machine2',
    display: {
      radius: 10,
    },
  },
  Machine3: {
    ammoIndex: 23,
    type: 'Machine3',
    attackRate: 0.7,
    speed: 1.5,
    damage: 1,
    frameKey: 'machine3',
    display: {
      radius: 10,
    },
  },
  Shuriken1: {
    ammoIndex: 24,
    type: 'Shuriken1',
    attackRate: 0.98,
    speed: 0.8,
    damage: 1,
    frameKey: 'shuriken1',
    display: {
      radius: 10,
    },
  },
  Shuriken2: {
    ammoIndex: 25,
    type: 'Shuriken2',
    attackRate: 0.96,
    speed: 0.7,
    damage: 1.2,
    frameKey: 'shuriken2',
    display: {
      radius: 10,
    },
  },
  Shuriken3: {
    ammoIndex: 26,
    type: 'Shuriken3',
    attackRate: 0.94,
    speed: 0.8,
    damage: 1.5,
    frameKey: 'shuriken3',
    display: {
      radius: 10,
    },
  },
  RocketGun3: {
    ammoIndex: 27,
    type: 'RocketGun3',
    attackRate: 2,
    speed: 0.5,
    damage: 4,
    frameKey: 'rocket-gun3',
    display: {
      radius: 15,
    },
  },
  PlasmoGun2: {
    ammoIndex: 28,
    type: 'PlasmoGun2',
    attackRate: 0.85,
    speed: 1.5,
    damage: 1,
    frameKey: 'plasmogun2',
    display: {
      radius: 15,
    },
  },
  PlasmoGun3: {
    ammoIndex: 29,
    type: 'PlasmoGun3',
    attackRate: 0.75,
    speed: 2,
    damage: 1.2,
    frameKey: 'plasmogun3',
    display: {
      radius: 15,
    },
  },
  Hand: {
    ammoIndex: 30,
    type: 'Hand',
    attackRate: 1,
    speed: 1,
    damage: 1,
    frameKey: 'pistol',
    display: {
      radius: 15,
    },
  },
}

export default weaponConstants
