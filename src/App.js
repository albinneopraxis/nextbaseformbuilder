import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Banner from './components/Banner';
import FormList from './components/FormList';


function App() {
  return (
    <Router>
      <Banner />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/form-list" element={<FormList />} />
      </Routes>
    </Router>
  );
}

export default App;
