import { FunctionComponent } from 'react';
import styles from './modal.module.css';
import SaveIcon from '@material-ui/icons/Save';

export const Modal = ({isOpen, onClose, children, saveButton, onSave}) => {
    const closeModal = () => {
        isOpen = false;
        onClose();
    }

    return (
        <>
            {isOpen &&
                <div className={styles.modal}>
                    <div className={styles.close} onClick={closeModal}>X</div>
                    {children}
                    {saveButton &&
                        <div className={styles.save} onClick={() => {onSave(); onClose();}}>
                            <SaveIcon />
                            <p>Save</p>
                        </div>
                    }
                </div>
            }
        </>
    )


}