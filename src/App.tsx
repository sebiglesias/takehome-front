import React, {useCallback, useEffect} from 'react';
import classes from './App.module.css';
import {SearchBox} from "./searchBox/searchBox";
import {useRoninApi} from "./apis/useRoninApi";
import {isValidRoninAddress} from "./roninAddress/roninAddress";
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {InfoCard} from "./infoCard/infoCard";
import {AccountType, AddressTypeCard} from "./addressTypeCard/addressTypeCard";
import {AppState} from "./store";
import Eth from './images/eth.svg'
import Slp from './images/slp.svg'
import Axs from './images/axs.svg'
import Axie from './images/axie.png'
import {setAccountType, setBalances, setLoading, setTransactionTypes, setWalletHash} from "./address/addressSlice";
import {extractBalance, extractTxs} from "./roninExplorer/utils";
import {useAxiesApi} from "./apis/useAxiesApi";
import {setExchangeRates} from "./exchangeRates/exchangeRatesSlice";

export const App = () => {
    const {accountType, walletHash, balance, loading, transactions} = useSelector((state: AppState) => state.address)
    const rates = useSelector((state: AppState) => state.exchangeRate)
    const ronin = useRoninApi()
    const axies = useAxiesApi()
    const dispatch = useDispatch()

    useEffect(() => {
        const hasSlpTransaction = !!transactions && transactions.slp !== 0
        const hasSlpHoldings = !!balance && parseInt(balance.slp) !== 0
        dispatch(setAccountType(hasSlpTransaction ? AccountType.scholar : hasSlpHoldings ? AccountType.scholar : AccountType.investor))
    }, [walletHash, balance, transactions, dispatch])

    const onAddressSubmit = useCallback((hash: string) => {
        dispatch(setLoading(true))
        if (isValidRoninAddress(hash)) {
            dispatch(setWalletHash(hash))
            const parsedAddress = hash.replace('ronin:', '0x')
            return Promise.all(
                [
                    axies.getExchangeRate().then(res => {
                        dispatch(setExchangeRates(res))
                    }),
                    ronin.getTransactions(parsedAddress, 100, 0).then(res => {
                        const txs: {contractAddress: string, callData: string}[] = res.results.map(result => {
                            return {contractAddress: result.to, callData: result.input, logs: []}
                            })
                        return ronin.getActionTypes(txs).then((actionTypes: {data: string[]}) => {
                            dispatch(setTransactionTypes(extractTxs(actionTypes.data)))
                        })
                    }),
                    ronin.getBalances(parsedAddress).then(res => {
                        dispatch(setBalances(extractBalance(res)))
                    }),
                    // Won't be using the erc20 transfers as they can't be decoded
                    // ronin.getTransactionsERC20(parsedAddress, 100, 0).then(res => {
                    //     dispatch(setTransactionsERC20(extractTransactionsERC20(res)))
                    // })
                ]
            ).finally(() => dispatch(setLoading(false)))
        }
    }, [ronin, dispatch, axies])

    const showInfo = walletHash !== undefined && walletHash !== '' && !loading

    return (
        <Container maxWidth={'md'} className={classes.container}>
            <Grid container spacing={2}>
                {!showInfo && <Grid item xs={12} md={12}>
                    <Typography sx={{p: 2}}>Search for a ronin address, they have the following format: ronin:2b9fd5ebc7a6ce8539e2aec96774544b8d559732</Typography>
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
                            <AddressTypeCard accountType={accountType} walletHash={walletHash}/>
                        </Grid>
                        { balance !== undefined && <>
                            <Grid item xs={12} md={12}>
                                <Typography variant={'h5'}>Holdings</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InfoCard
                                    value={balance.weth || '0.00'}
                                    key={0}
                                    imgUrl={Eth}
                                    title={'WETH'}
                                    subValue={(parseFloat(balance.weth) * rates.eth.usd).toFixed(2) || '0'}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InfoCard value={balance.axs || '0.00'} key={1} imgUrl={Axs} title={'AXS'}
                                          subValue={(parseFloat(balance.axs) * rates.axs.usd).toFixed(2) || '0'}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InfoCard value={balance.slp || '0.00'} key={2} imgUrl={Slp} title={'SLP'}
                                          subValue={(parseFloat(balance.slp) * rates.slp.usd).toFixed(2) || '0'}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InfoCard value={balance.axie || '0'} key={3} imgUrl={Axie} title={'AXIE'}/>
                            </Grid>
                            </>}
                        {transactions !== undefined &&
                            <>
                                <Grid item xs={12} md={12}>
                                    <Typography variant={'h5'}>Transactions</Typography>
                                    <Typography variant={'subtitle1'}>Percentages taken over last 100 transactions</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <InfoCard value={`${(!!transactions && transactions.weth.toFixed(2)) || '0'}%`} key={4} imgUrl={Eth} title={'WETH related transactions'}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <InfoCard value={`${(!!transactions && transactions.axs.toFixed(2)) || '0'}%`} key={5} imgUrl={Axs} title={'AXS related transactions'}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <InfoCard value={`${(!!transactions && transactions.slp.toFixed(2)) || '0'}%`} key={6} imgUrl={Slp} title={'SLP related transactions'}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <InfoCard value={`${(!!transactions && transactions.axie.toFixed(2)) || '0'}%`} key={7} imgUrl={Axie} title={'AXIE related transactions'}/>
                                </Grid>
                            </>
                        }
                    </>
                }
            </Grid>
        </Container>
  )
}
