
import { AppBar } from './components/AppBar/component'
import { Intro } from './components/Intro/component'
import { Footer } from './components/footer/component'
import { Future } from './components/future/component'
import { FutureBottom } from './components/future_bottom/component'
import { State } from './components/state/component'

function App() {

  return (
    <>
      <AppBar />
      <Intro />
      <Future />
      <State />
      <FutureBottom />
      <Footer />
      <div id="popover-container"/>
    </>
  )
}

export default App
