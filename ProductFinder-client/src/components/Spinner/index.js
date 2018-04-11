import React from 'react';
import Spin from 'antd/lib/spin';
import './spinner.css';

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size || 'large'
    };
  }
  render() {
    return (
      <Spin
        size={this.state.size}
        className='default-spinner' />
    );
  }
}

export default Spinner;
