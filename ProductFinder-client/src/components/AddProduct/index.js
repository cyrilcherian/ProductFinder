import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { addProductToList } from '../../actions/addProduct';
import { connect } from 'react-redux';
import './add-product.css';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a new product"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Product ID">
              {getFieldDecorator('productId', {
                rules: [{
                  required: true,
                  message: 'Please input the id of the product!'
                },{
                  pattern: /^[a-zA-Z0-9]*$/,
                  message: 'Must be alphanumeric'
                }]
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="Product Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of the product!' },
                  , {
                    pattern: /^[a-zA-Z0-9\s]*$/,
                    message: 'Must be alphanumeric'
                  }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="Location">
              {getFieldDecorator('location', {
                rules: [{ required: true, message: 'Please input the location of the product!' },
                  , {
                    pattern: /^[a-zA-Z0-9\s]*$/,
                    message: 'must be alphanumeric'
                  }],
              })(
                <Input />
                )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class AddProduct extends Component {
  constructor() {
    super();
    this.uniqueProductInfo = this.uniqueProductInfo.bind(this);
  }
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const productData = {
        "deviceId": this.props.deviceId,
        "productObj": {
          "productId": values.productId,
          "name": values.name,
          "location": values.location
        }
      }
      const token = this.props.userToken;
      this.props.addProductToList(productData, token, this.uniqueProductInfo);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  uniqueProductInfo() {
    Modal.info({
      title: 'DUPLICATE PRODUCT',
      content: (
        <div>
          <p>Product Id and Product Name must be unique</p>
        </div>
      ),
      onOk() { },
    });
  }

  render() {
    return (
      <div>
        <div className='add-product-button'>
          <Button type="primary" onClick={this.showModal}>Add Product</Button>
        </div>  
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToList: (productData, token, uniqueProductInfo) => {
      dispatch(addProductToList(productData, token, uniqueProductInfo))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userToken: state.userToken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);