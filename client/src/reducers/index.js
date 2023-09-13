import { combineReducers } from "redux";
import authreducer from "./auth.js";
import currentuserreducer from './currentuser.js'
import questionreducer from './question.js'
import usersreducer from "./users.js";
import current from "./current.js";

export default combineReducers({
    authreducer, currentuserreducer,questionreducer, usersreducer, current
})