import React, {useCallback} from 'react';
import classes from './App.module.scss';
import {SearchBox} from "./searchBox/searchBox";
import {useRoninApi} from "./apis/useRoninApi";
import {isValidRoninAddress} from "./roninAddress/roninAddress";
import {Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {InfoCard} from "./infoCard/infoCard";
import {AddressTypeCard} from "./addressTypeCard/addressTypeCard";
import {AppState} from "./store";

import Eth from './images/eth.svg'
import Slp from './images/slp.svg'
import Axs from './images/axs.svg'

export const App = () => {
    const {accountType, walletHash} = useSelector((state: AppState) => state.address)
    const ronin = useRoninApi()
    const dispatch = useDispatch()
    const onAddressSubmit = useCallback((hash: string) => {
        if (isValidRoninAddress(hash)) {
            return Promise.all(
                [
                    // API does not allow getting more of 200 transactions
                    ronin.getTransactions(hash.replace("ronin:", "0x"), 100, 0),
                    ronin.getBalances(encodeURIComponent(hash))
                ]
            ).then(res => console.log(res)).catch()
        }
    }, [ronin])

  return (
    <Container maxWidth={'md'} className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.box}>
                    <SearchBox onSubmit={onAddressSubmit}/>
                </Grid>
                {walletHash !== undefined &&
                    <>
                        <Grid item xs={12}>
                            <AddressTypeCard accountType={accountType}/>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Holdings</h2>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoCard value={'0'} key={0} imgUrl={Eth} title={'WETH'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoCard value={'test'} key={1} imgUrl={Axs} title={'AXS'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoCard value={'test'} key={2} imgUrl={Slp} title={'SLP'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoCard value={'test'} key={3} imgUrl={'url'} title={'AXIES'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Transactions</h2>
                        </Grid>
                    </>
                }
            </Grid>
    </Container>
  );
}

export default App;
