import meter1 from "../../assets/img/meter1.svg";
import meter2 from "../../assets/img/meter2.svg";
import meter3 from "../../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../../assets/img/arrow1.svg";
import arrow2 from "../../assets/img/arrow2.svg";
import colorSharp from "../../assets/img/color-sharp.png"

export const Rules = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="rules">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Rules</h2>
                        <p>You need to follow the given rules<br></br> if your want to win prizes</p>
                        <hr />

              
               <span>1. You are not locked in. If you need to leave at any time, you can come out the door you came in.</span> <hr />
              <span>2. All phones need to be left outside the room on the table. Coats and purses can be as well.</span> <hr />
              <span>3. You have 60 minutes to escape. We will take a picture, win or lose, and share it on our social media pages.</span> <hr />
              <span>4. What you hear or see, leave here; do not share any puzzles, hints or clues. Share the fun, but don’t spoil the fun for others!</span> <hr />  
                   
                    </div>

                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
