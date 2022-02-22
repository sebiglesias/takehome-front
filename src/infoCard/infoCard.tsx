import {Card, CardContent} from "@mui/material";
import classes from './infoCard.module.scss'

export type CardProps = {
    imgUrl: string
    title: string
    value: string
    subValue?: string
}

export const InfoCard = ({imgUrl, title, value, subValue}: CardProps) => {
    return (
        <Card className={classes.container} variant={'outlined'}>
            <CardContent>
                <div className={classes.header}>
                    <img data-testid={'card-image'} src={imgUrl} alt={'card symbol'} className={classes.img}/>
                    <div className={classes.values}>
                        <p className={classes.value} data-testid={'title-text'}>{`${value} ${title}`}</p>
                        {!!subValue && <span data-testid={'sub-value-text'}>{subValue} USD</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
