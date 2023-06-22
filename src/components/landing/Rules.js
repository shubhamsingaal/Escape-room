

import 'react-multi-carousel/lib/styles.css';

import colorSharp from "../../assets/img/color-sharp.png"

export const Rules = () => {
  // eslint-disable-next-line
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
                        <p>Rules, regulations and general guidelines:</p>
                        <hr />                        
                        <span>
                          1. Participants must follow our official pages at [insta],[fb],[linkedin]
                        </span> <hr />
                        <span>
                          2. All participants must adhere to sportsman spirit, and not indulge in any unfair means to win the adventure.
                        </span> <hr />
                        <span>
                          3. Cyber-based attacks such as DDoS, Script Injection and breaking into the servers are prohibited.
                        </span> <hr />
                        <span>
                          4. Do not press F12 or open Developer Tools during the game, it will lead to disqualification, and the game will end then and there.
                        </span> <hr />  
                        <span>
                          5. Only one participation per person is allowed. Using multiple accounts to play the game is a violation of these terms.
                        </span> <hr />
                        <span>
                          6. All decisions made by judges will be final and binding.
                        </span> <hr />
                        <span>
                          7. Tip: Keep your curiosity up always and do not use ChatGPT :)
                        </span> <hr />  
                   
                    </div>

                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="something" />
    </section>
  )
}
