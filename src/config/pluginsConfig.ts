import { FloatingNumbersPlugin } from '../plugins/FloatingNumbers'

export const plugins = {
  scene: [
    {
      key: 'floatingNumbers',
      plugin: FloatingNumbersPlugin,
      sceneKey: 'floatingNumbers',
      mapping: 'floatingNumbers',
      systemKey: 'floatingNumbers',
    },
  ],
}
