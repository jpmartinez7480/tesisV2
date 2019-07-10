import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/logo.png';
import blue from '@material-ui/core/colors/blue';

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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    boxShadow:null,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    //backgroundColor: '#1a2035'
    //backgroundColor: '#002F6C'
    backgroundColor: 'white',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    backgroundColor: 'white',
    height:'auto',
    top:'200px',
    borderRadius:'10px',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7 + 1,
      backgroundColor: '#27293D',
      boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'
    },
  },
  toolbar: {
    display: 'flex',
    /*alignItems: 'center',
    justifyContent: 'flex-end',*/
    padding: '0 8px',
    
    
    ...theme.mixins.toolbar,
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
      marginLeft:'60px',
      marginTop: '15px',
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
    width:'auto',
    height:'64px',
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
      borderBottom: '1px solid #1e88e5'
    },
    cursor:'pointer',
    textAlign:'center',
    padding:'5px'
  }

});

class MiniDrawer extends React.Component {
  state = {
  };

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
            <img src={logo} alt = "logo" className={classes.logo}></img>
            <Grid container justify='flex-end' className = {classes.myNavbar}>
              <Grid item xs={2} style = {{marginRight:'10px'}}>
                <Typography className={classes.linksNavbar}>Preprocesamiento</Typography>
              </Grid>
              <Grid item xs={2}>
              <Typography className={classes.linksNavbar}>Repositorio señales</Typography>
              </Grid>
              <Grid item xs={2}>
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