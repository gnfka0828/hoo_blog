export const UPDATEUSERNUM = "UPDATEUSERNUM";
export const UPDATECONFIRMLOGIN = "UPDATECONFIRMLOGIN";

export const updateUsernum = (usernum) => {
  return {
    type: UPDATEUSERNUM,
    payload: usernum,
  };
};

export const updateConfirmLogin = (confirmLogin) => {
  return {
    type: UPDATECONFIRMLOGIN,
    payload: confirmLogin,
  };
};