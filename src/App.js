import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchCity from './Components/SearchCity';
import { Container } from 'react-bootstrap';
import Search from './Components/Search';

function App() {
  return (
    <Container>
      {/* <SearchCity /> */}
      <Search />
    </Container>
    
    );
}

export default App;
