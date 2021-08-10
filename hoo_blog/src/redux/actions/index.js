export const UPDATEUSERNUM = "UPDATEUSERNUM";

export const updateUsernum = (usernum) => {
  return {
    type: UPDATEUSERNUM,
    payload: usernum,
  };
};