enum EServiceErrorCode {
  UploadError = "413",
  ForbiddenError = "401",
  ValidateError = "406",
  NotFoundError = "406",
  UnknownError = "500",
}

/**
 * base class
 */
abstract class SeviceError extends Error {
  code: EServiceErrorCode
  constructor(message: string, code: EServiceErrorCode) {
    super(message)
    this.code = code
  }
}

class UploadError extends SeviceError {
  constructor(message: string) {
    super(message, EServiceErrorCode.UploadError)
  }
}

class ForbiddenError extends SeviceError {
  constructor(message: string) {
    super(message, EServiceErrorCode.ForbiddenError)
  }
}

class ValidateError extends SeviceError {
  constructor(message: string) {
    super(message, EServiceErrorCode.ValidateError)
  }
}

class NotFoundError extends SeviceError {
  constructor(res = "file/api not found") {
    super(res, EServiceErrorCode.NotFoundError)
  }
}

class UnknownError extends SeviceError {
  constructor(message: string) {
    super(message, EServiceErrorCode.UnknownError)
  }
}

export { SeviceError, UnknownError, NotFoundError, ValidateError, ForbiddenError, UploadError }
