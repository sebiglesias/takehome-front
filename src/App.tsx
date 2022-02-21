import React, {useCallback} from 'react';
import classes from './App.module.scss';
import {SearchBox} from "./searchBox/searchBox";
import {useRoninApi} from "./apis/useRoninApi";
import {isValidRoninAddress} from "./roninAddress/roninAddress";
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {InfoCard} from "./infoCard/infoCard";
import {AddressTypeCard} from "./addressTypeCard/addressTypeCard";
import {AppState} from "./store";

import Eth from './images/eth.svg'
import Slp from './images/slp.svg'
import Axs from './images/axs.svg'
import Axie from './images/axie.png'
import {setBalances, setLoading, setTransactions, setTransactionsERC20} from "./address/addressSlice";
import {extractBalance, extractTransactions, extractTransactionsERC20} from "./roninExplorer/utils";

export const App = () => {
    const {accountType, walletHash, balance, loading} = useSelector((state: AppState) => state.address)
    const ronin = useRoninApi()
    const dispatch = useDispatch()

    const onAddressSubmit = useCallback((hash: string) => {
        dispatch(setLoading(true))
        if (isValidRoninAddress(hash)) {
            const parsedAddress = hash.replace('ronin:', '0x')
            return Promise.all(
                [
                    // APIs do not allow getting more than 100 transactions
                    ronin.getTransactions(parsedAddress, 100, 0),
                    ronin.getBalances(parsedAddress),
                    ronin.getTransactionsERC20(parsedAddress, 100, 0)
                ]
            ).then(res => {
                const transactions = res[0]
                dispatch(setTransactions(extractTransactions(transactions)))
                const balances = res[1]
                dispatch(setBalances(extractBalance(balances)))
                const transactionsERC20 = res[2]
                dispatch(setTransactionsERC20(extractTransactionsERC20(transactionsERC20)))
            }).catch().finally(() => dispatch(setLoading(false)))
        }
    }, [ronin, dispatch])

    const showInfo = walletHash !== undefined && walletHash !== '' && !loading

    return (
    <Container maxWidth={'md'} className={classes.container}>
            <Grid container spacing={2}>
                {!showInfo && <Grid item xs={12} md={12}>
                    <Typography sx={{p: 2}}>Press enter to search the info of a specific ronin address</Typography>
                </Grid>
                }
                <Grid item xs={12} md={12} className={classes.box}>
                    <SearchBox onSubmit={onAddressSubmit} disabled={loading}/>
                </Grid>
                {loading &&
                    <Grid item xs={12}><CircularProgress /></Grid>
                }
                {showInfo &&
                    <>
                        <Grid item xs={12} md={12}>
                            <AddressTypeCard accountType={accountType}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <h2>Holdings</h2>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InfoCard value={(!!balance && balance.weth) || '0'} key={0} imgUrl={Eth} title={'WETH'}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InfoCard value={(!!balance && balance.axs) || '0'} key={1} imgUrl={Axs} title={'AXS'}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InfoCard value={(!!balance && balance.slp) || '0'} key={2} imgUrl={Slp} title={'SLP'}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InfoCard value={(!!balance && balance.axie) || '0'} key={3} imgUrl={Axie} title={'AXIE'}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <h2>Transactions</h2>
                        </Grid>
                    </>
                }
            </Grid>
    </Container>
  );
}

export default App;
