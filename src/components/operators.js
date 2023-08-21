import React from "react";
import Operator from "./operator";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import { get_request } from "../assets/js/utils/services";

class Operators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    const operators = await get_request("operators/all");
    this.setState({ operators });
  };

  render() {
    let { bir } = this.props;
    let { operators } = this.state;

    return (
      <section className="min">
        <div className="">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <p className="text-white">Operators</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {operators ? (
              operators.length ? (
                operators.map((operator) => (
                  <Operator operator={operator} bir={bir} key={operator._id} />
                ))
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Operators;
