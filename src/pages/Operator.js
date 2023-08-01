import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Nav from "../sections/nav";
import { to_title } from "../assets/js/utils/functions";
import { client_domain, organisation_name } from "../assets/js/utils/constants";
import Text_btn from "../components/text_btn";
import Drivers from "../components/drivers";
import Operator_header from "../components/operator_header";

class Operator_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get_operator = async (operator) => {
    let vendor_id = window.location.href.split("?");
    if (vendor_id[1])
      operator = operator || (await get_request(`operator/${vendor_id[1]}`));

    if (!operator) return window.history.go(-1);

    document.title = `${to_title(
      `${operator.user.firstname} ${operator.user.lastname}`
    )} | ${organisation_name}`;

    this.setState({ operator });
  };

  componentDidMount = async () => {
    let operator = get_session("operator");

    await this.get_operator(operator);
  };

  render() {
    let { operator } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Nav page="operator" />
              <Padder />

              {!operator || typeof operator !== "object" ? (
                <Loadindicator contained />
              ) : (
                <>
                  <Operator_header
                    loggeduser={loggeduser}
                    operator={operator}
                  />

                  <div className="container">
                    <div className="row align-items-center mb-5">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {operator.verified ? (
                          <Drivers
                            loggeduser={loggeduser}
                            operator={operator}
                          />
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <Text_btn
                              text="go home"
                              action={() =>
                                window.location.assign(client_domain)
                              }
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "bold",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Operator_profile;
