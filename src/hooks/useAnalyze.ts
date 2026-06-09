import { useMutation } from "@tanstack/react-query";
import { type AnalyzeResult } from "../types";

function useAnalyze() {
  return useMutation<AnalyzeResult, Error, FormData>({
    mutationFn: getResult,
  });
}

async function getResult(info: FormData) {
  const apiURL = "http://127.0.0.1:8000/analyze";
  const result = await fetch(apiURL, { method: "POST", body: info });

  if (!result.ok) {
    const error = await result.json().catch(() => ({}));
    throw new Error(error.detail);
  }

  return result.json();
}
export default useAnalyze;
