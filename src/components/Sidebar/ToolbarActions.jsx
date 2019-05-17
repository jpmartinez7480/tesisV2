import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearScale from '@material-ui/icons/LinearScale';
import Crop from '@material-ui/icons/Crop';
import Timeline from '@material-ui/icons/Timeline';
import Gesture from '@material-ui/icons/Gesture'
import Help from '@material-ui/icons/Help';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';

import logo from '../../assets/logo.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'block',
    float:'right',
    marginTop: '20px',
    marginRight: theme.spacing.unit*6,
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    zIndex:0,
    backgroundColor:'#fafafa',
    boxShadow:'none',
    borderBottomColor: '#ED7602',
    borderBottomStyle: 'solid',
    //borderTopColor:'#303E47',
    //borderTopStyle:'solid',
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
    backgroundColor: 'white'
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
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
      backgroundColor: '#303E47'
    },
  },
  toolbar: {
    display: 'block',
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
    marginTop:'140px',
    marginLeft:'5px',
  },
  itemAction: {
    
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
    float:'right'
  },
  actions:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: '#303E47',

  }

});

class ToolbarActions extends React.Component {
  state = {
    open: false,
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  handleDrawerOpen = () => {
    this.setState({ open: false });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className = {classes.root}>
            <Grid container spacing={24}>
            <Grid item xs = {3}>
                <div className = {classes.actions}>Cargar</div>
            </Grid>
            <Grid item xs = {3}>
            <div className = {classes.actions}>Cortar</div>
            </Grid>
            <Grid item xs = {3}>
            <div className = {classes.actions}>Filtros</div>
            </Grid>
            <Grid item xs = {3}>
            <div className = {classes.actions}>Latidos</div>
            </Grid>
        </Grid>
        </div>
        
    );
  }
}

export default  withStyles(styles)(ToolbarActions);
