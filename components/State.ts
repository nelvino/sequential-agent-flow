export class State {
  private state: { [key: string]: any };
  private history: Array<{ [key: string]: any }>;

  constructor() {
    this.state = {};
    this.history = [];
  }

  set(key: string, value: any) {
    this.state[key] = value;
    this.trackHistory(key, value); // Track each change to maintain full project history
  }

  get(key: string) {
    return this.state[key];
  }

  getAll() {
    return this.state;
  }

  getHistory() {
    return this.history;
  }

  trackHistory(key: string, value: any) {
    const timestamp = new Date().toISOString();
    this.history.push({ key, value, timestamp });
  }
}