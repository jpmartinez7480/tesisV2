import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    footer:{
        bottom:0,
        position:'fixed',
        backgroundColor:'#000',
        width:'100%'
    }
})

class Footer extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    
    render(){
        const { classes } = this.props
        return(
            <div className = {classes.footer}>
                <p>Depto de ing informática</p>
            </div>
        )
    }
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default (withStyles(styles)(Footer));