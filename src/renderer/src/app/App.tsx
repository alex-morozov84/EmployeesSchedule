import 'antd/dist/reset.css'
import { Suspense, useEffect } from 'react'
import { Layout } from 'antd'
import { Sidebar } from '@renderer/widgets/Sidebar'
import { AppRouter } from './providers/router'
import { useUserActions } from '@renderer/entities/User'

function App(): JSX.Element {
  const { ipcRenderer } = window.electron
  const { reauth } = useUserActions()

  // Получение путей для понимания куда класть файл БД
  useEffect(() => {
    const getPaths = async () => {
      const response = await ipcRenderer.invoke('getPath')
      console.log(response)
    }
    getPaths()

    // Авторизация, если в LS уже есть данные о пользователе
    const user = localStorage.getItem('user')
    if (user) {
      reauth(JSON.parse(user))
    }
    // eslint-disable-next-line
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
