import { Reducer } from 'react'

export interface IFibNumber {
    id: number
    nth: string
    loading: boolean
    value: number | null
    time: number | null
}

export interface IFibState {
    number: string
    error?: string
    computedFibNumbers: IFibNumber[]
}

type ActionType =
    | 'SET_NUMBER'
    | 'SET_ERROR'
    | 'SET_FIBO_NUMBER'
    | 'UPDATE_FIBO_NUMBER'

export interface IAction {
    type: ActionType
    payload?: unknown
}

export const appReducer: Reducer<IFibState, IAction> = (state, action) => {
    switch (action.type) {
        case 'SET_NUMBER':
            return {
                ...state,
                number: action.payload as string,
                error: undefined,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload as string,
            }
        case 'SET_FIBO_NUMBER':
            return {
                ...state,
                computedFibNumbers: [
                    ...state.computedFibNumbers,
                    action.payload as IFibNumber,
                ],
            }
        case 'UPDATE_FIBO_NUMBER':
            const payload = action.payload as IFibNumber

            const currItem = state.computedFibNumbers.find(
                (item) => item.id === payload.id
            )
            const index = state.computedFibNumbers.indexOf(
                currItem as IFibNumber
            )
            const computedFibNumbersCopy = [...state.computedFibNumbers]

            computedFibNumbersCopy[index] = {
                ...currItem,
                ...payload,
            }

            return { ...state, computedFibNumbers: computedFibNumbersCopy }
        default:
            return state
    }
}
