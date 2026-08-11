import React from 'react';
import Hero from '../components/organisms/Hero';
import About from '../components/organisms/About';
import Services from '../components/organisms/Services';
import Contact from '../components/organisms/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Contact />
    </>
  );
};

export default Home;
