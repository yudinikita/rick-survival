type EntryType<T> = {
  item: T
  accumulatedWeight: number
}

export default class WeightedRandomBag<T> {
  private entries: EntryType<T>[] = []
  private accumulatedWeight = 0

  constructor() {}

  public add(item: T, weight: number): void {
    this.entries.push({
      item,
      accumulatedWeight: this.accumulatedWeight + weight,
    })
    this.accumulatedWeight += weight
  }

  public getRandom(): T {
    const random = Math.random() * this.accumulatedWeight

    for (const entry of this.entries) {
      if (random < entry.accumulatedWeight) {
        return entry.item
      }
    }

    return this.entries[this.entries.length - 1].item
  }
}
