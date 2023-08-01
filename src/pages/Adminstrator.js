import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Padder from "../components/padder";
import { Logged_admin } from "../Contexts";
import Admin_login from "../sections/dashboard/admin_login";
import Dashboard_navbar from "../sections/dashboard/dashboard_navbar";
import Manage_testimonials from "../sections/dashboard/manage_testimonials";
import Pending_reviews from "../sections/dashboard/pending_reviews";
import Settings from "../sections/dashboard/settings";
import Video_reviews from "../sections/dashboard/video_reviews";
import Footer, { scroll_to_top } from "../sections/footer";
import Nav from "../sections/nav";
import { emitter } from "../Sweet";
import Dashboard from "../sections/dashboard/dashboard";
import Manage_articles from "../sections/dashboard/manage_articles";
import New_article from "../sections/dashboard/new_article";
import Unverified_operators from "../sections/dashboard/unverified_operators";
import D_operators from "../sections/dashboard/d_operators";

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "dashboard",
    };
  }

  componentDidMount = () => {
    document.title = `Dashboard | ${organisation_name}`;

    this.dash_nav_click = (nav_title) =>
      this.setState({ current_nav: nav_title }, scroll_to_top);

    emitter.listen("dash_nav_click", this.dash_nav_click);

    let logged_admin = window.sessionStorage.getItem("logged_admin");
    if (logged_admin) {
      logged_admin = JSON.parse(logged_admin);
      this.log_admin(logged_admin);
    }
  };

  componentWillUnmount = () => {
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
  };

  nav_et_component = () =>
    new Object({
      dashboard: <Dashboard />,
      manage_testimonials: <Manage_testimonials />,
      pending_testimonies: <Pending_reviews />,
      video_reviews: <Video_reviews />,
      manage_articles: <Manage_articles />,
      new_article: <New_article />,
      unverified_operators: <Unverified_operators />,
      operators: <D_operators />,
      settings: <Settings />,
    });

  render() {
    let { current_nav } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged, log_admin }) => {
          this.log_admin = log_admin;

          return admin_logged ? (
            <div id="main-wrapper">
              <Nav page="dashboard" />
              <Padder />
              <div className="clearfix"></div>
              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <Dashboard_navbar admin={admin_logged} />
                    {this.nav_et_component()[current_nav] || null}
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          ) : (
            <Admin_login log_admin={log_admin} />
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Adminstrator;
