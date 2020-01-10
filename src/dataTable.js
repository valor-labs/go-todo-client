import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { useStore } from './store';
import { Table, Button, Modal, Popconfirm } from 'antd';
import { axiosInstance } from "./connection";
import { EditForm } from "./editForm";

export function DataTable(props) {
  const [editVisible, setEditVisible] = useState(false);
  const [confirmEditLoading] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(0);
  const [columns, setColumns] = useState();
  const [data, setData] = useState();
  const [deleteRequest, setDeleteRequest] = useState(0);

  const handleDelete = rowid => setDeleteRequest(rowid);
  /*const doDelete = rowid => {
    (async () => {
      await axiosInstance.delete(`todo/${rowid}`);
      let rows = [...data.filter(record => record.key !== rowid)];
      setData(rows);
    })();
  };

  useEffect(() => doDelete(deleteRequest), [deleteRequest]);*/

  useEffect(() => {
    if (props.columns && props.data) {
      const columns = props.columns;
      /*columns.push({
        title: '...',
        dataIndex: 'operation',
        render: (text, record) =>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
      });*/
      setColumns(columns);
      const data = props.data.map(row => ({ ...row, key: row.rowid }));
      setData(data);
    }
  }, [props.columns, props.data]);

  const doEditOk = () => {
    setSubmitFlag(submitFlag + 1);
  };

  const handleEditOk = (formData) => {
    (async () => {
      const res = await axiosInstance.post(`todo`, formData);
      const newRecord = res.data;
      newRecord.key = newRecord.rowid;
      setData([newRecord, ...data]);
      setEditVisible(false);
    })();
  };

  const handleEditCancel = () => {
    setEditVisible(false);
  };
  const addNewRow = () => setEditVisible(true);

  return (
    !columns ? (<></>) :
      <div>
        <Button onClick={addNewRow} type="primary" style={{ margin: 10 }}>
          New
            </Button>
        <Button type="secondary" style={{ margin: 10 }}>
          Refresh
            </Button>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 240 }} />
        <Modal
          title="New Todo"
          visible={editVisible}
          onOk={doEditOk}
          confirmLoading={confirmEditLoading}
          onCancel={handleEditCancel}
        >
          <EditForm submitFlag={submitFlag} handleEditOk={handleEditOk}></EditForm>
        </Modal>
      </div>
  )
}
