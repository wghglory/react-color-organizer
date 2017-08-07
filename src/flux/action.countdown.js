/* Action Creators : Create Action Objects 
 * Actions provide the instructions and data that the store will use to modify the state. 
 * Action creators are functions that can be used to abstract away the details required to build an action. 
 * Actions themselves are objects that at minimum contain a `type` field. 
 * The action type is typically an uppercase string that describes the action. 
 * Additionally, actions may package any data required by the store
 */

const countdownActions = (dispatcher) =>
  ({
    tick(count) {
      dispatcher.handleAction({
        type: 'TICK',
        count: count - 1
      });
    },
    reset(count) {
      dispatcher.handleAction({
        type: 'RESET',
        count
      });
    }
  });

export default countdownActions;