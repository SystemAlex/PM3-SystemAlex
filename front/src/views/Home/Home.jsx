
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import canchas from "../../assets/media/images/canchas.png";
import styles from './Home.module.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); 
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Bienvenido a SportCenter</h1>
      <img 
        src={canchas} 
        alt="Canchas a SportCenter" 
        className={styles.canchas} 
      />
      <button 
        onClick={handleAuthButtonClick} 
        className={styles.authButton}
      >
        {isLoggedIn ? 'Logout' : 'Sacar Turno'}
      </button>
    </div>
  );
};

export default Home;
