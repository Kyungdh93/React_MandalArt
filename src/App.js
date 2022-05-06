import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import { Route, BrowserRouter, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" exact={true} element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
