import {Card, CardContent} from "@mui/material";
import classes from './infoCard.module.scss'

export type CardProps = {
    imgUrl: string
    title: string
    value: string
    subValue?: string
}

export const InfoCard = (props: CardProps) => {
    const {imgUrl, title, value, subValue} = props
    return (
        <Card className={classes.container}>
            <CardContent>
                <div className={classes.header}>
                    <img src={imgUrl} alt={'card symbol'} className={classes.img}/>
                    <div className={classes.values}>
                        <p className={classes.value}>{`${value} ${title}`}</p>
                        {!!subValue && <p>{subValue} USD</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
