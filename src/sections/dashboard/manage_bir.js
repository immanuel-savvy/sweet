import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Bir from "../../components/bir";
import Add_bir from "./add_bir";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_bir extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let birs = await get_request("birs");

    this.setState({ birs });
  };

  toggle_add_sponsor = () => this.bir?.toggle();

  on_add = (bir) => {
    let { sponsor_in_edit, birs } = this.state;

    if (sponsor_in_edit) birs = birs.map((s) => (s._id === bir._id ? bir : s));
    else birs = new Array(bir, ...birs);

    this.setState({ birs });
  };

  edit = (bir) => {
    this.setState({ sponsor_in_edit: bir }, this.toggle_add_sponsor);
  };

  remove = async (bir) => {
    if (!window.confirm("Are you sure to remove bir?")) return;
    let { birs } = this.state;

    birs = birs.filter((s) => s._id !== bir._id);
    this.setState({ birs });

    await post_request(`remove_sponsor/${bir._id}`);
  };

  render() {
    let { birs, sponsor_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage birs"
          right_btn={
            <Small_btn title="Add Bir" action={this.toggle_add_sponsor} />
          }
        />
        <div className="row justify-content-center">
          {birs ? (
            birs.length ? (
              birs.map((bir) => (
                <Bir
                  remove={() => this.remove(bir)}
                  edit={() => this.edit(bir)}
                  bir={bir}
                  key={bir._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(bir) => (this.bir = bir)}>
          <Add_bir
            bir={sponsor_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_sponsor}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_bir;
