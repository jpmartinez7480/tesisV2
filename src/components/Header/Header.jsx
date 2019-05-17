import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Settings from '@material-ui/icons/Settings';
import logo from '../../assets/logo.png';

const ITEM_HEIGHT = 48;

const options = [
    'Cortar',
    'Filtrar',
    'Identificar latidos',
    'Exportar señal'
  ];

const styles = {
    root: {
      flexGrow: 1,
    },
    logo:{
        width:'auto',
        height:'64px',
        float:'right'
    },
    appBar: {
        zIndex:0,
        backgroundColor:'#fafafa',
        boxShadow:'none',
        borderBottomColor: '#ED7602',
        borderBottomStyle: 'solid',
      },
      toolbar: {
        display: 'block',
        padding: '0 8px',
      },
      floatBtn:{
          backgroundColor: '#303E47'
      }

  };


class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            anchorEl: null,
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

    render(){
        const { classes } = this.props
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <div className = {classes.root}>
                <AppBar position = "static" className = {classes.appBar}>
                    <Toolbar className ={classes.toolbar}>
                        <img src={logo} alt = "logo" className={classes.logo}></img>
                    </Toolbar>
                </AppBar>
                
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);