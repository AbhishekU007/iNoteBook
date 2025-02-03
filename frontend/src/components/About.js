import React from 'react';

const About = () => {
  return (
    <div className='container'>
      <div className="about-section">
        <h1>About Us</h1>
        <p>About who I am and what I do.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col">
            <div className="container">
              <h2 className="text-center">Abhishek Upadhyay</h2>
              <p className="title text-center">Aspiring Software Engineer</p>
              <p >I'm a passionate B.Tech student majoring in AI/ML, with a deep interest in coding and problem-solving. I love learning new technologies and I continue to explore more and more of them every day.
              In addition to my academic pursuits, I am always working on personal projects, trying to build something meaningful and innovative. I value simplicity in code and prefer to keep things easy, short, and efficient.<br/><br/>
              Outside of coding, Outside of coding, I’m a fun-loving individual who enjoys exploring new places and experiencing different cultures. Traveling allows me to unwind and recharge while discovering the beauty of the world.
              Whether it’s a spontaneous weekend getaway or a long vacation, I believe that travel not only broadens the mind but also brings a sense of adventure and excitement to life. Balancing my passion for coding with my love for travel helps me maintain a positive and vibrant lifestyle.
              </p>
              <a href='mailto:abhishekupadhyay0007@gmail.com'><button className="button">Contact</button></a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
