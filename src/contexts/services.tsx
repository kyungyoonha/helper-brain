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
  return api.get(`/GetNeuronList`);
};

export const getDashboardAPI = (): Promise<
  AxiosResponse<GetNeuronListResult>
> => {
  return api.get(`/GetDashboard`);
};

export const updateNeuronCorrectAPI = (
  data: UpdatedNeuronCorrectParams
): Promise<AxiosResponse<UpdateNeuronCorrectResult>> => {
  return api.post(`/UpdateNeuronCorrect`, data);
};

export const updateNeuronIncorrectAPI = (
  data: UpdatedNeuronIncorrectParams
): Promise<AxiosResponse<UpdateNeuronIncorrectResult>> => {
  return api.post(`/UpdateNeuronInCorrect`, data);
};
