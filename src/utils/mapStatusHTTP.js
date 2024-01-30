const httpStatusMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

const mapStatusHTTP = (status) => httpStatusMap[status] || 500;

export default mapStatusHTTP;