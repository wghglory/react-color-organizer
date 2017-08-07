/* The Store : Holds the Countdown Info 
 * Stores are objects that hold the application’s logic and state data. 
 * Stores are similar to models in the MVC pattern, 
 * but stores are not restricted to managing data in a single object. 
 * It is possible to build Flux applications that consist of a single store that manages many different data types.
 * Current state data can be obtained from a store via properties. 
 * Everything a store needs to change state data is provided in the action. 
 * A store will handle actions by type and change their data accordingly. 
 * Once data is changed, the store will emit an event and notify any views that have subscribed to the store that their data has changed.
*/

import EventEmitter from 'events';

export default class CountdownStore extends EventEmitter {
  constructor(count = 5, dispatcher) {
    super();
    this._count = count;
    this.dispatcherIndex = dispatcher.register(this.dispatch.bind(this));
  }

  get count() {
    return this._count;
  }

  dispatch(payload) {
    const { type, count } = payload.action;
    switch (type) {
      case "TICK":
        this._count = count;
        this.emit("TICK");
        return true;
      case "RESET":
        this._count = count;
        this.emit("RESET");
        return true;
    }
  }

}