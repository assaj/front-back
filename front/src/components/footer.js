import React from 'react';

function footer() {
  return (
    <div>
      <h5>
          This application is running using nodeJs as the back-end api, and reactJs to front-end.
          Cand perform the 4 main operations(create, read, update, delete )
      </h5>
      <h6>
        rules:<br/>
        name needs to have at lest 2 letters<br/>
        salary needs to be a non negative number<br/>
        description needs to have between 5 and 50 letters<br/>
        Photo needs to be png format<br/>
      </h6>
    </div>
  );
}


export default footer;

