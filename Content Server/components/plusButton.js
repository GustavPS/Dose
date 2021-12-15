import { FunctionComponent, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './plusButton.module.css';

export const PlusButton = ({onClick}) => {
    return(
        <div className={styles.plusButton} onClick={() => {onClick()}}>
            <AddIcon/>
        </div>
    )
}