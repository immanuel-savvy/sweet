import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import {
  email_regex,
  special_chars,
  to_title,
} from "../assets/js/utils/functions";
import { get_request, post_request } from "../assets/js/utils/services";
import Checkbox from "../components/checkbox";
import File_input from "../components/file_input";
import Form_divider from "../components/form_divider";
import handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Text_input from "../components/text_input";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Nav from "../sections/nav";
import Listempty from "../components/listempty";

const means_of_id = new Array(
  "international_passport",
  "driver_license",
  "national_id",
  "voters_card"
);

const categories = new Array(
  "Digital service",
  "Education",
  "Entertainment",
  "Construction and Engineering",
  "Travel and Tourism",
  "Housing",
  "Groceries",
  "Electronics",
  "Household Item",
  "Clothing and Fashion",
  "Event and Movies",
  "Spa and Relaxation",
  "Transport",
  "Health",
  "Financial",
  "Business Services",
  "Cooperate service",
  "Artisan service"
)
  .sort((a, b) => a > b)
  .map((cat) => new Object({ _id: cat, title: cat }));

class Become_an_operator extends handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      director: new Object(),
    };
  }

  set_director = (loggeduser) => {
    loggeduser = loggeduser || this.loggeduser;

    this.setState({
      director: {
        email: loggeduser.email,
        firstname: loggeduser.firstname,
        lastname: loggeduser.lastname,
      },
    });
  };

  componentDidMount = async () => {
    let loggeduser = get_session("loggeduser");

    if (!loggeduser) {
      let search = window.location.search.split("=")[1];
      if (search && search.startsWith("users~"))
        loggeduser = await get_request(`user/${search}`);
    }

    if (loggeduser) {
      if (loggeduser.operator) {
        return window.location.assign(
          `${client_domain}/operator?${loggeduser.operator}`
        );
      }

      this.setState({ render: true }, () => {
        if (!this.loggeduser) {
          try {
            this.login(loggeduser);
            this.set_director(loggeduser);
          } catch (e) {}
        } else this.set_director();
      });
    } else {
      window.sessionStorage.setItem("redirect", window.location.href);
      window.location.assign(`${client_domain}/login`);
    }

    this.setState({
      categories,
    });
  };

  is_set = () => {
    let { attest, ID_type, image, cac, cac_oversize, image_oversize } =
      this.state;

    if (!ID_type || !image || !cac || !attest) return;

    let ID = this.state[ID_type];
    if (!ID) return;

    if (cac_oversize || image_oversize || this.state[`${ID_type}_oversize`])
      return;

    return true;
  };

  set_ID_type = (means) =>
    this.setState({
      ID_type: means,
    });

  submit = async () => {
    let { loading, ID_type, image, cac, cac_filename, image_filename } =
      this.state;
    if (loading || !this.is_set()) return;

    this.setState({ loading: true });

    let ID = this.state[ID_type];
    let ID_filename = this.state[`${ID_type}_filename`];

    let documents = {
      image,
      cac,
      user: this.loggeduser._id,
      id_type: ID_type,
      ID,
      ID_filename,
      cac_filename,
      image_filename,
    };

    let res = await post_request("request_to_become_an_operator", documents);
    if (res?._id) {
      this.setState({ details: res });

      this.loggeduser.operator = res._id;
      this.loggeduser.operator_status = "pending";
      this.set_loggeduser(this.loggeduser, () =>
        this.setState({ loading: false }, () =>
          window.location.assign(`${client_domain}/operator/${res.uri}`)
        )
      );
    } else
      this.setState({
        message: res?.message || "Cannot create operator profile at the moment",
      });
  };

  toggle_success_modal = () => this.success_modal.toggle();

  logo_maxsize = 3 * 1024 ** 2;

  render() {
    let {
      render,
      cac_filename,
      image_filename,
      ID_type,
      attest,
      loading,
      image_oversize,
      cac_oversize,
    } = this.state;

    let ID_filename = this.state[`${ID_type}_filename`];

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, set_loggeduser }) => {
          this.loggeduser = loggeduser;
          this.set_loggeduser = set_loggeduser;

          return (
            <div>
              <Nav page="become an operator" />
              <Padder />

              {!render ? (
                <Loadindicator contained />
              ) : (
                <div>
                  <section>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                          <form>
                            <div className="crs_log_wrap">
                              <div className="crs_log__thumb">
                                <img
                                  src={require(`../assets/img/vouchers1.png`)}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>

                              <div className="crs_log__caption">
                                <div className="rcs_log_123">
                                  <div className="rcs_ico">
                                    <i className="fas fa-users"></i>
                                  </div>
                                </div>

                                <div className="rcs_log_124">
                                  <div className="Lpo09">
                                    <h4>Operator Profile</h4>
                                  </div>
                                </div>

                                <File_input
                                  title="Profile Image"
                                  action={(e) =>
                                    this.handle_file(
                                      e,
                                      "image",
                                      this.logo_maxsize
                                    )
                                  }
                                  important
                                  accept="image/*"
                                  info="Type: Image, Maxsize: 3MB"
                                  error_message={
                                    image_oversize ? "Too large" : ""
                                  }
                                  filename={image_filename}
                                />
                                <hr />

                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>Means of Identification</label>

                                    {means_of_id.map((means) => {
                                      return (
                                        <Checkbox
                                          type="radio"
                                          title={to_title(
                                            means.replace(/_/g, " ")
                                          )}
                                          key={means}
                                          _id={means}
                                          checked={means === ID_type}
                                          action={(_id) =>
                                            this.set_ID_type(_id)
                                          }
                                          name="director_id_means"
                                        />
                                      );
                                    })}
                                  </div>

                                  {ID_type ? null : (
                                    <span className="text-danger">
                                      * Select an ID Type
                                    </span>
                                  )}
                                </div>

                                {ID_type ? (
                                  <File_input
                                    title={to_title(ID_type.replace(/_/g, " "))}
                                    action={(e) =>
                                      this.handle_file(
                                        e,
                                        ID_type,
                                        this.logo_maxsize
                                      )
                                    }
                                    filename={ID_filename}
                                    important
                                    accept="image/*,.doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    info="Type: PDF, Image, Maxsize: 3MB"
                                    error_message={
                                      this.state[`${ID_type}_oversize`]
                                        ? "Too large"
                                        : ""
                                    }
                                  />
                                ) : null}

                                <hr />

                                <div
                                  style={{
                                    padding: 16,
                                    borderWidth: 1,
                                    borderColor: "#03b97c",
                                    borderStyle: "solid",
                                    borderRadius: 5,
                                    paddingBottom: 5,
                                    marginBottom: 10,
                                  }}
                                >
                                  <h4 style={{ color: "#03b97c" }}>
                                    Business Registration Details
                                  </h4>
                                </div>
                                <File_input
                                  title="Certification of Incorporation"
                                  action={(e) =>
                                    this.handle_file(
                                      e,
                                      "cac",
                                      this.logo_maxsize
                                    )
                                  }
                                  filename={cac_filename}
                                  important
                                  accept="image/*,.doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  info="Type: PDF, Image, Maxsize: 3MB"
                                  error_message={
                                    cac_oversize ? "Too large" : ""
                                  }
                                />

                                <Checkbox
                                  title={
                                    "I hereby declare that the information provided in this form is accurate and complete. I confirm that any information is found incorrect and/or incomplete that leads a violation of regulations may initiate legal actions, and I accept that I am the responsible party for any and all charges, penalties and violations."
                                  }
                                  checked={attest}
                                  _id="attest"
                                  no_capitalise
                                  action={() =>
                                    this.setState({
                                      attest: !this.state.attest,
                                    })
                                  }
                                />

                                <div className="form-group">
                                  {loading ? (
                                    <Loadindicator />
                                  ) : (
                                    <button
                                      type="button"
                                      className={
                                        this.is_set()
                                          ? "btn full-width btn-md theme-bg text-white"
                                          : "btn full-width btn-md grey text-dark"
                                      }
                                      onClick={this.submit}
                                    >
                                      Submit
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Become_an_operator;
export { categories, means_of_id };
