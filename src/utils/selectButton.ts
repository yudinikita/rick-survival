import Phaser from 'phaser'

function selectButton(
  buttonImage: Phaser.GameObjects.Image,
  buttonSelector?: Phaser.GameObjects.Image
) {
  buttonImage.setScale(1.05)

  if (buttonSelector) {
    buttonSelector
      .setPosition(buttonImage.x + buttonImage.width / 2, buttonImage.y + 30)
      .setVisible(true)
  }
}

function unselectButton(
  buttonImage: Phaser.GameObjects.Image,
  buttonSelector?: Phaser.GameObjects.Image
) {
  buttonImage.setScale(1)

  if (buttonSelector) {
    buttonSelector.setVisible(false)
  }
}

export { selectButton, unselectButton }
