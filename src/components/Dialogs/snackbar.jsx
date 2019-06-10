import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({

    close: {
        padding: '5px',
    },
    error: {
        backgroundColor: '#d32f2f',
        color:'#fff',
        margin:'8px'
    }
})

class SnackbarWarning extends Component{
    constructor(props){
        super(props)
        this.state = {
            open: this.props.open_snackbar,
            message:this.props.message_snackbar
        }
    }

    handleCloseSnackbar = () => {
       this.setState({open:false})
       this.props.handleCloseSnackbar()
    }

    componentDidUpdate(prevProps,prevState){
      
      if(this.props.open_snackbar !== prevProps.open_snackbar){
        this.setState({open:this.props.open_snackbar})
      }
    }

    render(){
        const { classes } = this.props
        return(
            <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={5000}
                onClose={this.handleCloseSnackbar}
                >
                <SnackbarContent
                  onClose={this.handleCloseSnackbar}
                  className={classes.error}
                  message={this.props.message_snackbar}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleCloseSnackbar}
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
                />
              </Snackbar>
        )
    }
}

SnackbarWarning.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default(withStyles(styles)(SnackbarWarning));