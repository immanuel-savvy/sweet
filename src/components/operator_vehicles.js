import React from "react";
import Vehicle from "./vehicle";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import { post_request } from "../assets/js/utils/services";

class Operator_vehicles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { operator } = this.props;
    let vehicles = await post_request("vehicles", { operator: operator?._id });
    this.setState({ vehicles });
  };

  render() {
    let { toggle, assign } = this.props;
    let { vehicles } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">
              {assign ? "Select Vehicle" : "Vehicles"}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <div className="row">
                {vehicles ? (
                  vehicles.length ? (
                    vehicles.map((vehicle) => (
                      <Vehicle
                        assign={assign}
                        full
                        vehicle={vehicle}
                        key={vehicle._id}
                      />
                    ))
                  ) : (
                    <Listempty />
                  )
                ) : (
                  <Loadindicator />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Operator_vehicles;
