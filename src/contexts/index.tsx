"use client";
import React, { useReducer, useMemo } from "react";
import {
  Action,
  ActionType,
  getDashboard,
  getNeuronList,
  updateNeuronCorrect,
  updateNeuronIncorrect,
} from "./actions";
import { Dashboard, Neuron } from "@/types";
import dayjs from "dayjs";

export interface State {
  getNeuronListLoading: boolean;
  getNeuronListError: string | null;
  getNeuronListDone: boolean;
  getDashboardLoading: boolean;
  getDashboardError: string | null;
  getDashboardDone: boolean;
  updateNeuronCorrectLoading: boolean;
  updateNeuronCorrectError: string | null;
  updateNeuronCorrectDone: boolean;
  updateNeuronIncorrectLoading: boolean;
  updateNeuronIncorrectError: string | null;
  updateNeuronIncorrectDone: boolean;
  neuronList: Neuron[];
  incorrectList: Neuron[];
  dashboard: Dashboard;
  getNeuronList: typeof getNeuronList;
  getDashboard: typeof getDashboard;
  updateNeuronCorrect: typeof updateNeuronCorrect;
  updateNeuronIncorrect: typeof updateNeuronIncorrect;
  dispatch: React.Dispatch<Action>;
}

interface Props {
  children: React.ReactNode;
}

const initialState: State = {
  getNeuronListLoading: false,
  getNeuronListError: null,
  getNeuronListDone: false,
  getDashboardLoading: false,
  getDashboardError: null,
  getDashboardDone: false,
  updateNeuronCorrectLoading: false,
  updateNeuronCorrectError: null,
  updateNeuronCorrectDone: false,
  updateNeuronIncorrectLoading: false,
  updateNeuronIncorrectError: null,
  updateNeuronIncorrectDone: false,
  neuronList: [],
  incorrectList: [],
  dashboard: {
    id: null,
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    totalCorrectCount: 0,
    totalIncorrectCount: 0,
    total: 0,
  },
  getNeuronList,
  getDashboard,
  updateNeuronCorrect,
  updateNeuronIncorrect,
  dispatch: () => null,
};

const reducer = (state: State = initialState, action: Action): State => {
  console.log(`>>> ${ActionType[action.type]}`);
  switch (action.type) {
    case ActionType.GET_NEURON_LIST_REQUEST:
      return {
        ...state,
        getNeuronListLoading: true,
        getNeuronListError: null,
        getNeuronListDone: false,
      };
    case ActionType.GET_NEURON_LIST_SUCCESS:
      return {
        ...state,
        getNeuronListLoading: false,
        getNeuronListDone: true,
        neuronList: action.payload.neuronList,
        incorrectList: action.payload.incorrectList,
        dashboard: {
          ...state.dashboard,
          total:
            state.dashboard.total === 0
              ? action.payload.neuronList.length
              : state.dashboard.total,
        },
      };
    case ActionType.GET_NEURON_LIST_FAILURE:
      return {
        ...state,
        getNeuronListLoading: false,
        getNeuronListError: action.payload,
      };
    case ActionType.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        getNeuronListLoading: true,
        getNeuronListError: null,
        getNeuronListDone: false,
      };
    case ActionType.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        getNeuronListLoading: false,
        getNeuronListDone: true,
        dashboard: action.payload,
      };
    case ActionType.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        getNeuronListLoading: false,
        getNeuronListError: action.payload,
      };
    case ActionType.UPDATE_NEURON_CORRECT_REQUEST:
      return {
        ...state,
        updateNeuronCorrectLoading: true,
        updateNeuronCorrectError: null,
        updateNeuronCorrectDone: false,
      };
    case ActionType.UPDATE_NEURON_CORRECT_SUCCESS:
      return {
        ...state,
        updateNeuronCorrectLoading: false,
        updateNeuronCorrectDone: true,
        neuronList: state.neuronList.filter(
          (neuron) => neuron.id !== action.payload.id
        ),
        dashboard: {
          ...state.dashboard,
          totalCorrectCount: Number(state.dashboard.totalCorrectCount) + 1,
        },
      };
    case ActionType.UPDATE_NEURON_CORRECT_FAILURE:
      return {
        ...state,
        updateNeuronCorrectLoading: false,
        updateNeuronCorrectError: action.payload,
      };
    case ActionType.UPDATE_NEURON_INCORRECT_REQUEST:
      return {
        ...state,
        updateNeuronIncorrectLoading: true,
        updateNeuronIncorrectError: null,
        updateNeuronIncorrectDone: false,
      };
    case ActionType.UPDATE_NEURON_INCORRECT_SUCCESS:
      return {
        ...state,
        updateNeuronIncorrectLoading: false,
        updateNeuronIncorrectDone: true,
        incorrectList: [action.payload, ...state.incorrectList],
        dashboard: {
          ...state.dashboard,
          totalIncorrectCount: Number(state.dashboard.totalIncorrectCount) + 1,
        },
      };
    case ActionType.UPDATE_NEURON_INCORRECT_FAILURE:
      return {
        ...state,
        updateNeuronIncorrectLoading: false,
        updateNeuronIncorrectError: action.payload,
      };
    default:
      return state;
  }
};

const UIContext = React.createContext<State>(initialState);
UIContext.displayName = "UIContext";

export const UIProvider = ({ children, ...props }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <UIContext.Provider value={value} {...props}>
      {children}
    </UIContext.Provider>
  );
};
export const useUIContext = () => {
  const context = React.useContext(UIContext);

  if (context === undefined) {
    throw new Error("useUIContext must be used  within a UIProvider");
  }
  return context;
};
