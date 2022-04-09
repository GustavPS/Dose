import Styles from './spinner.module.css';

const Spinner = (props) => {
    const {
        className
    } = props;

    return (
        <div className={`${Styles.chase} ${className}`}>
            <div className={Styles.chaseDot}></div>
            <div className={Styles.chaseDot}></div>
            <div className={Styles.chaseDot}></div>
            <div className={Styles.chaseDot}></div>
            <div className={Styles.chaseDot}></div>
            <div className={Styles.chaseDot}></div>
        </div>
    );
}

export default Spinner;