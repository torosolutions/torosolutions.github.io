import React from 'react';
import MainLayout from '../components/templates/MainLayout';
import Hero from '../components/organisms/Hero';
import About from '../components/organisms/About';
import Services from '../components/organisms/Services';
import Contact from '../components/organisms/Contact';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Services />
      <Contact />
    </MainLayout>
  );
};

export default Home;
