import 'antd/dist/reset.css'
import { Suspense } from 'react'
import { Layout } from 'antd'
import { Sidebar } from '@renderer/widgets/Sidebar'
import { AppRouter } from './providers/router'

function App(): JSX.Element {
  return (
    <Suspense fallback="">
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <AppRouter />
      </Layout>
    </Suspense>
  )
}

export default App
