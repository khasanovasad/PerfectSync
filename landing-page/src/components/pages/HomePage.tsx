import React from 'react';
import CallToAction from '../CallToAction';
import Features from '../Features';
import Hero from '../Hero';
import Layout from '../Layout';
import Team from '../Team';

const HomePage: React.FC = () => (
  <Layout>
    <Hero />
    <Features />
    <Team />
    <CallToAction />
  </Layout>
);

export default HomePage;
