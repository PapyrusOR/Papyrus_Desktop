import React from 'react'
import { Button, Layout, Typography, Space } from '@arco-design/web-react'

const { Header, Content } = Layout

export function App(): React.JSX.Element {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title heading={5} style={{ margin: 0, color: '#fff' }}>
          Papyrus Frontend
        </Typography.Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical" size="large">
          <Typography.Paragraph>
            React 19 + Arco 已初始化。后端预留：FastAPI `/api/*`。
          </Typography.Paragraph>
          <Button type="primary">OK</Button>
        </Space>
      </Content>
    </Layout>
  )
}
