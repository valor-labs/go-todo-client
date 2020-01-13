import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Spin, notification } from 'antd';
import { axiosInstance } from "./connection";
import { DataTable } from './dataTable';

const { Content } = Layout;

export function AppLayout() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const content = await axiosInstance.get(`todos`);
        setData(content.data);
        setLoading(false);  
      } catch (e) {
        console.error(e);
        notification.open({message: "API issue", description: "Data reading error..."});
      }
    })();
  }, []);

  return (
    loading ? (
      <Spin tip="Loading..."></Spin>
    ) : (
        <Layout>
            <Content>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                <DataTable data={data}></DataTable>
              </div>
            </Content>
        </Layout>
      )
  );
}
