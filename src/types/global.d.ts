import { FloatingNumbersPlugin } from '../plugins/FloatingNumbers'

declare global {
  namespace Phaser {
    interface Scene {
      floatingNumbers: FloatingNumbersPlugin
    }
  }
}
