import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Spin, Form, Input } from 'antd';
// import { axiosInstance, axiosAuthInstance } from "./connection";

function EditFormSrc(props) {
  const { form } = props;

  useEffect(() => {
    if (props.submitFlag === 0) {
      return;
    }
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      props.handleEditOk(values);
      form.resetFields();
    });
  }, [props.submitFlag]);

  const { getFieldDecorator } = props.form;

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('content', {
          rules: [{ required: true, message: 'Please input content!' }],
        })(
          <Input
            placeholder="Content"
          />,
        )}
      </Form.Item>
    </Form>
  );
}

export const EditForm = Form.create({ name: 'editData' })(EditFormSrc);
