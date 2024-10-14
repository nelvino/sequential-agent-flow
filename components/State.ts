export class State {
  private data: Record<string, any>;

  constructor() {
    this.data = {};
  }

  set(key: string, value: any) {
    console.log(`Setting state for key: ${key}, value: ${JSON.stringify(value)}`);
    this.data[key] = value;
  }

  get(key: string) {
    const value = this.data[key];
    console.log(`Getting state for key: ${key}, value: ${JSON.stringify(value)}`);
    return value;
  }

  getAll() {
    return this.data;
  }

  setIsCompleted(value: boolean) {
    this.set('isCompleted', value);
  }

  isCompleted(): boolean {
    return this.get('isCompleted') || false;
  }

  // Add a method to check if a key exists in the state
  hasKey(key: string): boolean {
    return key in this.data;
  }
}