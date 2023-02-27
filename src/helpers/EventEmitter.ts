type Events = {
  [key: string]: { (data: any): void }[]
}

interface EventEmitter {
  _events: Events
  dispatch(event: string, data?: any): void
  subscribe(event: string, callback: (data: any) => void): void
  unsubscribe(event: string): void
}
const Emitter: EventEmitter = {
  _events: {},
  async dispatch(event: string, data) {
    if (!this._events[event]) return
    await new Promise(resolve => setTimeout(() => resolve(this._events[event].forEach(callback => callback(data)))))
  },
  subscribe(event, callback) {
    if (!this._events[event]) this._events[event] = []
    this._events[event].push(callback)
  },
  unsubscribe(event) {
    if (!this._events[event]) return
    delete this._events[event]
  },
}

export default Emitter
