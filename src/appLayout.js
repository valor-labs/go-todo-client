import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { useStore } from './store';
import { Layout, Menu, notification, Spin, Avatar, Button, Row, Col, Card, Popconfirm } from 'antd';
import { axiosInstance } from "./connection";
import { DataTable } from './dataTable';

const { Content, Footer, Sider } = Layout;

export function AppLayout() {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const addTodo =() => {};

  useEffect(() => {
    (async () => {
      // setDataLoading(true);
      const content = await axiosInstance.get(`todos`);
      console.log(content);
      setColumns([
        {
          title: 'Content',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: 'Completed',
          dataIndex: 'completed',
          key: 'completed',
        },
      ]);
      setData(content.data);
      /*setColumns(content.data.columns);
      setData(content.data);
      setDataLoading(false);*/
    })();
  }, []);

  return (
    loading ? (
      <Spin tip="Loading..."></Spin>
    ) : (
        <Layout>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                <DataTable columns={columns} data={data}></DataTable>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}> </Footer>
          </Layout>
        </Layout>
      )
  );
}
