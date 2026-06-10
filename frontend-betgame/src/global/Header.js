import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Header({ title, values = [], activeValue, onValueChange, displayValue = (v) => v }) {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="horizontal-container space-between">
                <h1>{title}</h1>
                <button onClick={() => navigate("/account")} className="floating-header-btn"><GoPerson size={20} color="black" /></button>
            </div>

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