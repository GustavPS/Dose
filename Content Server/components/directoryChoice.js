import { FunctionComponent, useState, useEffect } from 'react';
import styles from './directoryChoice.module.css';
import FolderIcon from '@material-ui/icons/Folder';
import {Modal} from './modal';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import validateDashboardAccess from '../lib/validateDashboardAccess';

const path = require('path');

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));


let currentDir = "/";

export const DirectoryChoice = ({onError, onRemove, onValueSaved, onTypeChanged, onNameChanged}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [directories, setDirectories] = useState([]);
    const [depth, setDepth] = useState(0);
    const [buttonText, setButtonText] = useState("Choose directory");

    const classes = useStyles();

    const openDialog = () => {
        setDialogOpen(true);
    }

    const onClose = () => {
        setDialogOpen(false);
        setDirectories([]);
        currentDir = '/';
        setDepth(0);
    }

    const onSave = () => {
        if (onValueSaved != undefined) {
            onValueSaved(currentDir);
        }
        setButtonText(currentDir);
    }

    const changeDirectory = (folder) => {
        const oldDir = currentDir;
        console.log(folder);
        currentDir = path.join(currentDir, folder);

        getDirectories(currentDir)
        .then(status => {
            setDepth(depth + 1);
        })
        .catch(err => {
            currentDir = oldDir;
            onError(err);
        })
    }

    const backDirectory = () => {
        currentDir = path.join(currentDir, '../');
        setDepth(depth - 1);
        getDirectories(currentDir);
    }

    const getDirectories = (path) => {
        return new Promise((resolve, reject) => {
            validateDashboardAccess().then((token) => {
                const url = encodeURI(`/api/dashboard/setup/directories?path=${currentDir}&token=${token}`.replace('+', '%2B'));
                fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(json => {
                    setDirectories(json.directories);
                    resolve(0);
                })
                .catch(response => {
                    reject(response.status);
                })
            });
        });
    }

    const typeChanged = (event) => {
        console.log("typechanged: " + event.target.value)
        if (onTypeChanged != undefined) {
            onTypeChanged(event.target.value);
        }
    }

    const nameChanged = (event) => {
        if (onNameChanged != undefined) {
            onNameChanged(event.target.value);
        }
    }

    useEffect(() => {
        getDirectories('/');
    }, [isDialogOpen])

    return(
        <>
            <button onClick={openDialog} className={styles.openButton}>{buttonText}</button>
            <input className={styles.name} type="text" placeholder="Name" onChange={nameChanged}/>
            <select id="type" name="libraryType" className={styles.typeDropdown} onChange={typeChanged}>
                <option value="shows">Shows</option>
                <option value="movies">Movies</option>
            </select>

            <div onClick={() => {onRemove()}}  className={styles.clearIcon}>
                <ClearIcon/>
            </div>
            <br></br>

            <Modal isOpen={isDialogOpen} onClose={onClose} onSave={onSave} saveButton={true}>
                <Typography variant="h6" className={classes.title}>
                    Choose folder
                </Typography>
                <List dense={false} className={styles.directoryList}>
                    {directories.map((dir) => (
                       <ListItem className={styles.directoryItem} onClick={() => changeDirectory(dir)} key={dir}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={dir}
                            />
                        </ListItem>
                    ))}
                    {depth != 0 &&
                        <ListItem className={styles.directoryItem} onClick={() => backDirectory()}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={'..'}
                            />
                        </ListItem>
                    }

 
                </List>
            </Modal>
        </>
    )
}