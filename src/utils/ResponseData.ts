export default class ResponseData {
  success: boolean;
  error?: string | null | undefined;
  result: any | null;

  constructor(result: any | null, error?: string | null | undefined) {
    this.success = error === null || error === undefined;
    this.error = null;
    this.result = null;

    if (error !== null && error !== undefined) {
      this.error = error;
    }
    if (result !== null && result !== undefined) {
      this.result = result;
    }
  }
}
