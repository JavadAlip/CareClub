import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed top-0 w-full h-[80px] flex justify-between items-center px-4 bg-white text-[#038112]">
      <img src="/logo.png" alt="Logo" className="w-[120px] h-[80px] mr-auto" />
      <div className="hidden md:flex items-center justify-center flex-grow">
        <ul className="flex space-x-4">
          <li>
            <Link to="home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="skills" smooth={true} duration={500}>
              Events
            </Link>
          </li>
          <li>
            <Link to="projects" smooth={true} duration={500}>
              Get Involved
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <button className="hidden md:block bg-[#038112] text-white px-4 py-2 rounded-full ml-auto">
        Donate
      </button>
      <div onClick={handleClick} className="md:hidden z-10 p-2 rounded text-[#038112]">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      <ul className={`${!nav ? 'hidden' : 'absolute top-[80px] left-0 w-full h-screen bg-[#038112] flex flex-col items-center justify-center text-white'}`}>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="skills" smooth={true} duration={500}>
            Events
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="projects" smooth={true} duration={500}>
            Get Involved
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="contact" smooth={true} duration={500}>
            Contact
          </Link>
        </li>
       
      </ul>
    </div>
  );
};

export default Navbar;