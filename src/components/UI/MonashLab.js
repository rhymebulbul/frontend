import classes from './MonashLab.module.css'

const MonashLab = () => {
    return (
        <div className={classes.item}>
            <span className={classes['lineone']}>Monash HUMANISE Lab</span>
            <span className={classes['linetwo']}>Persona Generation Tool</span>
        </div>
    )
}

export default MonashLab;