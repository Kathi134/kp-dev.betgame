
export default function Header({ title, values = [], activeValue, onValueChange, displayValue = (v) => v }) {
    return (
        <div className="header">
            <h1>{title}</h1>

            {values.length > 0 && (
                <div className="tabs-container">
                    {values.map((value) => (
                        <button key={value} className={`tab ${activeValue === value ? "active" : ""}`} onClick={() => onValueChange(value)} >
                            {displayValue(value)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}