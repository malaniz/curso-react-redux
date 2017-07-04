import React from 'react';
import { connect } from 'react-redux';
import { phoneList } from '../redux/phones';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.phoneList()
    console.log(this.props);
  }
  render () {
    const { loading, phones } = this.props;
    if (loading) {
      return <h1> loading ... </h1>;
    }
    return (
      <div>
        <h1> App Async </h1>
        { phones.map((x, idx) => <p key={idx}> {x.id} </p>) }
      </div>
    )
  }
}


export default connect(
  (state) => state.phones,
  {
    phoneList: phoneList,
  }
)(App);
