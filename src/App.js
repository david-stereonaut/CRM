import './App.scss';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './components/Container';
import { inject, observer } from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles'
import Snackbars from './components/Snackbars';

const App = inject('GeneralStore')(observer((props) => {
  return (
    <Router>
      <ThemeProvider theme={props.GeneralStore.theme} >
        <div className="App">
          <Navbar />
          <Container />
          <Snackbars />
        </div>
      </ThemeProvider>
    </Router>
  );
}))

export default App;
