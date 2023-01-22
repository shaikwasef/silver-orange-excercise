export type ApiResponse<T> = [T[], IApiError | undefined, boolean];

export interface IApiError {
  status: number;
  message: string;
  documentation_url?: string;
}
