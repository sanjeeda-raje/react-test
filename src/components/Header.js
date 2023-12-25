import React from 'react'
import { BsChevronLeft } from "react-icons/bs";


const Header = (props) => {
    const {audienceTitle} = props
  return (
    <div>
        <nav className="navbar bg-blue py-3">
  <div className="container-fluid">
  <h4 className='navbar-brand  d-flex align-items-center mb-0 text-white'><BsChevronLeft className='me-3'/> {audienceTitle}</h4>
  </div>
</nav>
      <div>
        
      </div>
    </div>
  )
}

export default Header
