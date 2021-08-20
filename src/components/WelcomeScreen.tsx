import { motion } from 'framer-motion';
import React from 'react';
import { Button } from 'react-bootstrap';
import submitContext from '../context/submit-context';
import Logo from '../icon-512.png';

function WelcomeScreen() {
  const { setWelcome } = React.useContext(submitContext);

  const initial = {
    y: 150,
    opacity: 0,
  };

  const animate = {
    y: 0,
    opacity: 1,
  };

  return (
    // <section id="intro-section">
    <div className="intro fade-in">
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ type: 'spring', duration: 1.5 }}
      >
        <img className="logo grow" src={Logo} alt="logo"></img>
      </motion.div>

      <motion.h3
        initial={initial}
        animate={animate}
        transition={{ type: 'spring', duration: 2, delay: 0.8 }}
      >
        The Flexible Student Budget Calculator
      </motion.h3>
      <motion.h3
        initial={initial}
        animate={animate}
        transition={{ type: 'spring', duration: 2, delay: 1 }}
      >
        How much <span className="gold">cash</span> can you
        <span className="blue"> splash</span>?
      </motion.h3>

      <motion.div
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.8, delay: 1.6 }}
        className="enter"
      >
        <Button onClick={() => setWelcome(false)}>Get started</Button>
      </motion.div>
    </div>
    // </section>
  );
}

export default WelcomeScreen;
