// Custom error classes
export class AppError extends Error {
  constructor({
    message,
    code,
    translated = false,
    key = undefined,
    details = {},
  }) {
    super(message);
    this.code = code;
    this.details = details;
    this.translated = translated;
    this.key = key;
  }
}
