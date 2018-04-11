import React, { Component } from 'react';
import EditableCell from '../EditableCell';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Popconfirm from 'antd/lib/popconfirm';
import { connect } from 'react-redux';
import { editDeviceName } from '../../actions/editDeviceName';
import { deRegisterDevice } from '../../actions/deRegisterDevice';
import './alexa-listing-table.css';

class AlexaListingTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Device Name',
      dataIndex: 'name',
      width: '30%',
      align: 'center',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: 'Device ID',
      dataIndex: 'deviceId',
      width: '40%',
      align: 'center',
      render: str => <div title={str}>{str.slice(0,30) + '...'}</div>
    },{
      title: 'Explore',
      width: '15%',
      align: 'center',
      render: ({ deviceId }) =>
        <div>
          <Button icon="folder-open" href={`/details/${deviceId}`}
            style={{ marginRight: '16px' }} />
        </div>
    }
    ,{
      title: 'Actions',
      width: '15%%',
      align: 'center',
      render: ({ deviceId }) =>
        <div>
          <Popconfirm title="Are you sure deregister this device permanently?"
            onConfirm={() => this.confirmDelete(deviceId)} onCancel={this.cancelDelete}
            okText="Yes" cancelText="No">
              <Button>Deregister</Button>
          </Popconfirm>
        </div>
    }];

    this.state = {
      dataSource: []
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.alexaListing.map(item => ({ ...item, key: item.deviceId }))
    });
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
        const deviceId = target['deviceId'];
        const token = this.props.userToken;
        this.props.editDeviceName(deviceId,value, token);
      }
    };
  }

  confirmDelete(deviceId) {
    this.props.deRegisterDevice(deviceId, this.props.userToken);
  }

  cancelDelete() {
    return;
  }
  
  render() {
    const columns = this.columns;
    return (
      <div className='alexa-listing-table'>
        <Table bordered dataSource={this.state.dataSource} columns={columns}
          title={() => <div style={{ fontSize:'20px', fontWeight: 'bold' }}>Alexa Devices List</div>}
          pagination={false}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editDeviceName: (deviceId, value, token) => {
      dispatch(editDeviceName(deviceId, value, token))
    },
    deRegisterDevice: (deviceId, token) => {
      dispatch(deRegisterDevice(deviceId, token))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userToken: state.userToken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlexaListingTable);