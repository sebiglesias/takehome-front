import classes from './addressTypeCard.module.scss'
import ScholarHat from '../images/scholarHat.svg'
import Money from '../images/money.svg'
import {Button, IconButton, Link, Tooltip, Typography} from '@mui/material'
import QuestionMark from '@mui/icons-material/QuestionMark';

export enum AccountType {
    investor = 'Investor',
    scholar = 'Scholar'
}

export type HeaderCardProps = {
    accountType?: AccountType
    walletHash: string
}

export const AddressTypeCard = (props: HeaderCardProps) => {
    const {accountType, walletHash} = props

    const isInvestor = accountType === AccountType.investor

    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <img className={classes.img} src={isInvestor ? Money : ScholarHat} alt={'Account address type'} />
                <h1>{!!accountType && accountType}</h1>
                <Tooltip
                    placement={'right'}
                    title={
                        <Typography>
                            {isInvestor ?
                                'An investor is someone who may or may not play the Axie infinity game but is regarded' +
                                ' as having a role more related to investing. They will probably have a role of breeders, ' +
                                'that trade AXIEs and have holdings and transactions not related to SLP.'
                                :
                                'A scholar is someone who plays the Axie Infnity game. It usually has a high percentage of ' +
                                'transactions related to SLP and/or has some SLP holdings'
                            }
                        </Typography>
                    }
                >
                    <IconButton color={'primary'} component={'span'}>
                        <QuestionMark />
                    </IconButton>
                </Tooltip>
            </div>
            <Button variant={'outlined'}>
                <Link underline={'none'} target={'_blank'} href={`https://explorer.roninchain.com/address/${walletHash}`}>View Ronin Explorer wallet</Link>
            </Button>
        </div>
    )
}
