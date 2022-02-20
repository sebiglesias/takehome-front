import {useMemo} from "react";
import {RoninApi} from "./roninApi";

export const useRoninApi = () => {
    return useMemo(() => {
        return new RoninApi()
    }, [])
}