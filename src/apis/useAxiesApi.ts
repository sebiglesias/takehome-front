import {useMemo} from "react";
import {AxiesApi} from "./axiesApi";

export const useRoninApi = () => {
    return useMemo(() => {
        return new AxiesApi()
    }, [])
}