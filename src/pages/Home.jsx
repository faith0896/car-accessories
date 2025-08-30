import { useEffect, useState } from "react";
import Home1 from "../Images/Home1.jpg";
import Home2 from "../Images/Home2.jpg";

export default function Home() {
  const images = [Home1, Home2];
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      
      <div
        className="home-container"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="overlay">
          <h1>
            Welcome to <span className="highlight">Car Accessories Store</span>
          </h1>
          <p>
            Shop premium car accessories at unbeatable prices — style and
            performance for your ride!
          </p>
        </div>
      </div>

      
      <div className="about-section">
        
        <div className="about-left">
          <h2>About Our Company</h2>
          <p>
            At <span className="highlight">Car Accessories Store</span>, we are
            passionate about helping car lovers upgrade their vehicles with the
            best accessories on the market. From stylish interiors to performance
            enhancers, we provide quality products that combine durability,
            functionality, and design. <br /> <br />
            Our mission is simple — to deliver accessories that make your driving
            experience safer, more enjoyable, and uniquely yours.
          </p>
        </div>

        
        <div className="about-right">
          <h2>Contact Us</h2>
          <p>Email: support@caraccessories.com</p>
          <p>Phone: +27 82 123 4567</p>
          <p>Location: Cape Town, South Africa</p>

          
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <style>
        {`
        
          .home-container {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 100vh;
            width: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            transition: background-image 1s ease-in-out;
          }

          /* Dark overlay for text readability */
          .overlay {
            background: rgba(0, 0, 0, 0.5);
            padding: 40px;
            border-radius: 12px;
          }

          .home-container h1 {
            font-size: 3rem;
            font-weight: bold;
            color: #fff;
            text-shadow: 2px 2px 6px rgba(0,0,0,0.7);
          }

          .highlight {
            color: #ffcc00;
          }

          .home-container p {
            font-size: 1.5rem;
            color: #f1f1f1;
            margin-top: 15px;
            max-width: 700px;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
          }

          /* About Section */
          .about-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            background-color: #000;
            color: #fff;
            padding: 60px 40px;
            gap: 40px;
            flex-wrap: wrap;
          }

          .about-left, .about-right {
            flex: 1;
            min-width: 300px;
          }

          .about-left h2, .about-right h2 {
            font-size: 2rem;
            font-weight: bold;
            color: #ffcc00;
            margin-bottom: 20px;
          }

          .about-left p, .about-right p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #f1f1f1;
          }

          /* Add border for Contact Us section */
          .about-right {
            border-left: 3px solid #ffcc00;
            padding-left: 20px;
          }

          /* Social Icons */
          .social-icons {
            margin-top: 20px;
          }

          .social-icons a {
            display: inline-block;
            margin: 0 10px;
            color: #fff;
            font-size: 1.5rem;
            transition: color 0.3s ease;
          }

          .social-icons a:hover {
            color: #ffcc00;
          }
        `}
      </style>
    </>
  );
}




