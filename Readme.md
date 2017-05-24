# Color Organizer React

The Color Organizer allows users to add, name, rate, and remove colors from their customized list. The entire state of 
the color organizer can be represented with a single array. 

```javascript
{
    colors: [
        {
            "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
            "title": "ocean at dusk",
            "color": "#00c4e2",
            "rating": 5
        },
        {
            "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
            "title": "lawn",
            "color": "#26ac56",
            "rating": 3
        },
        {
            "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
            "title": "bright red",
            "color": "#ff0000",
            "rating": 0
        }
    ]
}
```

## Compose Funciton

In utils/time.js, There is a very important function--compose! It composes several functions together, first function excuted result will be the parameter of second function.  

```javascript
export const compose = (...fns) =>
  (arg) =>
    fns.reduce(
      (composed, f) => f(composed),
      arg
    );
```

## Clock Component

2 most frequently used life events: `componentDidMount`, `componentWillUnmount`. componentDidMount is invoked just after the component has rendered, and componentWillUnmount is invoked just before the component is unmounted.

**componentDidMount is another good place to make API requests**. This method is invoked after the component has rendered, so any setState calls from this method will kick off the updating lifecycle and rerender the component.

componentDidMount is also a good place to **initialize any third-party JavaScript that requires a DOM**. For instance, you may want to incorporate a drag-and-drop library or a library that handles touch events. Typically, these libraries require a DOM before they can be initialized.

Another good use for componentDidMount is to **start background processes like intervals or timers**. _Any processes started in componentDidMount or componentWillMount can be cleaned up in componentWillUnmount._ You don’t want to leave background processes running when they are not needed.

Components are unmounted when their parents remove them or they have been unmounted with the `unmountComponentAtNode` function found in react-dom. This method is used to _unmount the root component. When a root component is unmounted, its children are unmounted first_.

Clock.js:

```javascript
// good for api call, 3rd party lib interaction
componentDidMount() {
  console.log("Starting Clock");
  this.ticking = setInterval(() =>
      this.setState(getClockTime())
     , 1000);
}

// remove useless event, remove canvas context, etc
componentWillUnmount() {
  clearInterval(this.ticking);
  console.log("Stopping Clock");
}
```

index.js

```jsx
import Clock from './components/Clock';
const target = document.getElementById('app');

ReactDOM.render(
    <Clock onClose={() => ReactDOM.unmountComponentAtNode(target)} />,
    target
);
```

#### Installation
Run this npm command to install dependencies.
```
npm install
```

#### Build
Run this npm command to build the JavaScript Bundle for production
```
npm run build
```

#### Run
Run this npm command to build the JavaScript Bundle and open the browser to the app using the file api.
```
npm start
```