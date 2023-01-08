import 'antd/dist/reset.css'
import { Suspense, useEffect } from 'react'
import { Layout } from 'antd'
import { Sidebar } from '@renderer/widgets/Sidebar'
import { AppRouter } from './providers/router'

function App(): JSX.Element {
  const { ipcRenderer } = window.electron
  // Получение путей для понимания куда класть файл БД
  useEffect(() => {
    const getPaths = async () => {
      const response = await ipcRenderer.invoke('getPath')
      console.log(response)
    }
    getPaths()
  }, [])

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
