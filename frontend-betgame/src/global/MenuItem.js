import { IconContext } from 'react-icons';
import { GiNetworkBars, GiSoccerBall, GiSoccerField } from "react-icons/gi";
import { NavLink, useLocation } from 'react-router-dom';
import './mainlayout.css'
import '../base.css'
import { useParams } from 'react-router-dom';


const MENU_ICONS = {
    'results': <GiSoccerBall />,
    'bets': <GiSoccerField />,
    'stats': <GiNetworkBars />
}

function MenuItem({ destination, displayName }) {
    const location = useLocation()
    const { state } = useLocation();
    let currPath = location.pathname.split("/")[1]
    if (!currPath)
        currPath = "stats";

    const iconStyle = {
        'color': currPath === destination ? 'var(--base-text)' : 'var(--base-text-secondary)',
        'size': '2rem',
    }

    return (<>
        <NavLink to={`${destination}`} state={state} className="unset">
            <div className='vertical-container center'>
                <IconContext.Provider value={iconStyle}>
                    {MENU_ICONS[destination]}
                </IconContext.Provider>
                <span className={`menu-item-text ${currPath === destination && "active"}`}>{displayName}</span>
            </div>
        </NavLink>
    </>);
}

export default MenuItem;