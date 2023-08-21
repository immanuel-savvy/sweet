import {
  CATEGORIES,
  DRIVERS,
  GLOBALS,
  OPERATORS,
  OPERATOR_DRIVERS,
  OPERATOR_VEHICLES,
  REPORTS,
  USERS,
  VEHICLES,
} from "../ds/conn";
import { send_mail } from "./users";
import { remove_image, save_file, save_image } from "./utils";
import { GLOBAL_pending_operators } from "./starter";
import { operator_verified } from "./emails";

const request_to_become_an_operator = (req, res) => {
  let documents = req.body;

  let { ID, cac, user, image, image_filename, cac_filename, ID_filename } =
    documents;
  documents.image = save_image(image, image_filename);
  documents.cac = save_file(cac, cac_filename);
  documents.ID = save_file(ID, ID_filename);

  delete documents.cac_filename;
  delete documents.image_filename;
  delete documents.ID_filename;

  let result = OPERATORS.write(documents);
  documents._id = result._id;
  documents.created = result.created;

  USERS.update(user, {
    operator: result._id,
    operator_status: "pending",
  });

  GLOBALS.update(
    { global: GLOBAL_pending_operators },
    { operators: { $push: result._id } }
  );

  res.json({ ok: true, message: "operator request sent", data: documents });
};

const unverified_operators = (req, res) => {
  let data = GLOBALS.readone({ global: GLOBAL_pending_operators });
  res.json({
    ok: true,
    message: "unverified operators",
    data: OPERATORS.read(data.operators),
  });
};

const driver_page = (req, res) => {
  let { driver } = req.params;
  if (!driver) return res.end();

  driver = DRIVERS.readone(driver);
  if (!driver) return res.end();

  if (driver.reports && driver.reports.length) {
    let cats = CATEGORIES.read(driver.reports.map((r) => r.report));
    driver.reports = driver.reports.map((r) => {
      r.report = cats.find((c) => c._id === r.report);
      return r;
    });
  } else driver.reports = new Array();

  res.json({
    ok: true,
    data: { driver, operator: OPERATORS.readone(driver.operator) },
  });
};

const verify_operator = (req, res) => {
  let { operator } = req.params;

  let c_operator = OPERATORS.readone(operator);
  if (!c_operator)
    return res.json({ ok: false, data: { message: "operator not found" } });
  else if (c_operator.verified)
    return res.json({
      ok: true,
      data: { message: "operator verified already" },
    });

  GLOBALS.update(
    { global: GLOBAL_pending_operators },
    { operators: { $splice: operator } }
  );
  operator = OPERATORS.update(operator, { verified: Date.now() });

  if (operator) {
    USERS.update(operator.user, { operator_status: "verified" });
    let { user } = operator;

    let director_name = `${user.firstname} ${user.lastname}`;
    send_mail({
      recipient: user.email,
      recipient_name: `${director_name}`,
      subject: "[SWEET-One] Operator Verified",
      html: operator_verified(operator),
    });
  }

  res.json({
    ok: true,
    message: "verify operator",
    data: { verified: !!(operator && operator.verified) },
  });
};

const operator = (req, res) => {
  let { operator: operator_ } = req.params;

  res.json({
    ok: true,
    message: "operator",
    data: OPERATORS.readone({ _id: operator_ }),
  });
};

const operators = (req, res) => {
  let { limit } = req.params;

  let operators = OPERATORS.read(null, { limit: Number(limit) }).filter(
    (v) => v.verified
  );

  res.json({ ok: true, message: "operators", data: operators });
};

const drivers = (req, res) => {
  let { query, limit, skip } = req.body,
    data;

  if (query && query.operator)
    data = OPERATOR_DRIVERS.read(query, { limit, skip });
  else data = DRIVERS.read(query, { limit, skip });

  res.json({ ok: true, data });
};

const add_vehicle = (req, res) => {
  let vehicle = req.body;
  vehicle.image = save_image(vehicle.image);

  let r = VEHICLES.write(vehicle);
  vehicle._id = r._id;
  vehicle.created = r.created;

  OPERATOR_VEHICLES.write({ vehicle: r._id, operator: vehicle.operator });

  res.json({ ok: true, data: vehicle });
};

const update_vehicle_driver = (req, res) => {
  let { vehicle, driver } = req.body;

  DRIVERS.update(driver, { vehicle });
  VEHICLES.update(vehicle, { driver });

  res.end();
};

const update_vehicle = (req, res) => {
  let vehicle = req.body;
  if (!vehicle._id) return res.end();

  vehicle.image = save_image(vehicle.image);

  let result = VEHICLES.update(vehicle._id, vehicle);
  vehicle._id = result._id;
  vehicle.created = result.created;

  res.json({ ok: true, data: vehicle });
};

const remove_vehicle = (req, res) => {
  let { vehicle, operator } = req.body;
  if (!vehicle) return res.end();

  let result = VEHICLES.remove(vehicle);

  if (result) {
    remove_image(result.image);
    result.driver && DRIVERS.update(result.driver, { vehicle: null });
  }

  OPERATOR_VEHICLES.remove({ vehicle, operator });

  res.end();
};

const add_driver = (req, res) => {
  let driver = req.body;

  driver.image = save_image(driver.image);

  let result = DRIVERS.write(driver);
  driver._id = result._id;
  driver.created = result.created;

  OPERATOR_DRIVERS.write({ driver: driver._id, operator: driver.operator });

  res.json({ ok: true, data: driver });
};

const update_driver = (req, res) => {
  let driver = req.body;
  if (!driver._id) return res.end();

  driver.image = save_image(driver.image);
  driver.driver_license = save_image(driver.driver_license);

  let result = DRIVERS.update(driver._id, driver);
  driver._id = result._id;
  driver.created = result.created;

  res.json({ ok: true, data: driver });
};

const remove_driver = (req, res) => {
  let { driver, operator } = req.body;
  if (!driver) return res.end();

  let result = DRIVERS.remove(driver);

  if (result) {
    remove_image(result.image);
    remove_image(result.driver_license);
    result.vehicle && VEHICLES.update(result.vehicle, { driver: null });
  }

  OPERATOR_DRIVERS.remove({ driver, operator });

  res.end();
};

const driver = (req, res) => {
  let { query } = req.body;

  res.json({ ok: true, data: DRIVERS.readone(query) });
};

const create_category = (req, res) => {
  let cat = req.body;

  cat.calculators = new Array();

  let result = CATEGORIES.write(cat);
  res.json({
    ok: true,
    message: "category created",
    data: { _id: result._id, created: result.created },
  });
};

const update_category = (req, res) => {
  let cat = req.body;

  CATEGORIES.update(cat._id, { ...cat });

  res.json({
    ok: true,
    message: "Category updated",
    data: { _id: cat._id, created: cat.created },
  });
};

const remove_category = (req, res) => {
  let { category } = req.params;
  CATEGORIES.remove(category);

  res.end();
};

const report_categories = (req, res) => {
  res.json({ ok: true, data: CATEGORIES.read() });
};

const send_report = (req, res) => {
  let report = req.body;
  report.resolved = false;

  let result = REPORTS.write(report);

  CATEGORIES.update(report.category, { reports: { $inc: 1 } });

  let driver = DRIVERS.readone(report.driver);
  let rep = driver.reports || new Array(),
    found;
  rep = rep.map((r) => {
    if (r.report === report.category) {
      found = true;
      r.count++;
    }
    return r;
  });
  if (!found) rep = new Array(...rep, { report: report.category, count: 1 });
  DRIVERS.update(report.driver, { reports: rep });

  res.json({ ok: true, data: { _id: result._id } });
};

const vehicles = (req, res) => {
  let { query, operator } = req.params;

  res.json({
    ok: true,
    data: operator
      ? OPERATOR_VEHICLES.read({ operator })
      : VEHICLES.read(query),
  });
};

export {
  remove_driver,
  request_to_become_an_operator,
  driver_page,
  vehicles,
  report_categories,
  send_report,
  update_category,
  create_category,
  remove_category,
  operator,
  add_driver,
  update_driver,
  remove_vehicle,
  update_vehicle,
  add_vehicle,
  update_vehicle_driver,
  unverified_operators,
  drivers,
  driver,
  verify_operator,
  operators,
};
