import React from "react";
import { get_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Operator from "../../components/operator";

class Unverified_operators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let operators = await get_request("unverified_operators");

    this.setState({ operators });
  };

  on_verify = (operator) => {
    let { operators } = this.state;

    operators = operators.filter((v) => v._id !== operator._id);
    this.setState({ operators });
  };

  render() {
    let { operators } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="unverified operators" />
        <div className="row">
          {operators ? (
            operators.length ? (
              operators.map((operator) => <Operator operator={operator} />)
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Unverified_operators;
