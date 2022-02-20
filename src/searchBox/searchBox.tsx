import React, {useCallback, useMemo, useState} from "react"
import TextField from "@mui/material/TextField"
import {useDispatch} from "react-redux"
import {isValidRoninAddress} from "../roninAddress/roninAddress";
import {setWalletHash} from "../address/addressSlice";
import classes from './searchBox.module.scss'

export type SearchBoxProps = {
    onSubmit: (hash: string) => void
}

export const SearchBox = (props: SearchBoxProps) => {
    const [hash, setHash] = useState<string>('')
    const dispatch = useDispatch()
    const isValidAddress = useCallback((text?: string) => isValidRoninAddress(text), [])

    const onKeyPress = useCallback((event) => {
        if (event.key.toLowerCase() === 'enter' && isValidAddress(hash)) {
            dispatch(setWalletHash(hash))
            props.onSubmit(hash)
        }
    }, [isValidAddress, dispatch, hash])

    const onChange = useCallback((event) => {
        setHash(event.target.value)
    }, [setHash])

    const isValid = useMemo(() => isValidAddress(hash), [hash])
    const hasError = hash.length > 0 && !isValid

    return (
      <TextField
          className={classes.textField}
          error={hasError}
          id={'searchBox'}
          label={'Ronin Wallet search box'}
          variant={'outlined'}
          helperText={hasError && 'Invalid ronin address'}
          onChange={onChange}
          onKeyPress={onKeyPress}
          color={!hasError && hash.length > 0 ? 'success' : 'info'}
          placeholder={'ronin:6d71...589a'}
      />
    )
}
