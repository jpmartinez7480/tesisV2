import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/logo2.png';
import logo_biomedica from '../../assets/logo_biomedica.png';
import blue from '@material-ui/core/colors/blue';

import { Route, Switch, Redirect, NavLink,Link } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'block',
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    zIndex:0,
    backgroundColor:'#1E1E2F',
    boxShadow:'none',
    //borderBottom: '1px solid #ED7602',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  
  toolbar: {
    display: 'flex',
    padding: '0 8px',
    marginTop:'10px',
    marginRight:'15px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  myIcon:{
      //color: '#002F6C',
      //color: '#007FC6',
      color: 'white',
      flexDirection: 'column',
  },
  listConfig: {
      bottom:0,
      position:'absolute',
      marginLeft:'5px'
  },
  grow:{
      flexGrow:1
  },
  title: {
      marginLeft:'64px',
      marginTop: '25px',
      fontWeight: 300,
      letterSpacing: '1.4px',
      //color: '#002F6C'
      color: 'white'
      //color: '#007FC6'
  },
  iconsAction:{
    marginTop:'20px',
  },
  itemAction: {
    marginBottom:'15px',
  },
  subtitleIcon:{
    fontWeigth:300,
    //color:'#757575',
    color: 'white',
    marginTop:'5px',
    fontSize:'12px',
  },
  logo:{
    width:'10%',
    height:'40px',
    margin:'12px'
  },
  logoBiomedica:{
    width:'4%',
    height:'50px',
    margin:'15px'
  },
  avatar: {
    color:'#fff',
    backgroundColor:blue[500]
  },
  myNavbar:{
    marginTop:'5px'
  },
  linksNavbar:{
    fontSize: '16px',
    fontWeight: 300,
    color: '#9a9a9a',
    "&:hover":{
      borderBottom: '1px solid #ED7602'
    },
    cursor:'pointer',
    textAlign:'center',
    padding:'5px'
  },
  link:{
    textDecoration:'none',
    color: '#9a9a9a', 
  },
  itemGrid:{
    
    
  }

});
const dudUrl = 'javascript:;';
class MiniDrawer extends React.Component {
  state = {
  };

  componentDidMount(){

  }

  render() {
    const { classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          className={classes.appBar}
        >
        <Toolbar className ={classes.toolbar}>
            <img src={logo_biomedica} alt = "logo" className={classes.logoBiomedica}></img>
            <p style = {{color:'#9a9a9a', fontWeight:300}}>Laboratorio Biomédica USACH</p>
            <Grid container justify='flex-end' className = {classes.myNavbar}>
              <Grid item xs={2} className = {classes.itemGrid}>
                <Typography className={classes.linksNavbar}>
                  <NavLink to = "/home/signal" className = {classes.link} activeClassName="active" activeStyle={{color:'#ED7602'}}>Preprocesamiento</NavLink>
                </Typography>
              </Grid>
              <Grid item xs={2} className = {classes.itemGrid}>
              <Typography className={classes.linksNavbar}>
                <NavLink to = "/home/repository" className = {classes.link} activeStyle={{color:'#ED7602'}}>Señales</NavLink>
              </Typography>
              </Grid>
              <Grid item xs={2} className = {classes.itemGrid}>
                <Typography className={classes.linksNavbar}>Ayuda</Typography>
              </Grid>
            </Grid>
        </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniDrawer);