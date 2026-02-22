import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from './store/store.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Toaster} from 'react-hot-toast'
import { GlobalContext } from './context/GlobalContext.tsx'
const queryClient=new QueryClient()
createRoot(document.getElementById('root')!).render(
 
    <BrowserRouter>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <GlobalContext>
                  <Toaster position='top-center' reverseOrder={false}/>
          <App/>
              </GlobalContext>
        </Provider>
        </QueryClientProvider>
      </CookiesProvider>
    </BrowserRouter>
)
