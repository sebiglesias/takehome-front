import {Card, CardContent} from "@mui/material";
import classes from './infoCard.module.scss'
export type CardProps = {
    imgUrl: string
    title: string
    value: string
}

export const InfoCard = (props: CardProps) => {
    const {imgUrl, title, value} = props
    return (
        <Card>
            <CardContent>
                <div className={classes.header}>
                    <img src={imgUrl} alt={'card symbol'} className={classes.img}/>
                    <h3>{title}</h3>
                </div>
                <p className={classes.value}>{value}</p>
            </CardContent>
        </Card>
    )
}