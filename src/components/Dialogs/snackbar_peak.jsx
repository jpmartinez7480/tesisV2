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
    info: {
        backgroundColor: '#1976d2',
        color:'#fff',
        margin:'8px'
    }
})

class SnackbarPeak extends Component{
    constructor(props){
        super(props)
        this.state = {
            open: this.props.open_snackbar_peak,
            message:this.props.message_snackbar
        }
    }

    handleCloseSnackbarPeak = () => {
       this.setState({open:false})
       this.props.handleCloseSnackbarPeak()
    }

    componentDidUpdate(prevProps,prevState){
      
      if(this.props.open_snackbar_peak !== prevProps.open_snackbar_peak){
        this.setState({open:this.props.open_snackbar_peak})
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
                onClose={this.handleCloseSnackbarPeak}
                >
                <SnackbarContent
                  onClose={this.handleCloseSnackbarPeak}
                  className={classes.info}
                  message={this.props.message_snackbar}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleCloseSnackbarPeak}
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
                />
              </Snackbar>
        )
    }
}

SnackbarPeak.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default(withStyles(styles)(SnackbarPeak));