import { Button, Empty, Space } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const nav = useNavigate()
  return (
        <Empty
            className="box-col"
            style={{ height: '100%', justifyContent: 'center' }}
            description={
                <Space direction="vertical">
                    <div>没有发现文章哦</div>
                    <Space>
                        <Button onClick={() => nav(-1)} type="secondary">
                            上一页
                        </Button>
                        <Button onClick={() => nav('/')} type="secondary">
                            首页
                        </Button>
                    </Space>
                </Space>
            }></Empty>
  )
}
