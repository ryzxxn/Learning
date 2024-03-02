import './App.css';
import Player from './component/player'
import Collider from './component/collider';

function App() {
  return (
  <>
  <div className='main'>
    <Player/>
    <Collider/>
  </div>
  </>
  );
}

export default App;
