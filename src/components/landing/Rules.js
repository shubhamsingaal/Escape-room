import { useNavigate } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

import colorSharp from "../../assets/img/color-sharp.png"

export const Rules = () => {
  const navigate = useNavigate()
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
                          1. Participants must follow our official pages at <a href="https://www.instagram.com/istenitdgp/">Instagram</a>, <a href="https://www.facebook.com/istenitdgp/">Facebook</a>, <a href="https://www.linkedin.com/company/istenitdgp/">LinkedIn</a>
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
                        <span>
                          8. Best played on Laptop/PC. This game is not optimized for small screen devices.
                        </span> <hr />
                        <span>
                          9. Click on the character to view question. Answer the question, and press enter to submit.
                        </span> <hr /> 
                        <span>
                          10. Each incorrect attempt will lead to lesser score on correct answer, there is no negative marking in the game.
                        </span> <hr /> 
                        <span>
                          11. You can only play this game once. If you answer any questions, then complete it in one shift. You can re-attempt if you couldn't answer a single question.
                        </span> <hr /> 
                    </div>
                    <center>
                      <button onClick={()=>navigate("/auth")} className="btn btn-primary text-center">
                        Play Game
                      </button>
                    </center>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="something" />
    </section>
  )
}
