export const ChangeLoginFalse = "CheckLogin/ChangeLoginFalse";
export const ChangeLoginTrue = "CheckLogin/ChangeLoginTrue";

const defaultState = false;

export const setLoginFalse = () => {
  return {
    type: ChangeLoginFalse,
    status: false,
  };
};

export const setLoginTrue = () => {
  return {
    type: ChangeLoginTrue,
    status: true,
  };
};

const LoginStatus = (state = defaultState, action) => {
  switch (action.type) {
    case ChangeLoginFalse:
      return { status: action.status };
    case ChangeLoginTrue:
      return { status: action.status };
    default:
      return { status: false };
  }
};

export default LoginStatus;
