import { nanoid } from 'nanoid'
import './App.css'
import { Page } from './Page/Page'
import { AppStateProvider } from './state/AppStateContext'
import { createPage } from './utils/createPage';



const initialState = createPage();

function App() {

  return (
    <AppStateProvider initialState={initialState}>
      <div className="App">
        <Page />
      </div>
    </AppStateProvider>
  )
}

export default App
