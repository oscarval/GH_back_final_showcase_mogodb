import React from "react";
import "./Footer.scss";

const Footer = (props) => {
  return (
    <div className='Footer'>
      <footer>
        <div className='footer-container-1'>
          <div className='column'>Author: Alexis Valdez</div>
          <div className='column'>GeeksHubs backend final practice</div>
          <div className='column'>
            <a
              href='https://github.com/oscarval/GH_back_final_showcase_mongodb'
              target='_blank'>
              Github
            </a>
          </div>
        </div>
        <div className='footer-container-2'>
          Iconos diseñados por &nbsp;
          <a href='https://www.flaticon.es/autores/turkkub' title='turkkub'>
            turkkub
          </a>
          &nbsp; from &nbsp;
          <a href='https://www.flaticon.es/' title='Flaticon'>
            www.flaticon.es
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
