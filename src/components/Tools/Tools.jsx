import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Crop from '@material-ui/icons/Crop';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Save from '@material-ui/icons/Save';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined'
import Avatar from '@material-ui/core/Avatar';
import Note from '@material-ui/icons/Note';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux'
import { loadSignal }  from '../../actions/actions.signal'
import { setSignalVSFD } from '../../actions/actions.vsfd'
import { setSignalVSFI } from '../../actions/actions.vsfi'
import { setSignalPSA } from '../../actions/actions.psa'
import { setSignalCO2 } from '../../actions/actions.co2'
import { setXPoints } from '../../actions/actions.xpoints'
import { setSignalReady } from '../../actions/actions.signalReady'

const styles = theme => ({
  root: {
    display: 'block',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  drawer: {
   
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7 + 1,
      backgroundColor: '#27293D',
      boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)',
      overflowX: 'hidden',
      height:'auto',
      top:'200px',
      borderRadius:'10px',
    },
  },
  myIcon:{
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
  iconsAction:{
    marginTop:'20px',
  },
  itemAction: {
    marginBottom:'15px',
  },
  avatar: {
    color:'#fff',
    backgroundColor:blue[500]
  },

});

class Tools extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      filename: null,
      signal: [{"V1":"","V2":"","V3":"","V4":"","V5":"","V6":"","V7":"","V8":"","V9":"","V10":"","V11":"","V12":"",}],
      vsfi_signal:[{"V3":"1"}],
      vsfd_signal:[{"V2":"1"}],
      psa_signal: [{"V4":"1"}],
      co2_signal: [{"V6":"1"}],
      x_points_vfs:[],
      isReadySignal: false,
      loadingGraph:false
    }
    this.onChange = this.onChange.bind(this)
    this.handleUploadSignal = this.handleUploadSignal.bind(this)

  }
  
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleOpen = () => {
    this.setState({open:true})
  }

  handleClose = () => {
    this.setState({open:false})
  }

  onChange(e){
    this.setState({filename:e.target.files[0]})
  }

  fetchVFS(json){
    var vsfi = []
    var vsfd = []
    var psa = []
    var co2 = []
    var x_points = []
    for(var i = 1; i < json.length; i++){
        vsfd.push(Number(json[i].V3))
        vsfi.push(Number(json[i].V4))
        psa.push(Number(json[i].V5))
        co2.push(Number(json[i].V6))
        x_points.push(i)
    }
    this.setState({vsfi_signal:vsfi}, () => this.props.setSignalVSFI(this.state.vsfi_signal))
    this.setState({vsfd_signal:vsfd}, () => this.props.setSignalVSFD(this.state.vsfd_signal))
    this.setState({psa_signal: psa}, () => this.props.setSignalPSA(this.state.psa_signal))
    this.setState({co2_signal: co2}, () => this.props.setSignalCO2(this.state.co2_signal))
    this.setState({x_points_vfs:x_points}, () => this.props.setXPoints(this.state.x_points_vfs))
    this.setState({isReadySignal:true}, () => this.props.setSignalReady(this.state.isReadySignal))
  }

  handleUploadSignal(event){
    event.preventDefault()
    this.setState({loadingGraph:true})
    const filename = this.state.filename
    const formData = new FormData(event.target)
    formData.append('filename',filename)
    console.log(filename)
    this.props.loadSignal(formData).then(() => this.fetchVFS(this.props.signal_global))
  };

  dialogSelectSignal(){
    const { classes } = this.props
    return(
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
    )
  }


  render() {
    const { classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
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
        <Drawer
          variant="permanent"
          classes={{paper: classNames(classes.drawer)}}
        > 
          <List className={classes.iconsAction}>
            <ListItem button className={classes.itemAction}>
              <ListItemIcon className = {classes.myIcon} onClick = {this.handleOpen}><NoteAdd className = {classes.iconStyle}/></ListItemIcon>
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
        </Drawer>
      </div>
    );
  }
}

Tools.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


function mapStateToProps(state){
return{
    signal_global: state.signal_global,
    vsfd_global: state.vsfd_global,
    vsfi_global: state.vsfi_global,
    psa_global: state.psa_global,
    co2_global: state.co2_global,
    x_points_global: state.x_points_global,
    signal_state_global: state.isReadySignal
  }
}

const mapDispatchToProps = (dispatch) => ({
      loadSignal: formData => dispatch(loadSignal(formData)),
      setSignalVSFD: vfsd => dispatch(setSignalVSFD(vfsd)),
      setSignalVSFI: vfsi => dispatch(setSignalVSFI(vfsi)),
      setSignalPSA: psa => dispatch(setSignalPSA(psa)),
      setSignalCO2: co2 => dispatch(setSignalCO2(co2)),
      setXPoints: points => dispatch(setXPoints(points)),
      setSignalReady: booleanSignal => dispatch(setSignalReady(booleanSignal))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Tools));