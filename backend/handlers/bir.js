import { generate_random_string } from "generalised-datastore/utils/functions";
import { BIR, USERS, USERS_HASH } from "../ds/conn";
import { save_image } from "./utils";
import { bir_profile_created } from "./emails";
import { send_mail } from "./users";

const add_bir = (req, res) => {
  let bir = req.body;

  bir.image = save_image(bir.image);

  let user = USERS.readone({ email: bir.email }),
    password;
  if (user) {
    USERS.update(user._id, { bir: true });
    password = USERS_HASH.readone({ user: user._id }).key;
  } else {
    user = USERS.write({ ...bir, bir: true });
    password = generate_random_string(6);
    USERS_HASH.write({ user: user._id, key: password });
  }
  bir.user = user._id;
  let b = BIR.write({ user: user._id });
  USERS.update({ bir: b._id });

  send_mail({
    recipient: bir.email,
    recipient_name: `${bir.firstname} ${bir.lastname}`,
    subject: "[SWEET] BIR Profile Created",
    sender_name: "SWEET",
    html: bir_profile_created({ bir, password }),
  });

  res.json({ ok: true, data: { _id: user._id, image: bir.image } });
};

const remove_bir = (req, res) => {
  let { bir } = req.params;

  let u = BIR.remove(bir);
  if (u) USERS.update(u.user, { bir: false });

  res.end();
};

const birs = (req, res) => {
  res.json({ ok: true, data: BIR.read() });
};

const bir = (req, res) => {
  let { _id } = req.params;

  if (_id.startsWith("user")) _id = USERS.readone(_id);
  else _id = BIR.readone(_id);

  if (_id.bir) _id = BIR.readone(_id.bir);

  res.json({ ok: true, data: _id });
};

export { add_bir, remove_bir, birs, bir };
