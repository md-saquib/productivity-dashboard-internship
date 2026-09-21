import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './app/Routers/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './app/store'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <AppRoutes />
  </Provider>

)
