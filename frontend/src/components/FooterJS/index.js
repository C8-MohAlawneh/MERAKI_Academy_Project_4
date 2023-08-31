import { Avatar } from "antd";
import React from "react";

const FooterJS = () => {
  return (
    <div className="footer-basic">
      <Avatar src="https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg?w=360" />
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJRttpSHhHKRIMs1AI-DhQ0JgaBrciSQaFhIewLiWnhQ&s" />
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjd4XLS-dUuBJRuWiCKzxhWt0mmonI-K9Z9wfgZMwg&s" />
      <Avatar src="https://thumbs.dreamstime.com/z/snapchat-application-chat-icon-vector-image-can-also-be-used-social-media-logos-suitable-mobile-apps-web-apps-print-82111543.jpg" />
      <footer>
        <ul className="list-inline" style={{ listStyleType: "none" }}>
          <li className="list-inline-item">
            <a href="#">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="#">About</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">Mohammad Alawneh © 2023</p>
      </footer>
    </div>
  );
};

export default FooterJS;
