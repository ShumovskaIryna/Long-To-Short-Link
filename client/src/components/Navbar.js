import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper cyan darken-4" style={{ padding: '0 2rem' }}>
        <span className="brand-logo left">Make it shorter</span>
        <ul id="nav-mobile" className="right">
          <li><NavLink to="/create">+ New link</NavLink></li>
          <li><NavLink to="/links">My links</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Log out</a></li>
        </ul>
      </div>
    </nav>
  )
}
