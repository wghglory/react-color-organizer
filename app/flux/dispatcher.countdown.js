/* CountDispatcher : Dispatches actions for the Countodown 
 * There is only ever one dispatcher, and it represents the traffic control part.
 * The dispatcher takes the action, packages it with some information about where the action was generated,
 * and sends it on to the appropriate store or stores that will handle the action.
 */

import { Dispatcher } from 'flux';
export default class CountdownDispatcher extends Dispatcher {
  handleAction(action) {
    console.log('dispatching action:', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    });
  }
}