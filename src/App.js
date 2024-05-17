import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReviewList from './Components/ReviewList';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
    <h1>Reviews</h1>
      <ReviewList />
    </>
  );
}

export default App;
