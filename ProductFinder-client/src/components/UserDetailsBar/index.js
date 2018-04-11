import React, { Component } from 'react';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import { withRouter } from 'react-router-dom';
import { logOutUser } from '../../actions/userLogin';
import { setUserToken } from '../../actions/userLogin';
import { connect } from 'react-redux';
import bag from './bag.svg';
import './UserDetailsBar.css';

class UserDetailsBar extends Component {
  constructor() {
    super();
    this.logOutUser = this.logOutUser.bind(this);
  }
  componentDidMount(){
    this.props.setUserToken();
  }
  logOutUser() {
    this.props.logOutUser();
    this.props.history.push('/');
  }
  render() {
    const popTitle = (
      <div style={{ textAlign: 'center' }}>
        {this.props.userName}
      </div>
    );
    const popContent = (
      <Button style={{ width: '100%' }} onClick={this.logOutUser}>
        Logout
      </Button>
    );
    return (
      <div className='bar-container'>
        <div className='header-logo'>
          <img src={bag} className='bag-image-header'
            alt='Bag-Icon'/>
          <div className='header-text'>Alexa product finder</div>
        </div> 
        <div className='header-user'>
          <div className='user-name'>{this.props.userName}</div>
          <Popover
            placement='bottom'
            title={popTitle}
            content={popContent}
            trigger='click'>
            <div className='image-container'>
              <img className='header-google-userimage'
              src={this.props.userImage}
              alt='Profile'/>
            </div>
          </Popover>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOutUser: () => {
      dispatch(logOutUser())
    },
    setUserToken: () => {
      dispatch(setUserToken())
    } 
  }
}

export default withRouter(connect(null, mapDispatchToProps)(UserDetailsBar));