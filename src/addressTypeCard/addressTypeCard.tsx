import classes from './addressTypeCard.module.scss'
import ScholarHat from '../images/scholarHat.svg'
import Money from '../images/money.svg'
export enum AccountType {
    investor = 'Investor',
    scholar = 'Scholar'
}

export type HeaderCardProps = {
    accountType?: AccountType
}

export const AddressTypeCard = (props: HeaderCardProps) => {
    const {accountType} = props

    const isInvestor = accountType === AccountType.investor

    return (
        <>
            <img className={classes.img} src={isInvestor ? Money : ScholarHat} alt={'Address type image'} />
            <h1>{!!accountType && accountType}</h1>
        </>
    )
}
