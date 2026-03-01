import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store';
import App from './App.tsx'
import { Provider } from 'react-redux'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
