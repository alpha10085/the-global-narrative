const httpStatus = {
  Processing: {
    code: 102,
    message: "httpStatus.Processing",
  },
  OK: {
    code: 200,
    message: "httpStatus.OK",
  },
  Created: {
    code: 201,
    message: "httpStatus.Created",
  },
  Forbidden: {
    code: 403,
    message: "httpStatus.Forbidden",
  },
  unAuthorized: {
    code: 401,
    message: "httpStatus.Unauthorized",
  },
  badRequest: {
    code: 400,
    message: "httpStatus.BadRequest",
  },
  NotFound: {
    code: 404,
    message: "httpStatus.NotFound",
  },
  conflict: {
    code: 409,
    message: "httpStatus.conflict",
  },
  internalServerError: {
    code: 500,
    message: "httpStatus.InternalServerError",
  },
  sessionExpired: {
    code: 403,
    message: "httpStatus.Sessionexpired",
  },
  Accepted: {
    code: 202,
    message: "httpStatus.Accepted",
  },
};

export default httpStatus;
