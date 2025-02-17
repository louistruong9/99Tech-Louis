
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Home from './pages/Home';

import './App.css'
import './index.css';

function App() {
  return (
      <div className="card">
        <div className='flex justify-center'>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <Home />
      </div>
  )
}

export default App
