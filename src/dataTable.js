import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Modal, Popconfirm, Tag, Radio } from 'antd';
import { axiosInstance } from "./connection";
import { EditForm } from "./editForm";

export function DataTable(props) {
  const [editVisible, setEditVisible] = useState(false);
  const [confirmEditLoading] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(0);
  const [columns, setColumns] = useState();
  const [data, setData] = useState();
  const [deleteRequest, setDeleteRequest] = useState(0);
  const [completeRequest, setCompleteRequest] = useState(0);
  const [priorityRequest, setPriorityRequest] = useState(null);

  const priorities = ["Normal", "Low", "High"];

  const handleDelete = rowid => setDeleteRequest(rowid);
  const handleComplete = rowid => setCompleteRequest(rowid);
  const handleChangePriority = (e, rowid) => setPriorityRequest({ e, rowid });
  const doDelete = rowid => {
    if (deleteRequest > 0) {
      (async () => {
        await axiosInstance.delete(`todo/${rowid}`);
        let rows = [...data.filter(record => record.key !== rowid)];
        setData(rows);
      })();
    }
  };
  const doComplete = rowid => {
    if (completeRequest > 0) {
      (async () => {
        const index = data.findIndex(r => r.rowid === rowid);
        const newData = Object.assign({}, data[index]);
        newData.completed = 1;
        await axiosInstance.put(`todo/${rowid}`, newData);
        setData(data.map(r => r.rowid === rowid ? newData : r));
      })();
    }
  };
  const doChangePriority = (desc) => {
    if (desc !== null) {
      (async () => {
        const index = data.findIndex(r => r.rowid === desc.rowid);
        const newData = Object.assign({}, data[index]);
        newData.priority = desc.e.target.value;
        await axiosInstance.put(`todo/${desc.rowid}`, newData);
        setData(data.map(r => r.rowid === desc.rowid ? newData : r));
      })();
    }
  };

  useEffect(() => doDelete(deleteRequest), [deleteRequest]);
  useEffect(() => doComplete(completeRequest), [completeRequest]);
  useEffect(() => doChangePriority(priorityRequest), [priorityRequest]);

  useEffect(() => {
    if (props.data) {
      const columns = [
        {
          title: 'Content',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: 'Priority',
          dataIndex: 'priority',
          render: (text, record) => (
            record.completed != 0 ? (
              <div>{priorities[record.priority]}</div>
            ) :
              (
                <Radio.Group defaultValue={record.priority} onChange={(e) => handleChangePriority(e, record.key)} >
                  <Radio.Button value={1}>Low</Radio.Button>
                  <Radio.Button value={0}>Normal</Radio.Button>
                  <Radio.Button value={2}>High</Radio.Button>
                </Radio.Group>
              )
          ),
        },
        {
          title: 'Status',
          dataIndex: 'completed',
          render: (text, record) => (
            text == "0" ? (
              <Button type="primary" onClick={() => handleComplete(record.key)}>Complete</Button>
            ) : (
                <Tag color={'blue'}>Completed</Tag>
              )
          )
        },
        {
          title: '...',
          dataIndex: 'operation',
          render: (text, record) =>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
        }
      ];
      setColumns(columns);
      const data = props.data.map(row => ({ ...row, key: row.rowid }));
      setData(data);
    }
  }, [props.data]);

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
        <Button onClick={addNewRow} type="primary" style={{ margin: 10 }}>Add new Todo</Button>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
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
