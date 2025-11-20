import React, { useState } from "react";
import { navLinks, styles } from "../assets/dummyadminn";
import { Link } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {

  const [menuOpen ,  setMenuOpen] = useState(false)

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <GiChefToque className={styles.logoIcon} />
          <span className={styles.logoText}>Admin Panel</span>
        </div>

      <button onClick={() => setMenuOpen(!menuOpen)}
      className={styles.menuButton}>
     {menuOpen ? <fix /> : <FiMenu /> }


      </button>
     <div className={styles.desktopMenu}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`${styles.navLinkBase} ${styles.navLinkInactive}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

      </div>

       {/* FOR MOBILE VIEW */}

       {menuOpen && (
        <div className={styles.mobileMenu}>
       {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`${styles.navLinkBase} ${styles.navLinkInactive}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}




        </div>


       )}






    </nav>
  );
};

export default Navbar;
