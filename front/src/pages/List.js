import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Cards from '../components/Cards'

import 'bootstrap/dist/css/bootstrap.min.css'

function list() {
  return (
    <div className="list">
      <Navbar />
      <Cards />
      <Footer />
    </div>
  );
}

export default list;
