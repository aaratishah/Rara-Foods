import React from 'react';
import {AppBar, Dialog, IconButton, Toolbar, makeStyles, Slide} from "@material-ui/core";
import {CloseCircleFilled} from "@ant-design/icons";
import {Typography} from "antd";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreen = ({title, children, open, handleClose, style = {}}) => {
    const classes = useStyles();

    return (
        <Dialog style={{
        ...style
        }} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton onClick={handleClose} edge="start" color="inherit"  aria-label="close">
                        <CloseCircleFilled  />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
};

export default FullScreen;
