export class Collection<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getAllItems(): T[] {
    return this.items;
  }

  getItemByIndex(index: number): T | undefined {
    return this.items[index];
  }

  clearAll(): void {
    this.items = [];
  }

  removeItem(item: T): void {
    this.items = this.items.filter((element: T) => element !== item);
  }

  replaceItem(index: number, item: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = item;
    }
  }
}