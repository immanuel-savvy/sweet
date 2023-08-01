import React from "react";
import { Carousel } from "react-bootstrap";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import { Loggeduser } from "../Contexts";
import Donations from "../sections/donations";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Live_training from "../sections/live_training";
import Nav from "../sections/nav";
import Testimonials from "../sections/testimonials";
import Vision_mission_stuff from "../sections/vision_mission_stuff";
import Who_we_are from "../sections/who_we_are";
import Articles from "../sections/articles";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }

  componentDidMount = () => {
    let heros = new Array({
      main_text: "",
      sub_text: "",
      bg: require("../assets/img/hero1.jpg"),
    });

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;
    let { entry } = this.props;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Nav page="" />
              <div className="body">
                {entry || heros ? (
                  <div
                    style={{
                      backgroundImage: `url(${require("../assets/img/hero1.png")})`,
                    }}
                  >
                    <Carousel fade nextLabel="" prevLabel="" indicators={false}>
                      {(entry?.banners || heros).map((hero, index) => (
                        <Carousel.Item>
                          <Hero_banner hero={hero} key={index} />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <Loadindicator />
                )}

                {entry ? (
                  <>
                    <Who_we_are home about={entry.about} />

                    <Vision_mission_stuff gray details={entry.vision} />

                    <Vision_mission_stuff reverted details={entry.mission} />
                  </>
                ) : (
                  <Loadindicator />
                )}

                <Donations />

                <Testimonials />

                <Live_training />

                <Articles />

                <Contact_us />
              </div>
              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Home;
