import './App.css';
import {
  Routes,
  Route,
  Link,

} from "react-router-dom"
import ListingsList from './components/ListingsList';
import AddListing from './components/AddListing';

function App() {
  const baseUrl = "/listingsAndReviews/v1";

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href={`${baseUrl}/listings`} className='navbar-brand'>Airbnb Listings</a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={`${baseUrl}/listings`} className='nav-link'>Listings</Link>
          </li>
          <li className='nav-item'>
            <Link to={`${baseUrl}/listings/create`} className='nav-link'>Add Lisitng</Link>
          </li>
        </div>
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route exact path={`${baseUrl}/listings`} element={<ListingsList/>}/>
          <Route exact path={`${baseUrl}/listings/create`} element={<AddListing/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
