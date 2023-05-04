import React, { useState } from 'react';

export default function Nav(){
  const [loggedIn, setLoggedIn] = useState(false)
  let navMenu = ''
  if (loggedIn) {
    navMenu = 
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="active"><a href="/">Resorts</a></li>
            <li><a href="/users/:id">Profile</a></li>
            <li><a href="/logout"> Logout</a></li>
          </ul>
  } else {
    navMenu =
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="active"><a href="/">Resorts</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
  }

return (
  <div class="container-fluid">    
  <div class="navbar-brand">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>                     
        </button>
        <a class="navbar-brand" href="#">Disney Reservation Checker</a>
  </div>
  <div class="collapse navbar-collapse" id="myNavbar">
        {navMenu}
  </div>
</div>

  
)
}