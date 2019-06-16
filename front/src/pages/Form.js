import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Form from '../components/Form'

import 'bootstrap/dist/css/bootstrap.min.css'

function form() {
  return (
    <div className="form">
      <Navbar />
      <Form />
      <Footer />
    </div>
  );
}

export default form;
