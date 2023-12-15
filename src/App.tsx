import { useReducer, Dispatch } from 'react'
import './App.css'
import { IAction, appReducer } from './reducer'
import { Results } from './Results'
import { fibonacciFormula, ordinal_suffix } from './helpers'

const Form = ({
    onSubmit,
    dispatch,
    value,
    title,
}: {
    onSubmit: () => void
    dispatch: Dispatch<IAction>
    value: string
    title: string
}) => {
    return (
        <form
            onSubmit={(e) => {
                console.log('submit')
                e.preventDefault()
                onSubmit()
            }}
        >
            <h2>{title}</h2>
            <input
                type="text"
                name="fibNumber"
                onChange={(e) => {
                    dispatch({
                        type: 'SET_NUMBER',
                        payload: e.currentTarget.value,
                    })
                }}
                value={value}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

function App() {
    const [info, dispatch] = useReducer(appReducer, {
        number: '',
        computedFibNumbers: [],
    })

    const runWorker = (num: number, id: number) => {
        const worker = new Worker(new URL('./fibWorker.ts', import.meta.url))
        dispatch({ type: 'SET_ERROR', payload: '' })

        worker.onerror = (err: any) => err
        worker.onmessage = (
            e: MessageEvent<{ time: number; value: number }>
        ) => {
            const { time, value } = e.data
            dispatch({
                type: 'UPDATE_FIBO_NUMBER',
                payload: { time, value, id, loading: false },
            })

            worker.terminate()
        }

        worker.postMessage(num)
    }

    const onSubmit = () => {
        if (info.number) {
            const id = info.computedFibNumbers.length
            dispatch({
                type: 'SET_FIBO_NUMBER',
                payload: {
                    id,
                    loading: true,
                    nth: ordinal_suffix(Number(info.number)),
                },
            })
            console.log('external submut')
            runWorker(+info.number, id)
        }
    }

    const onSubmitSync = () => {
        if (info.number) {
            const id = info.computedFibNumbers.length
            dispatch({
                type: 'SET_FIBO_NUMBER',
                payload: {
                    id,
                    loading: true,
                    nth: ordinal_suffix(Number(info.number)),
                },
            })
            const start = new Date().getTime()
            const result = fibonacciFormula(+info.number)
            const time = Date.now() - start
            dispatch({
                type: 'UPDATE_FIBO_NUMBER',
                payload: { time, value: result, id, loading: false },
            })
        }
    }

    return (
        <main className="main">
            <div className="forms-wrapper">
                <Form
                    title="Worker form"
                    onSubmit={onSubmit}
                    dispatch={dispatch}
                    value={info.number}
                />

                <Form
                    title="Worker form (sync)"
                    onSubmit={onSubmitSync}
                    dispatch={dispatch}
                    value={info.number}
                />
            </div>

            <Results computedFibs={info.computedFibNumbers} />
        </main>
    )
}

export default App
