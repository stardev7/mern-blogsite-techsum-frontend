import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const avatarRef = useRef(null);
  const menuStateRef = useRef(userMenuOpen); // Track the current state with useRef
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle the user menu visibility
  const toggleUserMenu = () => {
    const newState = !userMenuOpen;
    setUserMenuOpen(newState);
    menuStateRef.current = newState; // Update the ref to reflect the new state
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  const handleClickOutside = (e) => {
    // Check if the click is outside of the menu and if the menu is open
    if(avatarRef.current && avatarRef.current.contains(e.target)) {
        return;
    }
    if (menuRef.current && !menuRef.current.contains(e.target) && menuStateRef.current) {
      setUserMenuOpen(false);
      menuStateRef.current = false; // Update the ref when the menu is closed
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="text-white shadow-md drop-shadow-md" style={{ backgroundColor: "#A67C52" }}>
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src="./assets/favion.png" className="max-w-10 rounded-xl" />
          <div className="text-xl font-semibold">Techsum Blogsite</div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div className="flex flex-col items-end">
            <p className="text-lg m-0">{user.name}</p>
            <p className="text-md text-orange-200">{user.email}</p>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:brightness-75" onClick={toggleUserMenu} ref={avatarRef}>
            <img
              src={`${process.env.REACT_APP_API_URL}/avatars/${user.avatar}`}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div
            className={`absolute top-9 right-9 bg-gray-200 min-w-20 drop-shadow-md z-10 flex flex-col text-gray-800 ${userMenuOpen ? "" : "invisible"}`}
            ref={menuRef}
            tabIndex={-1}
          >
            <div className="flex flex-row items-center ps-2 hover:bg-gray-300">
              <FontAwesomeIcon icon={faUser} />
              <a onClick={() => { toggleUserMenu(); navigate('/profile'); }} className="ps-3 pe-8 py-2">Profile</a>
            </div>
            <div className="flex flex-row items-center ps-2 hover:bg-gray-300">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <a onClick={handleLogout} className="ps-3 pe-8 py-2">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
