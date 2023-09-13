import React, { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/stackoverflow-official.svg";
import search from "../../assets/search.png";
import Avatar from "../../components/Avatar/Avatar";
import Subs from '../../components/Subs/Subs.jsx'
import "./navbar.css";
import { setcurrentuser } from "../../actions/currentuser";
import decode from 'jwt-decode'
import Popup from 'reactjs-popup';
import crown from '../../assets/crown.png'
const Navbar = () => {
  
  const dispatch = useDispatch();
  const navigate= useNavigate(); 
  var User = useSelector((state) => state.currentuserreducer);
  const handlelogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/')
    dispatch(setcurrentuser(null))
  };
  useEffect(() => {
  const token = User?.token
  if (token){
      const decodedtoken = decode(token)
      if (decodedtoken.exp * 1000 < new Date().getTime()){
          handlelogout()
      }
  }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch]);
  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src= {search} alt="search" width="18" className="search-icon" />
        </form>
        {User == null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="7px"
              borderRadius="50%"
              color="white"
            >
              <Link
                to={`/Users/${User?.result._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <div>
          <Popup trigger={<button className="subscription"><img src={crown} alt="crown" /></button>} modal nested>
          {close => (
            <>
          <div className="popup-content"></div>
          <button className="close-button" onClick={() => close()}>Close</button>
          <div className="popup-inner-content"></div>
          <Subs></Subs>
          
            </>
            )}
            </Popup>
            </div>
            <button className="nav-item nav-links" onClick={handlelogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
