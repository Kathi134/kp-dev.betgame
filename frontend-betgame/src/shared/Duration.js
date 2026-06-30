import { useMemo } from "react";
import { MdAccessTime } from "react-icons/md";
import { GiGoalKeeper } from "react-icons/gi";
import "./shared.css"

export default function Duration({ match = undefined, duration }) {
    const computedDuration = useMemo(() => duration !== undefined ? duration : match?.duration, [match, duration]);
    const showForStage = useMemo(() => match === undefined ? true : match?.stage !== "GROUP_STAGE")

    if (!showForStage)
        return <></>

    return (<>
        {computedDuration === "EXTRA_TIME"
            && <span className="absolute"><MdAccessTime /></span>
        }
        {computedDuration === "PENALTY_SHOOTOUT"
            && <span className="absolute"><GiGoalKeeper /></span>
        }
    </>)
}