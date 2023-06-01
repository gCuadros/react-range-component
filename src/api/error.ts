type CustomErrorAPI = {
  code: string;
  message?: string;
};

export class CustomError extends Error {
  public status?: number;
  public key: string;

  constructor(error: CustomErrorAPI, status: number) {
    super(error.message || "Something went wrong");
    this.key = error.code || "generic-api-error";
    this.status = status;
  }
}
