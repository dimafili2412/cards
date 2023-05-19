import React from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import { AboutContainer } from './About.styled';

const About = () => {
  return (
    <div>
      <PageTitle
        title="About"
        subtitle="Welcome to BizCardHub, the ultimate platform for storing and managing business cards for businesses of all sizes. Our mission is to simplify and revolutionize the way people connect with businesses by digitizing traditional business cards."
      />
      <AboutContainer>
        <h2>Our Story</h2>
        <p>
          BizCardHub was founded in 2021 by a group of tech-savvy entrepreneurs who saw the potential for innovation in the business card industry.
          With backgrounds in design, software engineering, and marketing, our team set out to create a user-friendly platform that would transform
          the way businesses and individuals share contact information.
        </p>
        <p>
          As our platform has grown, we've added features that cater to businesses of all sizes, from small startups to multinational corporations.
          Today, we are proud to serve thousands of clients around the world who trust us to manage their business cards.
        </p>
        <h2>Why Choose BizCardHub?</h2>
        <ol>
          <li>
            Easy to use: Our platform is designed with simplicity in mind, making it easy for users to upload, manage, and share their business cards.
          </li>
          <li>Environmentally friendly: By digitizing business cards, we help reduce paper waste and promote eco-friendly business practices.</li>
          <li>Accessible anytime, anywhere: Our platform is available 24/7, allowing you to access your business cards whenever you need them.</li>
          <li>
            Customizable: Personalize your digital business cards with our built-in design tools, or work with our design team to create a unique look
            for your brand.
          </li>
          <li>Secure: Your privacy is our priority. We use state-of-the-art encryption and security measures to protect your data.</li>
        </ol>
        <h2>Visit Us</h2>
        <p>
          If you'd like to learn more about BizCardHub or discuss partnership opportunities, we'd love to meet you in person. Our office is located
          at:
        </p>
        <p>
          BizCardHub
          <br />
          123 Main Street, Suite 400
          <br />
          Los Angeles, CA 90012
        </p>
        <p>Get in touch with us at contact@bizcardhub.com or give us a call at (123) 456-7890. Our team is always happy to help!</p>
      </AboutContainer>
    </div>
  );
};

export default About;
