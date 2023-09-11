import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getText } from '../../../utils/api';
import { PassListContext } from '../App';


export default function Header(props) {
  const { setResort, resort, setPass, pass, setLoggedIn, loggedIn } = props;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const passList = useContext(PassListContext)

  useEffect(() => {
  }, [loggedIn]); 

  function handlePassClick(pass, resort) {
    setResort(resort);
    setPass(pass);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleLogout() {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
    navigate('/');

  }
  function getPasses() {

  }
   
  function buildPassDropdown(passes, resort) {
    let passDropDown = passList.map((pass) => {
      return (
        <option
          key={pass}
          value={pass}
        >
          {getText(pass)}
        </option>
      );
    })
    return passDropDown;
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 min-w-[400px]">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Disney Reservation Checker</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                onClick = {() => toggleMenu()}
                >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {menuOpen && ( // Show the menu when menuOpen is true
      <div className="w-full block lg:hidden">
        <div className="text-sm">
          <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Calendar View
          </a>
          {loggedIn && (
            <>
              <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Profile
              </a>
              <select 
                onChange={(e) => setPass(e.target.value)} 
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 bg-blue-400 border border-teal-200 rounded px-2 py-1">
                <option> Select Your Annual Pass </option>
                {buildPassDropdown(getPasses(), resort)} 
                
              </select>
              <a onClick={() => handleLogout()} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Logout
              </a>
            </>
          )}
          {!loggedIn && (
            <>
              <a href="/auth/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Login
              </a>
              <a href="/auth/signup" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Signup
              </a>
            </>
          )}
        </div>
      </div>
      
    )}
    
    <div className="hidden w-full lg:flex flex-grow lg:items-center lg:w-auto">
  <div className="text-sm lg:flex-grow">
    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      Calendar View
    </a>
    {loggedIn && (
      <>
        <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Profile
        </a>
        <select onChange={(e) => setPass(e.target.value)}  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 bg-transparent border border-teal-200 rounded px-2 py-1">
          <option> Select Your Annual Pass </option>
          {buildPassDropdown(getPasses(), resort)} 
          
        </select>
        <a onClick={() => handleLogout()} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Logout
        </a>
      </>
    )}
    {!loggedIn && (
      <>
        <a href="/auth/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Login
        </a>
        <a href="/auth/signup" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Signup
        </a>
      </>
    )}
  </div>
</div>

      


  
    </nav>
  );
}