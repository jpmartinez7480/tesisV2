import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Note from '@material-ui/icons/Note';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class SimpleDialog extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
  
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
  
      return (
        <Dialog 
            maxWidth="sm"
            fullWidth={true}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Seleccione señal a preprocesar</DialogTitle>
            <FormControl className={classes.formControl}>
                <form onSubmit={this.handleUploadSignal} className = {classes.form}>                                
                    {!this.state.loadingGraph ? <Note className = {classes.iconFile}/> 
                        : <LinearProgress classes={{
                            colorPrimary: classes.linearColorPrimary,
                            barColorPrimary: classes.linearBarColorPrimary}}
                    />}
                    <input type = "file" onChange={this.onChange} />
                    <Button type = "submit" variant="contained" className = {classes.myPrimaryColor}>Cargar</Button>
                </form>
            </FormControl>
        </Dialog>
      );
    }
  }
  
  SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
  };