import React, { Component } from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Popconfirm from 'antd/lib/popconfirm';
import { connect } from 'react-redux';
import { editProductLocation } from '../../actions/editProductLocation';
import { deleteProduct } from '../../actions/deleteProduct'; 
import EditableCell from '../EditableCell';
import './product-listing-table.css'

class ProductListingTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Product ID',
      dataIndex: 'productId',
      width: '15%',
      align: 'center'
    }, {
      title: 'Product Name',
      dataIndex: 'name',
      width: '30%',
      align: 'center',
    }, {
      title: 'Location',
      dataIndex: 'location',
      align: 'center',
      width: '40%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'location')}
        />
      )
    }, {
      title: 'Actions',
      align: 'center',
      width: '15%',
      render: ({ productId }) => (
        <Popconfirm title="Are you sure delete this product permanently?"
          onConfirm={() => this.confirmDelete(productId)} onCancel={this.cancelDelete}
          okText="Yes" cancelText="No">
          <Button icon="delete" />
        </Popconfirm>
      )
    }];    
    this.state = { data: [] };
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const data = [...this.state.data];
      const target = data.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ data });
        const productId = target['productId'];
        const deviceId = this.props.deviceId;
        this.props.editProductLocation(deviceId, productId, value, this.props.userToken);
      }
    };
  }

  confirmDelete(productId) {
    this.props.deleteProduct(this.props.deviceId, productId, this.props.userToken);
  }

  cancelDelete() {
    return;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.map(item => ({ ...item, key: item.productId }))
    });
  }

  render() {
    return(
      <div className='product-listing-table'>
        <Table bordered dataSource={this.state.data} columns={this.columns}
          title={() => <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          List of Products
          </div>} pagination={false}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editProductLocation: (deviceId, productId, value, token) => {
      dispatch(editProductLocation(deviceId, productId, value, token))
    },
    deleteProduct: (deviceId, productId, token) => {
      dispatch(deleteProduct(deviceId, productId, token))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userToken: state.userToken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingTable);
