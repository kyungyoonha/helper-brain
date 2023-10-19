import { BACK_URL } from "@/configs";
import api from "@/configs/api";
import { GetNeuronListResult } from "@/pages/api/GetNeuronList";
import {
  UpdateNeuronCorrectResult,
  UpdatedNeuronCorrectParams,
} from "@/pages/api/UpdateNeuronCorrect";
import {
  UpdateNeuronIncorrectResult,
  UpdatedNeuronIncorrectParams,
} from "@/pages/api/UpdateNeuronInCorrect";
import { AxiosResponse } from "axios";

export const getNeuronListAPI = (): Promise<
  AxiosResponse<GetNeuronListResult>
> => {
  return api.get(`${BACK_URL}/GetNeuronList`);
};

export const getDashboardAPI = (): Promise<
  AxiosResponse<GetNeuronListResult>
> => {
  return api.get(`${BACK_URL}/GetDashboard`);
};

export const updateNeuronCorrectAPI = (
  data: UpdatedNeuronCorrectParams
): Promise<AxiosResponse<UpdateNeuronCorrectResult>> => {
  return api.post(`${BACK_URL}/UpdateNeuronCorrect`, data);
};

export const updateNeuronIncorrectAPI = (
  data: UpdatedNeuronIncorrectParams
): Promise<AxiosResponse<UpdateNeuronIncorrectResult>> => {
  return api.post(`${BACK_URL}/UpdateNeuronInCorrect`, data);
};
