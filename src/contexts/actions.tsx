import { Dashboard, Neuron } from "@/types";

import React from "react";
import {
  getDashboardAPI,
  getNeuronListAPI,
  updateNeuronCorrectAPI,
  updateNeuronIncorrectAPI,
} from "./services";

export enum ActionType {
  // GET_NEURON_REQUEST, // 뉴런 데이터 가져옴
  // GET_NEURON_SUCCESS,
  // GET_NEURON_FAILURE,
  GET_NEURON_LIST_REQUEST, // 뉴런 리스트 가져옴
  GET_NEURON_LIST_SUCCESS,
  GET_NEURON_LIST_FAILURE,
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAILURE,
  UPDATE_NEURON_LOADING, // 뉴런 정보 업데이트
  UPDATE_NEURON_SUCCESS,
  UPDATE_NEURON_FAILURE,
  UPDATE_NEURON_CORRECT_REQUEST, // 뉴런 강화
  UPDATE_NEURON_CORRECT_SUCCESS,
  UPDATE_NEURON_CORRECT_FAILURE,
  UPDATE_NEURON_INCORRECT_REQUEST, // 뉴런 초기화
  UPDATE_NEURON_INCORRECT_SUCCESS,
  UPDATE_NEURON_INCORRECT_FAILURE,
}

export type Action =
  | {
      type: ActionType.GET_NEURON_LIST_REQUEST;
    }
  | {
      type: ActionType.GET_NEURON_LIST_SUCCESS;
      payload: {
        neuronList: Neuron[];
        incorrectList: Neuron[];
      };
    }
  | {
      type: ActionType.GET_NEURON_LIST_FAILURE;
      payload: string;
    }
  | {
      type: ActionType.GET_DASHBOARD_REQUEST;
    }
  | {
      type: ActionType.GET_DASHBOARD_SUCCESS;
      payload: Dashboard;
    }
  | {
      type: ActionType.GET_DASHBOARD_FAILURE;
      payload: string;
    }
  | {
      type: ActionType.UPDATE_NEURON_CORRECT_REQUEST;
    }
  | {
      type: ActionType.UPDATE_NEURON_CORRECT_SUCCESS;
      payload: Neuron;
    }
  | {
      type: ActionType.UPDATE_NEURON_CORRECT_FAILURE;
      payload: string;
    }
  | {
      type: ActionType.UPDATE_NEURON_INCORRECT_REQUEST;
    }
  | {
      type: ActionType.UPDATE_NEURON_INCORRECT_SUCCESS;
      payload: Neuron;
    }
  | {
      type: ActionType.UPDATE_NEURON_INCORRECT_FAILURE;
      payload: string;
    };

export const getNeuronById = async (
  dispatch: React.Dispatch<Action>,
  id: string
) => {
  try {
  } catch (error: any) {
    console.error(error);
  }
};

export const getNeuronList = async (dispatch: React.Dispatch<Action>) => {
  try {
    dispatch({ type: ActionType.GET_NEURON_LIST_REQUEST });
    const result = await getNeuronListAPI();

    dispatch({
      type: ActionType.GET_NEURON_LIST_SUCCESS,
      payload: result.data.data as any,
    });
  } catch (error: any) {
    console.error(error);

    dispatch({
      type: ActionType.GET_NEURON_LIST_FAILURE,
      payload: error.response?.data?.message,
    });
  }
};

export const getDashboard = async (dispatch: React.Dispatch<Action>) => {
  try {
    dispatch({ type: ActionType.GET_DASHBOARD_REQUEST });
    const result = await getDashboardAPI();

    dispatch({
      type: ActionType.GET_DASHBOARD_SUCCESS,
      payload: result.data.data as any,
    });
  } catch (error: any) {
    console.error(error);

    dispatch({
      type: ActionType.GET_DASHBOARD_FAILURE,
      payload: error.response?.data?.message,
    });
  }
};

export const updateNeuronCorrect = async (
  dispatch: React.Dispatch<Action>,
  neuron: Neuron
) => {
  try {
    dispatch({ type: ActionType.UPDATE_NEURON_CORRECT_REQUEST });
    updateNeuronCorrectAPI({ neuron });

    dispatch({
      type: ActionType.UPDATE_NEURON_CORRECT_SUCCESS,
      payload: neuron,
    });
  } catch (error: any) {
    console.error(error);

    dispatch({
      type: ActionType.UPDATE_NEURON_CORRECT_FAILURE,
      payload: error.response?.data?.message,
    });
  }
};

export const updateNeuronIncorrect = async (
  dispatch: React.Dispatch<Action>,
  neuron: Neuron
) => {
  try {
    dispatch({ type: ActionType.UPDATE_NEURON_INCORRECT_REQUEST });
    const result = await updateNeuronIncorrectAPI({ neuron });

    dispatch({
      type: ActionType.UPDATE_NEURON_INCORRECT_SUCCESS,
      payload: result.data.data as Neuron,
    });
  } catch (error: any) {
    console.error(error);

    dispatch({
      type: ActionType.UPDATE_NEURON_INCORRECT_FAILURE,
      payload: error.response?.data?.message,
    });
  }
};
