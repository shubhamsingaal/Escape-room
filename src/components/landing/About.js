import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../../assets/img/project-img1.png";
import projImg2 from "../../assets/img/project-img2.png";
import projImg3 from "../../assets/img/project-img3.png";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const  About = () => {

  const projects = [
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="about">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Other Highlights</h2>
                  <p>
                    Get your boots on, wear your hat and be ready for the ultimate spirit-captivating adventure but wait! There's more thrill awaiting you. Panorama 2023 is a host of other events including:
                    <br /><br />
                    <span>1. Enigma</span>
                    <br />
                    <span>2. Speakers Event</span>
                    <br />
                    <span>3. The Dreamers' Canvas</span>
                    <br />
                    <span>4. Acrostic</span>
                    <br />
                    <span>5. Adventure Alcove</span>
                    <br />
                    <span>6. Space Odyssey</span>
                    <br />
                    <span>7. Code Sprint</span>
                    <br />
                    
                
                  </p>
        
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" alt="something" src={colorSharp2}></img>
    </section>
  )
}
