import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Driver_overview from "../components/driver_overview";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import Driver_header from "../components/driver_header";
import Driver_sidebar from "../components/driver_sidebar";

class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let driver = get_session("driver");
    let operator = get_session("operator");

    if (!driver) {
      let href = window.location.href.split("/").slice(-1);

      let details = await get_request(`driver_page/${href[0]}`);

      driver = details?.driver;
      operator = details?.operator;
    }

    if (driver)
      document.title = `${to_title(driver.fullname)} | ${organisation_name}`;
    else return window.history.go(-1);

    this.setState({ driver, operator });
  };

  on_transfer = () => this.setState({ transferred: true });

  on_redeem = () => this.setState({ redeemed: true });

  render() {
    let { driver, operator, transferred, redeemed } = this.state;
    if (!driver) return <Loadindicator />;

    if (transferred) driver.state = "transferred";
    if (redeemed) driver.state = "redeemed";

    return (
      <div>
        <Custom_Nav page="driver" />
        <Padder />

        <Driver_header driver={driver} operator={operator} />

        <section class="gray pt-5">
          <div class="container">
            <div class="row">
              <Driver_overview driver={driver} operator={operator} />

              <Driver_sidebar driver={driver} operator={operator} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Driver;
