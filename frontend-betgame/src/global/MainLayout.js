import { Outlet } from "react-router-dom";
import "../base.css"
import "./mainlayout.css"
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useHeader } from "./HeaderContext";

export default function MainLayout({ children }) {
    const { title, values, activeValue, onValueChange, displayValue } = useHeader();

    return (<>
        <Header title={title} values={values} activeValue={activeValue} onValueChange={onValueChange} displayValue={displayValue} />

        <main><div id="children-container"><Outlet /></div></main>

        <footer>
            <nav className='horizontal-container space-evenly'>
                <MenuItem destination="stats" displayName="Ranking" />
                <MenuItem destination="bets" displayName="Tippen" />
                <MenuItem destination="results" displayName="Ergebnisse" />
            </nav>
        </footer>
    </>);
}

