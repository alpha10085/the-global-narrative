const SetCookie = (options = {}) => {
  return {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    ...options,
  };
};

export default SetCookie;
