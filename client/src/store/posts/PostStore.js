///////////*****************//////// USERSTORE

import { apiUrl } from "../../instances/instance";
import { logIn, logOut, getPatients, createTip, getTips, deleteTip, addResults, getPatient, getConditions } from "./function";
import history from "../../history";
export default class UserStore {
  // pull data /////
  static patientRegister = patient => {
    return dispatch => {
      apiUrl
        .post("/patient/signup", patient)
        .then(patient => {
          // dispatch(logIn(patient));
          history.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    };
  };
  static employeeRegister = employee => {
    return dispatch => {
      apiUrl
        .post("/employee/signup", employee)
        .then(patient => {
          // dispatch(logIn(employee));
          history.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    };
  };
  static patientLogIn = patient => {
    return dispatch => {
      apiUrl
        .post("/patient/login", patient)
        .then(patient => {
          dispatch(logIn(patient));
          history.push("/patient");
        })
        .catch(err => {
          console.log(err);
        });
    };
  };
  static employeeLogIn = employee => {
    return dispatch => {
      apiUrl
        .post("/employee/login", employee)
        .then(employee => {
          dispatch(logIn(employee));
        })
        .then(() => {
          apiUrl.get('/patient/patient_list')
          .then(patients => {
            dispatch(getPatients(patients));
            history.push("/employee");
          })
        })
        .catch(err => {
          console.log(err);
        });

    };
  };
  static createTip = (tip) => {
    return dispatch => {
      apiUrl
        .post("/tip", tip)
        .then(tip => {
          dispatch(createTip(tip));
          history.push("/employee");
        })
        .catch(err => {
          console.log(err);
        });
    };
  };
  static getTips = () => {
    return dispatch => {
      apiUrl.get('/tip')
      .then(tips => {
        dispatch(getTips(tips))
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  static addResults = (id, results) => {
    console.log(id);
    return dispatch => {
      apiUrl.put('/patient/' + id, results)
      .then(response => {
        history.push('patient_list');
      })
    }
  }
  static getPatient = (id) => {
    return dispatch => {
      apiUrl.get('/patient/' + id)
      .then(patient => {
        dispatch(getPatient(patient));
      })
    }
  }
  static getConditions = (symptoms) => {
    const request = {
      symptoms: symptoms
    }
    return dispatch => {
      apiUrl.post('/condition', symptoms)
      .then(conditions => {
        dispatch(getConditions(conditions));
      })
    }
  }
  static deleteTip = (tip) => {
    return dispatch => {
      apiUrl.delete('/tip/' + tip._id)
      .then(response => {
        dispatch(deleteTip(tip))
        history.push('/health_tips');
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  static logOut = () => {
    return dispatch => {
      dispatch(logOut());
      history.push("/");
    };
  };
}
