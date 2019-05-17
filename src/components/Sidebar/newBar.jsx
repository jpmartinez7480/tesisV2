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
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import logo from '../../assets/logo.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'block',
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    zIndex:10,
    backgroundColor:'#fafafa',
    boxShadow:'none',
    borderBottomColor: '#ED7602',
    borderBottomStyle: 'solid',
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
    float:'left'
  },
  menu:{
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        marginTop:'8px',
        float:'right'
      },
  },
  menuIcon:{
      marginRight:'10px',
      color:'#757575'
  }

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
            <div style ={{flexGrow:1}}>
                <div className={classes.menu}>
                    <IconButton className = {classes.menuIcon}>
                        <Help/>
                    </IconButton>
                    <IconButton className = {classes.menuIcon}>
                        <Settings/>
                    </IconButton>
                    <IconButton className = {classes.menuIcon}>
                        <Person/>
                    </IconButton>

                </div>
                
            </div>
            
        </Toolbar>
        </AppBar>
        
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);