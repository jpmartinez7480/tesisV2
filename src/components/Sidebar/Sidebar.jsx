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
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Crop from '@material-ui/icons/Crop';
import Timeline from '@material-ui/icons/Timeline';
import Gesture from '@material-ui/icons/Gesture'
import Help from '@material-ui/icons/Help';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Save from '@material-ui/icons/Save';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined'
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/logo.png';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
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

});

class MiniDrawer extends React.Component {
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
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          className={classes.appBar}
        >
        <Toolbar className ={classes.toolbar}>
            <img src={logo} alt = "logo" className={classes.logo}></img>
        </Toolbar>
        </AppBar>
        {/*<Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        > 
          <List className={classes.iconsAction}>
            <ListItem button className={classes.itemAction}>
              <ListItemIcon className = {classes.myIcon}><NoteAdd className = {classes.iconStyle}/></ListItemIcon>
            </ListItem>
            <ListItem button className={classes.itemAction}>
              <ListItemIcon className = {classes.myIcon}><Crop /></ListItemIcon>
            </ListItem>
            <ListItem button className={classes.itemAction}>
              <ListItemIcon className = {classes.myIcon}><FavoriteOutlined /></ListItemIcon>
            </ListItem>
            <ListItem button className={classes.itemAction}>
              <ListItemIcon className = {classes.myIcon}><Save /></ListItemIcon>
            </ListItem>
          </List>
        </Drawer>*/}
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);