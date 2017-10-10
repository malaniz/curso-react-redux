# High Order Components
There is several ways to make *High Order Components*:
- recomponse as material-ui
- a Function that generate the new component with new funcionality
- class decorators

## Introduction to HOC
A HOC can be seen like:
```javascript
export default HOC(ComposedComponent) {
  class WrapperComponent extends React.Component {
    componentDidMount(){
      this.newProps = transformationFunc(this.props);
    }

    render(){
      <ComposedComponent {...this.props} {...this.newProps} />
    }
  }
  return WrapperComponent;
}
```

Basically, it is a function that has the *Component* as argument and
create/generate the custom component.



