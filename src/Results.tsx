import { IFibNumber } from './reducer'

export const Results = ({ computedFibs }: { computedFibs: IFibNumber[] }) => {
    return !!computedFibs.length ? (
        <div className="result-wrapper">
            {computedFibs.map((item) => {
                return (
                    <div key={item.id} className="result-item">
                        {item.loading ? (
                            <p>
                                Calculating the <b> {item.nth}</b> Fibonacci
                                number...
                            </p>
                        ) : (
                            <p>
                                The <b>{item.nth}</b> Fibonacci number is{' '}
                                <b>{item.value}</b> and it took{' '}
                                <b>{item.time}ms</b> to compute.
                            </p>
                        )}
                    </div>
                )
            })}
        </div>
    ) : null
}
