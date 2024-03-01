import { AxiosResponse } from "axios";
import { http } from "./http";

export interface Slip {
  id: number;
  advice: string;
}

interface IAdviceResponse {
  slip: Slip;
}

export const randomAdvice = async (): Promise<
  AxiosResponse<IAdviceResponse, any>
> => {
  return http.get("");
};
