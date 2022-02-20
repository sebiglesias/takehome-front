import React, {useCallback} from 'react';
import classes from './App.module.scss';
import {SearchBox} from "./searchBox/searchBox";
import {useRoninApi} from "./apis/useRoninApi";
import {isValidRoninAddress} from "./roninAddress/roninAddress";
import {Container, Grid} from "@mui/material";
import {useDispatch} from "react-redux";

export const App = () => {
    const ronin = useRoninApi()
    const dispatch = useDispatch()
    const onAddressSubmit = useCallback((hash: string) => {
        if (isValidRoninAddress(hash)) {
            return Promise.all(
                [
                    // API does not allow getting more of 200 transactions
                    ronin.getTransfers(hash.replace("ronin:", "0x"), 100, 0),
                    ronin.getAccountInfo(encodeURIComponent(hash))
                ]
            )
        }
    }, [ronin])

  return (
    <Container maxWidth={'sm'}>
      <div className={classes.AppHeader}>
        <SearchBox onSubmit={onAddressSubmit}/>
      </div>
        <Grid container spacing={2}>

        </Grid>
    </Container>
  );
}

export default App;
