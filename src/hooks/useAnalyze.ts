import { useMutation } from "@tanstack/react-query";
import { type AnalyzeResult } from "../types";

class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
function useAnalyze() {
  return useMutation<AnalyzeResult, APIError, FormData>({
    mutationFn: getResult,
  });
}

async function getResult(info: FormData) {
  const apiURL = "/api/analyze";
  const result = await fetch(apiURL, { method: "POST", body: info });

  if (!result.ok) {
    const error = await result.json().catch(() => ({}));
    const err = new APIError(error.detail, result.status);
    throw err;
  }

  return result.json();
}
export default useAnalyze;
