import {useMemo} from "react";
import {AxiesApi} from "./axiesApi";

export const useAxiesApi = () => {
    return useMemo(() => {
        return new AxiesApi()
    }, [])
}