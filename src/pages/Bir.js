import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { parse_query, to_title } from "../assets/js/utils/functions";
import Dash_header from "../components/dash_header";
import Padder from "../components/padder";
import { Loggeduser } from "../Contexts";
import Footer, { get_session, scroll_to_top } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import Loadindicator from "../components/loadindicator";
import { get_request } from "../assets/js/utils/services";
import Operators from "../components/operators";
import Small_btn from "../components/small_btn";

let tabs = new Array("operators");

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { panel: tabs[0] };
  }

  componentDidMount = async () => {
    if (!this.loggeduser) {
      let { u, tab, _id } = parse_query();

      u = await get_request(`bir/${u || _id}`);

      if (u?._id) {
        this.setState({
          bir: u,
          panel: tab || this.state.panel,
        });
        this.set_loggeduser(u?.user);
      } else window.location.assign(client_domain);
    }

    scroll_to_top();
  };

  set_panel = (panel) => this.setState({ panel });

  render() {
    let { panel, tab, bir } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, set_loggeduser }) => {
          this.loggeduser = loggeduser;

          this.set_loggeduser = set_loggeduser;
          if (!loggeduser) return <Loadindicator />;

          return (
            <div id="main-wrapper">
              <Custom_Nav page="vendor" />
              <Padder />

              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3 col-md-3">
                      <div className="dashboard-navbar">
                        <Dash_header
                          user={loggeduser}
                          tab={tab}
                          set_panel={this.set_panel}
                        />
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12">
                      <Padder height={40} />
                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 pb-4">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {to_title(panel)}
                              </li>
                            </ol>
                          </nav>
                          <Small_btn
                            title="Add Operator"
                            action={this.add_operator}
                          />
                        </div>
                      </div>
                      {panel === tabs[0] ? (
                        <Operators bir={bir} style={{ padding: 0 }} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Profile;
export { tabs };
