import './scss/app.scss';
import Container from './components/Container';

function App() {
  return (
    <div className="App">
      <div className="loader">
        <h1 id="h1">Падажжи, грузится...</h1>
      </div>
      <Container />
    </div>
  );
}

export default App;
