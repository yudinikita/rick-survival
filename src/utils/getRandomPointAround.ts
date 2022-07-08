import Phaser from 'phaser'
import constants from '../config/constants'

export default function getRandomPointAround(
  targetX: number,
  targetY: number
): Phaser.Geom.Point {
  const width = constants.WIDTH
  const height = constants.HEIGHT
  const rateScale = 1.2

  const rectOuter = new Phaser.Geom.Rectangle(
    0,
    0,
    width * rateScale,
    height * rateScale
  )
  const rectInner = new Phaser.Geom.Rectangle(0, 0, width, height)

  Phaser.Geom.Rectangle.CenterOn(rectOuter, targetX, targetY)
  Phaser.Geom.Rectangle.CenterOn(rectInner, targetX, targetY)

  return Phaser.Geom.Rectangle.RandomOutside(rectOuter, rectInner)
}
