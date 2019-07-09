import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/icons/Timeline';
import Note from '@material-ui/icons/Note';
import Axios from 'axios';
import InputBase from '@material-ui/core/InputBase';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import echart_options from '../../config/echart_configs';
import echart_colors from '../../config/echart_colors';
import echart_animation from '../../config/echart_animation';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Crop from '@material-ui/icons/Crop';
import CropFree from '@material-ui/icons/CropFree';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Visibility from '@material-ui/icons/Visibility';
import Save from '@material-ui/icons/Save';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined'
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import SnackbarWarning from '../../components/Dialogs/snackbar'
import SnackbarPeak from '../../components/Dialogs/snackbar_peak'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Signal from '../../components/Card/Signal'
import History from '../../components/Card/History'
import { loadSignal }  from '../../actions/actions.signal'
import { setSignalVSFD } from '../../actions/actions.vsfd'
import { setSignalVSFI } from '../../actions/actions.vsfi'
import { setSignalPSA } from '../../actions/actions.psa'
import { setSignalCO2 } from '../../actions/actions.co2'

import detectHeartbeatIcon from '../../assets/icons/detect_heartbeat2.png'
import syncHeartBeatIcon from '../../assets/icons/sync_heartbeat2.png'
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    rootChecked:{
      color:blue[700],
      '&$checked': {
        color: blue[600],
      },
    },
    checked:{},
    check:{},
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign:'center',
      backgroundColor: '#27293D',
      marginRight:'15px',
      boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'
    },
    myGrid: {
      marginTop: '40px',
      marginLeft: theme.spacing.unit * 10 + 1,
      padding:'5px',
      width: '93%',
      justifyContent:'center'
    },
    myStepIcon: {
      color: '#002F6C'
    },
    myItemGrid:{
      backgroundColor: 'white'
    },
  
    gridDecoration: {
      backgroundColor: '#27293D',
     
      padding:'15px',
      borderRadius:'5px',
      boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'
    },
    stepText:{
      fontWeigth:400,
      color:'#757575'
    },
    nextStep: {
      marginTop: '10px',
      marginBottom: '10px'
    },
    myPrimaryColor:{
      color: 'white',
      backgroundColor: '#3358F4',
      marginTop: '10px',
      marginBottom: '10px'
    },
    formControl: {
      margin: theme.spacing.unit * 3,
      minWidth: 120,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
      flexDirection:'row'
    },
    myIcon2:{
        fill: '#9a9a9a',
        fontSize: '80px'
    },
    selectTitle:{
        fontWeight: 300,
        lineHeight: 1.4,
        letterSpacing: '1.4px !important',
        color: '#d6d6d6'
    },
    selectSignal:{
        textAlign:'center',
        marginTop:'50px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      iconFile:{
          transform:'rotate(270deg)',
          fill: '#757575',
          fontSize: '90px',
          marginLeft: '90px',
          marginBottom: '10px'
      },
      myProgress:{
          marginBottom: '10px'
      },
      linearColorPrimary: {
        backgroundColor: '#ED7602',
        marginBottom: '10px'
      },
      linearBarColorPrimary: {
        backgroundColor: '#EABB8C',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      textField: {
        width: 230,
        color: '#9a9a9a'
      },
      describeSignal:{
        color:'#9a9a9a',
        letterSpacing:'1.1px',
        fontSize:'15px'
      },
      myCard:{
        backgroundColor:'#27293D',
        height:'250px',
        overflowY:'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(30,30,47,.8)',
          outline: '1px solid slategrey',
          borderRadius:'30px'
        }
      },
      myCardTitle:{
        textAlign:'center'
      },
      textSignal:{
        color:'#9a9a9a',
        marginTop:'2px',
        letterSpacing:'1.1px',
        fontSize:'15px',
        marginLeft:'10px'
      },
      textSelected:{
        color:'#fff',
        marginTop:'2px',
        letterSpacing:'1.1px',
        fontSize:'15px',
        marginLeft:'10px'
      },
      selected:{
        backgroundColor: '#ED7602 !important',
        color:'#fff'
      },
      menuItem:{
        '&:focus':{
          backgroundColor: '#ED7602',
          '& $primary':{
            color: '#fff'
          }
        }
      },
      primary:{},
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
      input:{
        margin:'10px'
      },
      btn_peaks:{
        color: '#fff',
        backgroundColor: '#3358F4',
        float:'right',
        marginRight:'10px',
        marginBottom: '10px',
      }
  })

const text_hampel = 'Debe ingresar valor de ventana y thresold para usar este filtro. Para rapidez los valores por defecto se muestran'
const text_butterworth = 'Debe ingresar el orden y la frecuencia de corte para usar este filtro. Recuerde que las señales utilizadas son de 100 Hz.'
const title_hampel = "Filtro Hampel"
const title_butterworth = "Filtro Butterworth"
const title_hermite = "Hermite's Spline Interpolation"
const text_hermite = "Debe ingresar el porcentaje de puntos altos y bajos a filtrar de la señal. Se recomienda un valor de 1%"
const title_median = "Filtro Mediana"
const text_median = "Debe ingresar el orden de mediana para este filtro, para una señal de 100 Hz se recomienda orden 5."
const title_automatic = "Filtro Automatic"
const text_automatic = "Debe ingresar los valores de los 3 filtros que serán usados (Hermite-Hampel-Butterworth). Los valores mostrados son los recomendados."

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            filename: null,
            name_signal:'',
            signal: [{"V1":"","V2":"","V3":"","V4":"","V5":"","V6":"","V7":"","V8":"","V9":"","V10":"","V11":"","V12":"",}],
            vsfi_signal:[{"V3":"1"}],
            vsfd_signal:[{"V2":"1"}],
            psa_signal: [{"V4":"1"}],
            co2_signal: [{"V6":"1"}],
            signals_history:[],
            history:[],
            times_checked:true,
            x_points_vfs:[],
            times:[],
            index_key: 1,
            checked:[1],
            open: false,
            isReadySignal: false,
            loadingGraph: false,
            filter: '',
            value_order_hermite: 1,
            value_window_hampel: 10,
            value_thresold_hampel:1.6,
            value_order_butter:4,
            value_slice_butter:20,
            value_order_median: 5,
            v1:'',
            v2:'',
            signal_time:0,
            indexSignal:0,
            indexSignalToDelete:0,
            colorSignal: '',
            serie_vfsd: [],
            serie_vfsi: [],
            serie_psa: [],
            serie_co2: [],
            signal_backup_cut:[],
            signal_history_backup:[],
            heart_beats_detected: [],
            is_heart_beat_detected:false,
            signal_is_cut: false,
            is_signal_sync: false,
            serie_signals_history:[],
            start_point_cut:0,
            end_point_cut:0,
            data_filter_VFS: [{name:'VFSD',textStyle:echart_options.textStyle}],
            data_filter_VFSI: [{name:'VFSI',textStyle:echart_options.textStyle}],
            data_filter_PSA: [{name:'PSA',textStyle:echart_options.textStyle}],
            data_filter_CO2: [{name:'EtCO2',textStyle:echart_options.textStyle}],
            open_hermite: false,
            open_median: false,
            open_hampel: false,
            open_butterworth: false,
            open_automatic: false,
            openWait: false,
            open_dialog_clean: false,
            open_dialog_delete_signal:false,
            open_dialog_cut:false,
            open_dialog_cut_times: false,
            open_snackbar:false,
            open_snackbar_peak:false,
            openDialogFullHistory: false,
            openBeat: false,
            open_confirm_beat: false,
            open_sync_signals: false,
            open_sync_signals_wait: false,
            open_confirm_save: false,
            open_pcc_rap: false,
            open_wait_pccrap: false,
            open_upstroke_wait: false,
            message_snackbar:'',
            title_filter: '',
            text_filter:'',
            helper_text:'Pase el mouse sobre un ícono para ver detalle',
            filters: [
              
              {
                value:'automatic',
                label: 'Automatic'
              },
              {
                value:'hermite',
                label: 'Hermite Spline Interpolation'
              },
              {
                value:'hampel',
                label: 'Hampel'
              },
              {
                value:'butterworth',
                label: 'Butterworth'
              },
              {
                value:'median',
                label: 'Mediana'
              },
              
            ],
            brushArea:{},
            headerFile:{},
            etco2_echart:'block',
            RL:false,
            RE:false,
            sync_data:[],
            line: true,
            cnt_click_peak: 0,
            peak_selected: {},
            peak_modify_by_signal:0

        }
        this.onChange = this.onChange.bind(this)
        this.handleUploadSignal = this.handleUploadSignal.bind(this)
        this.handleSendFilter = this.handleSendFilter.bind(this)
        this.splitSignalTimes = this.splitSignalTimes.bind(this)
        this.getPCCRAP = this.getPCCRAP.bind(this)
    }

    componentDidUpdate(){
        if(this.state.isReadySignal){
            let echart1 = this.refs.echarts_react_1.getEchartsInstance();
            let echart2 = this.refs.echarts_react_2.getEchartsInstance();
            let echart3 = this.refs.echarts_react_3.getEchartsInstance();
            let echart4 = this.refs.echarts_react_4.getEchartsInstance(); 
            echart1.group = 'group1';
            echart2.group = 'group1';
            echart3.group = 'group1';
            echart4.group = 'group1';
            //echarts.connect('group1');
        }
        
    }

    handleOpenHermite = () => {
      this.setState({open_hermite:true})
    }

    handleOpenMedian = () => {
      this.setState({open_median:true})
    }

    handleOpenHampel = () => {
      this.setState({open_hampel:true})
    }

    handleOpenButterworth = () => {
      this.setState({open_butterworth:true})
    }

    handleOpenAutomatic = () => {
      this.setState({open_automatic: true})
    }

    handleOpenWait = () => {
      this.setState({openWait: true})
    }

    handleOpenBeat = () => {
      this.setState({openBeat: true},()=>{this.handleCloseConfirmBeat()})
    }

    handleOpenConfirmBeat = () => {
      this.setState({open_confirm_beat:true})
    }

    handleOpenSyncSignals = () => {
      this.setState({open_sync_signals: true})
    }

    handleOpenSyncSignalsWait = () => {
      this.setState({open_sync_signals_wait: true})
    }

    handleOpenPCCRAP = () => {
      this.setState({open_pcc_rap:true})
    }
    
    handleOpenWaitPCCRAP = () => {
      this.setState({open_wait_pccrap: true})
    }

    handleOpenUpstrokeWait = () => {
      this.setState({open_upstroke_wait: true})
    }

    handleOpenSave = () => {
      this.setState({open_confirm_save:true})
    }

    handleOpenDialogDeleteSignal = () => {
      this.setState({open_dialog_delete_signal: true})
    }

    handleOpenDialogCut = () => {
      this.setState({open_dialog_cut:true})
    }

    handleOpenDialogCutTime = () => {
      this.setState({open_dialog_cut_times:true})
    }

    handleCloseHermite = () => {
      this.setState({open_hermite: false})
    }

    handleCloseMedian = () => {
      this.setState({open_median: false})
    }

    handleCloseHampel = () => {
      this.setState({open_hampel: false})
    }

    handleCloseButterworth = () => {
      this.setState({open_butterworth: false})
    }

    handleCloseAutomatic = () => {
      this.setState({open_automatic: false})
    }

    handleCloseWait = () => {
      this.setState({openWait: false})
    }

    handleCloseBeat = () => {
      this.setState({openBeat: false})
    }

    handleCloseConfirmBeat = () => {
      this.setState({open_confirm_beat:false})
    }

    handleCloseSyncSignals = () => {
      this.setState({open_sync_signals: false})
    }

    handleCloseUpstrokeWait = () => {
      this.setState({open_upstroke_wait: false})
    }

    handleCloseConfirmSave = () => {
      this.setState({open_confirm_save: false})
    }

    handleCloseSyncSignalsWait = () => {
      this.setState({open_sync_signals_wait: false})
    }

    handleClosePCCRAP = () => {
      this.setState({open_pcc_rap:false})
    }

    handleCloseWaitPCCRAP = () => {
      this.setState({open_wait_pccrap: false})
    }

    handleCloseDialogDeleteSignal = () => {
      this.setState({open_dialog_delete_signal:false})
    }

    handleCloseDialogCut = () =>{
      this.setState({open_dialog_cut:false})
    }

    handleCloseDialogCutTime = () => {
      this.setState({open_dialog_cut_times:false})
    }

    handleCloseSnackbar = () =>{
      this.setState({open_snackbar:false})
    }

    handleCloseSnackbarPeak = () => {
      this.setState({open_snackbar_peak: false})
    }

    handleOpenDialogFullHistory = () => {
      this.setState({openDialogFullHistory: true})
    }

    handleCloseDialogFullHistory = () => {
      this.setState({openDialogFullHistory:false})
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    
    handleChangeInput = name => event => {
      this.setState({ [name]: event.target.value });
    };
    
    handleChangeInputTime = name => event => {
        if(event.target.value.length === 2)
          this.setState({ [name]: event.target.value+':'});
        else if(event.target.value.length === 5)
          this.setState({ [name]: event.target.value+':'});
        else if(event.target.value.length === 8)
          this.setState({ [name]: event.target.value+':'});
        else
        this.setState({ [name]: event.target.value});
      
    }

    handleClickOpen = () => {
        this.setState({ loadingGraph:false,open_dialog_clean: false,open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    onChange(e){
      this.setState({filename:e.target.files[0]})
    }

   

    changeSelectedSignal=index=>{
      this.setState({indexSignal:index})
    }

    chooseSignalToDelete=index=>{
      this.setState({indexSignalToDelete:index},()=>{this.handleOpenDialogDeleteSignal()})
    }

    FullHistory=index=>{
      this.setState({indexSignalToDelete:index},()=>{this.handleOpenDialogFullHistory()})
    }

    ConfirmSave=index=>{
      this.setState({indexSignalToDelete:index},()=>{this.handleOpenSave()})
    }

    deleteSignal = () =>{
      if(!this.state.is_heart_beat_detected){
        var serie_vfsd_copy = [...this.state.serie_vfsd]
        var aux = this.state.is_signal_cut ? this.state.indexSignalToDelete : this.state.indexSignalToDelete+1
        var serie_vfsi_copy = [...this.state.serie_vfsi]
        var serie_psa_copy = [...this.state.serie_psa]
        var serie_co2_copy= [...this.state.serie_co2]
        var history_copy = [...this.state.history]
        var signals_history_copy = [...this.state.signals_history]
        serie_vfsd_copy.splice(aux,1)
        serie_vfsi_copy.splice(aux,1)
        serie_psa_copy.splice(aux,1)
        serie_co2_copy.splice(aux,1)
        if(this.state.is_signal_cut)
          history_copy.splice(aux,1)
        else
          history_copy.splice(aux-1,1)
        signals_history_copy.splice(aux,1)
        this.setState({indexSignalToDelete:0,indexSignal:0,serie_vfsd:serie_vfsd_copy,serie_vfsi:serie_vfsi_copy,serie_psa:serie_psa_copy,serie_co2:serie_co2_copy,history:history_copy,signals_history:signals_history_copy},()=>{
          this.updateOptions()
          this.handleCloseDialogDeleteSignal()
        })
      }
      else{
        var serie_vfsd_copy_backup = this.state.serie_signals_history[0]
        var serie_vfsi_copy_backup = this.state.serie_signals_history[1]
        var serie_psa_copy_backup = this.state.serie_signals_history[2]
        var serie_co2_copy_backup = this.state.serie_signals_history[3]
        var history_copy_backup = [...this.state.history]
        var signals_history_copy_backup = [...this.state.signal_history_backup]
        history_copy_backup.splice(this.state.indexSignalToDelete,1)
        this.setState({
              indexSignalToDelete:0,
              indexSignal:0,
              etco2_echart:'block',
              serie_vfsd:serie_vfsd_copy_backup,
              serie_vfsi:serie_vfsi_copy_backup,
              serie_psa:serie_psa_copy_backup,
              serie_co2:serie_co2_copy_backup,
              history:history_copy_backup,
              signals_history:signals_history_copy_backup,
              is_heart_beat_detected: false
            },
            ()=>{
            this.updateOptions()
            this.handleCloseDialogDeleteSignal()
          })
      }
      
      
    }

    getAutomaticFilter(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]
      let rate_aux = this.state.headerFile[0].header[3].split(':')[1]
      let rate = ''
      for(var i = 0; rate_aux[i] != 'H'; i++)
        rate+=rate_aux[i]
      var obj = {
        listaSenal:JSON.stringify(signal_to_filter),
        order_hermite:parseInt(this.state.value_order_hermite),
        window_hampel:parseInt(this.state.value_window_hampel),
        thresold_hermite:parseFloat(this.state.value_thresold_hampel),
        order_butter:parseInt(this.state.value_order_butter),
        cut_butter:parseFloat(this.state.value_slice_butter),
        rate: parseInt(rate)
      }
      
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/automaticFilter/R/automaticFilter/json',
        data: obj
      })
      .then((res) => {
        if(res.status === 201){
          let filter = 'Automatic'
          let aux = this.searchSignal(filter,this.state.signals_history) 
          
          filter = (aux).toString(10)+'-'+filter
          
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:this.searchSignal("Automatic",this.state.signals_history).toString(10)+"-Automatic"})
          if(this.state.indexSignal >= 1  && !this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'pendiente',dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden Hermite: '+this.state.value_order_hermite+' / '+'ventana Hampel: '+ this.state.value_window_hampel+';'+' umbral Hampel: '+this.state.value_thresold_hampel+' / '+'orden Butterworth: '+this.state.value_order_butter+';'+' corte Butterworth:'+this.state.value_slice_butter})
          else if(this.state.indexSignal === 0 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'pendiente',dialog:h[this.state.indexSignal].dialog+'\n'+'orden Hermite: '+this.state.value_order_hermite+' / '+'ventana Hampel: '+ this.state.value_window_hampel+';'+' umbral Hampel: '+this.state.value_thresold_hampel+' / '+'orden Butterworth: '+this.state.value_order_butter+';'+' corte Butterworth:'+this.state.value_slice_butter})
          else if(this.state.indexSignal >= 1 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'pendiente',dialog:h[this.state.indexSignal].dialog+'\n'+'orden Hermite: '+this.state.value_order_hermite+' / '+'ventana Hampel: '+ this.state.value_window_hampel+';'+' umbral Hampel: '+this.state.value_thresold_hampel+' / '+'orden Butterworth: '+this.state.value_order_butter+';'+' corte Butterworth:'+this.state.value_slice_butter})
          else
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'pendiente',dialog:'orden Hermite: '+this.state.value_order_hermite+'%'+' / '+'ventana Hampel: '+ this.state.value_window_hampel+';'+' umbral Hampel: '+this.state.value_thresold_hampel+' / '+'orden Butterworth: '+this.state.value_order_butter+';'+' corte Butterworth:'+this.state.value_slice_butter})
          this.setState({signals_history:sh,history:h},()=>{console.log(this.state.history)})
          this.updateOptions()
        }
        else {
          console.log(res)
          this.setState({open_snackbar:true,message_snackbar:'error'}, () => {this.handleCloseWait()})
        }
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false})})
      .finally(
        //this.state.signals_history.push({filter:"Automatic "+this.searchSignal("Automatic",this.state.signals_history).toString(10)}),
        //this.props.setSignalHistory(this.state.signals_history),
        //this.state.history.push({name:this.state.filter,data:'pendiente'})
      )
    }

    sendFilterHermite2(){
      
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]

      var obj = {
        signal:JSON.stringify(signal_to_filter),
        order:parseInt(this.state.value_order_hermite)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/hermiteSplineFilter/R/getHermiteSplineInterpolation/json',
        data: obj
      })
      .then(res => {
        if(res.status === 201){
          let filter = 'Hermite '
          let aux = this.searchSignal(filter,this.state.signals_history) 
          
          filter = (aux).toString(10)+'-'+filter
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:this.searchSignal("Hermite ",this.state.signals_history).toString(10)+"-Hermite"})
          if(this.state.indexSignal >= 1 && !this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_hermite,dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden Hermite: '+this.state.value_order_hermite})
          else if(this.state.indexSignal === 0 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_hermite,dialog:h[this.state.indexSignal].dialog+'\n'+'orden Hermite: '+this.state.value_order_hermite})
          else if(this.state.indexSignal >= 1 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_hermite,dialog:h[this.state.indexSignal].dialog+'\n'+'orden Hermite: '+this.state.value_order_hermite})
          else
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_hermite,dialog:'orden Hermite: '+this.state.value_order_hermite+'%'})
          this.setState({signals_history:sh,history:h},()=>{console.log(this.state.history)})
          this.updateOptions()
        }
        else {
          this.setState({open_snackbar:true,message_snackbar:'error'}, () => {this.handleCloseWait()})
        }
        
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false})})
      //.finally(this.state.signals_history.push({filter:"Hermite "+this.searchSignal("Hermite ",this.state.signals_history).toString(10)}),
      //this.state.history.push({name:this.state.filter,data:'Ord: '+this.state.v1}))
    }
      

    getFilterHampel(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]
      var obj = {
        signal:JSON.stringify(signal_to_filter),
        window: parseInt(this.state.value_window_hampel),
        threshold: parseFloat(this.state.value_thresold_hampel)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/HampelFilter/R/hampelFilter/json',
        data: obj
      })
      //.then(res => {this.setState({vsfd_filter_hampel: res.data[0],vsfi_filter_hampel:res.data[1],psa_filter_hampel:res.data[2]}, () => this.updateDataFilterHampel())})
      .then(res => {
        if(res.status === 201){
          let filter = 'Hampel'
          let aux = this.searchSignal(filter,this.state.signals_history) 
          
          filter = (aux).toString(10)+'-'+filter
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:this.searchSignal("Hampel ",this.state.signals_history).toString(10)+"-Hampel"})
          
          if(this.state.indexSignal >= 1 && !this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'W: '+this.state.value_window_hampel+'/ T: '+this.state.value_thresold_hampel,dialog:h[this.state.indexSignal-1].dialog+'\n'+'ventana Hampel: '+this.state.value_window_hampel+' / '+ 'umbral Hampel: '+this.state.value_thresold_hampel})
          else if((this.state.indexSignal === 0 && this.state.is_signal_cut))
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'W: '+this.state.value_window_hampel+'/ T: '+this.state.value_thresold_hampel,dialog:h[this.state.indexSignal].dialog+'\n'+'ventana Hampel: '+this.state.value_window_hampel+' / '+ 'umbral: '+this.state.value_thresold_hampel}) 
          else if((this.state.indexSignal >= 1 && this.state.is_signal_cut)){
            console.log(h[this.state.indexSignal].dialog)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'W: '+this.state.value_window_hampel+'/ T: '+this.state.value_thresold_hampel,dialog:h[this.state.indexSignal].dialog+'\n'+'ventana Hampel: '+this.state.value_window_hampel+' / '+ 'umbral: '+this.state.value_thresold_hampel}) 
          }
          else
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'W: '+this.state.value_window_hampel+'/ T: '+this.state.value_thresold_hampel,dialog:'ventana Hampel: '+this.state.value_window_hampel+' / '+ 'umbral Hampel: '+this.state.value_thresold_hampel})
          this.setState({signals_history:sh,history:h},()=>{console.log(this.state.history)})
          this.updateOptions()
        }
        else {
          console.log(res)
          this.setState({open_snackbar:true,message_snackbar:'error'}, () => {this.handleCloseWait()})
        }
        
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false})})
      //.finally(
        //this.state.signals_history.push({filter:"Hampel "+this.searchSignal("Hampel",this.state.signals_history).toString(10)}),
        //this.state.history.push({name:this.state.filter,data:'W: '+this.state.v1+'/ T: '+this.state.v2}))
    }

    getFilterButterworth(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]
      let rate_aux = this.state.headerFile[0].header[3].split(':')[1]
      let rate = ''
      var i = 0
      for(var i = 0; rate_aux[i] != 'H'; i++)
        rate+=rate_aux[i]
      var obj = {
        signal:JSON.stringify(signal_to_filter),
        order: parseInt(this.state.value_order_butter),
        frecuency: parseFloat(this.state.value_slice_butter),
        rate: parseInt(rate)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/butterworthFilter/R/butterworthFilter/json',
        data: obj
      })
      //.then(res => {this.setState({vsfd_filter_butterworth: res.data[0],vsfi_filter_butterworth:res.data[1],psa_filter_butterworth:res.data[2]}, () => this.updateDataFilterButterworth())})
      .then(res => {
        if(res.status === 201){
          let filter = 'Butterworth'
          let aux = this.searchSignal(filter,this.state.signals_history) 
          
          filter = (aux).toString(10)+'-'+filter
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:this.searchSignal("Butterworth ",this.state.signals_history).toString(10)+"-Butterworth"})
          if(this.state.indexSignal >= 1  && !this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord:'+this.state.value_order_butter+'/ Cut: '+this.state.value_slice_butter,dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden Butterworth: '+this.state.value_order_butter+' / '+'corte Butterworth: '+this.state.value_slice_butter})
          else if(this.state.indexSignal === 0 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord:'+this.state.value_order_butter+'/ Cut: '+this.state.value_slice_butter,dialog:h[this.state.indexSignal].dialog+'\n'+'orden Butterworth: '+this.state.value_order_butter+' / '+'corte Butterworth: '+this.state.value_slice_butter}) 
          else if(this.state.indexSignal >= 1 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord:'+this.state.value_order_butter+'/ Cut: '+this.state.value_slice_butter,dialog:h[this.state.indexSignal].dialog+'\n'+'orden Butterworth: '+this.state.value_order_butter+' / '+'corte Butterworth: '+this.state.value_slice_butter}) 
          else
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord:'+this.state.value_order_butter+'/ Cut: '+this.state.value_slice_butter,dialog:'orden Butterworth: '+this.state.value_order_butter+' / '+'corte Butterworth: '+this.state.value_slice_butter})
          this.setState({signals_history:sh,history:h},()=>{console.log(this.state.history)})
          this.updateOptions()
        }
        else {
          console.log(res)
          this.setState({open_snackbar:true,message_snackbar:'error'}, () => {this.handleCloseWait()})
        }
        
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false})})
      //.finally(
      //  this.state.signals_history.push({filter:"Butterworth "+this.searchSignal("Butterworth",this.state.signals_history).toString(10)}),
        //this.props.setSignalHistory(this.state.signals_history),
      //  this.state.history.push({name:this.state.filter,data:'Ord:'+this.state.v1+'/ Cut: '+this.state.v2}))
    }

    getFilterMedian(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]
      var obj = {
        signal:JSON.stringify(signal_to_filter),
        order: parseInt(this.state.value_order_median),
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/medianFilter/R/MedianFilter/json',
        data: obj
      })
      //.then(res => {this.setState({vsfd_filter_median: res.data[0],vsfi_filter_median:res.data[1],psa_filter_median:res.data[2]}, () => this.updateDataFilterMedian())})
      .then(res => {
        if(res.status === 201){
          let filter = 'Mediana'
          let aux = this.searchSignal(filter,this.state.signals_history) 
          
          filter = (aux).toString(10)+'-'+filter
          
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:this.searchSignal("Mediana",this.state.signals_history).toString(10)+"-Mediana"})
          if(this.state.indexSignal >= 1  && !this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_median,dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden mediana: '+this.state.value_order_median})
          else if(this.state.indexSignal ===0 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_median,dialog:h[this.state.indexSignal].dialog+'\n'+'orden mediana: '+this.state.value_order_median}) 
          else if(this.state.indexSignal >= 1 && this.state.is_signal_cut)
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_median,dialog:h[this.state.indexSignal].dialog+'\n'+'orden mediana: '+this.state.value_order_median}) 
          
          else
            h.push({name:filter,prev:sh[this.state.indexSignal].filter,data:'Ord: '+this.state.value_order_median,dialog:'orden mediana:'+this.state.v1})
          this.setState({signals_history:sh,history:h},()=>{console.log(this.state.history)})
          this.updateOptions()
        }
        else {
          console.log(res)
          this.setState({open_snackbar:true,message_snackbar:'error'}, () => {this.handleCloseWait()})
        }
        
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false})})
      //.finally(
      //  this.state.history.push({name:this.state.filter,data:'Ord: '+this.state.v1}),
      //  this.state.signals_history.push({filter:"Mediana "+this.searchSignal("Mediana",this.state.signals_history).toString(10)}),
        //this.props.setSignalHistory(this.state.signals_history))
    }

    exportSignal2(){
      var aux = this.state.is_signal_cut ? this.state.indexSignalToDelete : this.state.indexSignalToDelete+1
      let vfsd = this.state.serie_vfsd[aux].data
      let vfsi = this.state.serie_vfsi[aux].data
      let psa = this.state.serie_psa[aux].data
      let co2 = this.state.serie_co2[aux].data
      let times = this.state.x_points_vfs
      let header_file = this.state.headerFile
      
      let history = this.state.history[this.state.is_signal_cut ? aux : aux-1].dialog
      let filename = this.state.filename.name.split(".")[0]
      header_file[1] = {history:history}
      
      let signal_to_filter = [vfsd,vfsi,psa,co2,times]
      var obj = {
        signals:JSON.stringify(signal_to_filter),
        header: JSON.stringify(header_file),
        filename: filename
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/exportSignal/R/exportSignal/json',
        data: obj
      })
      .then((response) => {
        console.log(response)
        const link = document.createElement('a')
        link.href = response.headers.location+'files/'+filename+'_fil.zip'
        link.setAttribute('download',filename+'_fil.zip')
        document.body.appendChild(link)
        link.click()
        this.handleCloseConfirmSave()
      })
    }

    exportSignal = () =>{
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let times = this.state.x_points_vfs
      let header_file = this.state.headerFile
      let history = this.state.history
      header_file[1] = {history:history}
      
      let signal_to_filter = [vfsd,vfsi,psa,co2,times]
      var obj = {
        signals:JSON.stringify(signal_to_filter),
        header: JSON.stringify(header_file),
        filename: this.state.filename.name.split(".")[0]
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/exportSignal/R/exportSignal/json',
        data: obj
      })
      .then((response) => {
        console.log(response)
        const link = document.createElement('a')
        link.href = response.headers.location+'files/test.zip'
        link.setAttribute('download','test1.zip')
        document.body.appendChild(link)
        link.click()
      })
    }


    updateDataFilter(filter){
      this.state.data_filter_VFS.push({name:filter,textStyle:echart_options.textStyle})
      this.state.data_filter_VFSI.push({name:filter,textStyle:echart_options.textStyle})
      this.state.data_filter_PSA.push({name:filter,textStyle:echart_options.textStyle})
      this.state.data_filter_CO2.push({name:filter,textStyle:echart_options.textStyle})
      this.handleCloseWait()
    }
    
    handleCloseDialogClean = () =>{
      this.setState({open_dialog_clean:false})
    }

    handleOpenDialogClean = () =>{
      this.setState({open_dialog_clean:true})
    }

    handleCleanData = () =>{
      if(this.state.serie_vfsd.length > 0 || this.state.serie_vfsi.length > 0 || this.state.serie_psa.length > 0 || this.state.serie_co2.length > 0){
        this.setState({serie_vfsd:[],serie_vfsi:[],serie_psa:[],serie_co2:[],x_points_vfs:[],history:[],signals_history:[],data_filter_VFS:[{name:'VFSD',textStyle:echart_options.textStyle}],data_filter_VFSI:[{name:'VFSI',textStyle:echart_options.textStyle}],data_filter_PSA:[{name:'PSA',textStyle:echart_options.textStyle}],data_filter_CO2:[{name:'EtCO2',textStyle:echart_options.textStyle}],filter:'',signal_time:0,indexSignal:0,name_signal:'',signal_is_cut:false,signal_history_backup:[],is_heart_beat_detected:false,},
        () => {
          //this.props.setSignalHistory(this.state.signals_history)
          this.refs.echarts_react_1.getEchartsInstance().dispose()
          this.refs.echarts_react_2.getEchartsInstance().dispose()
          this.refs.echarts_react_3.getEchartsInstance().dispose()
          this.refs.echarts_react_4.getEchartsInstance().dispose()
          this.handleClickOpen()
        })
      }
      else
        this.handleClickOpen()
    }

    fetchVFS(json){  
      var vsfi = []
      var vsfd = []
      var psa = []
      var co2 = []
      var x_points = []
      var header = []
      for(var j = 0; j < 4; j++)
        header.push(json[j].V1)
      header.push(json[4].V1 + "\t"+json[4].V2 + "\t"+json[4].V3 + "\t"+json[4].V4 + "\t"+json[4].V5 + "\t"+json[4].V6 + "\t"+json[4].V7 + "\t"+json[4].V8 + "\t")
      header.push(json[5].V1 + "\t"+json[5].V2 + "\t"+json[5].V3 + "\t"+json[5].V4 + "\t"+json[5].V5 + "\t"+json[5].V6 + "\t"+json[5].V7 + "\t"+json[5].V8 + "\t")
      if(this.state.filename.name.split(".")[1] === 'fil'){
        for(var i = 6; i < json.length; i++){
          vsfd.push(Number(json[i].V3))
          vsfi.push(Number(json[i].V4))
          psa.push(Number(json[i].V5))
          co2.push(Number(json[i].V6))
          x_points.push(json[i].V1)      
        }
      }
      else{
        for(var i = 6; i < json.length; i++){
          vsfd.push(Number(json[i].V3))
          vsfi.push(Number(json[i].V4))
          psa.push(Number(json[i].V5))
          co2.push(Number(json[i].V7))
          x_points.push(json[i].V1)      
        }
      }
      let time = this.getSignalTime(vsfd.length)
      var aux_name = ''
      if(this.state.filename.name.length > 15)
        aux_name = this.state.filename.name.substring(0,10)+'...'+this.state.filename.name.substring(this.state.filename.name.length-5,this.state.filename.name.length)
      else aux_name = this.state.filename.name
      this.setState({x_points_vfs:x_points,signals_history:[{filter:'Inicial'}],signal_time:time, headerFile:[{header:header}]})
      this.state.serie_vfsd.push({
        name:'VFSD',
        type:'line',
        data:vsfd,
        symbol:echart_options.series.symbol,
        symbolSize: echart_options.series.symbolSize,
        itemStyle:{color:'#d22824'},
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationThreshold:this.state.x_points_vfs.length    
      })
      this.state.serie_vfsi.push({
        name:'VFSI',
        type:'line',
        data:vsfi,
        symbol:echart_options.series.symbol,
        symbolSize: echart_options.series.symbolSize,
        itemStyle:{color:'#d22824'}, 
        animationDelay: function (idx) {
          return idx * 10;
        }
      })
      this.state.serie_psa.push({
        name: 'PSA', 
        type:'line',
        data: psa,symbol:echart_options.series.symbol,
        symbolSize: echart_options.series.symbolSize,
        itemStyle:{color:'#029eb1'}, 
        animationDelay: function (idx) {
          return idx * 10;
        }
      })
      this.state.serie_co2.push({
        name:'EtCO2',
        type:'line',
        data:co2,
        symbol:echart_options.series.symbol,
        symbolSize: echart_options.series.symbolSize,
        itemStyle:{color:'#288c6c'},
        animationDelay: function (idx) {
          return idx * 10;
        }
      })
      this.setState({isReadySignal:true,name_signal:aux_name}, () => {
        this.handleClose()
        this.updateOptions()
      })
    }

    handleUploadSignal(event){
        event.preventDefault()
        this.setState({loadingGraph:true})
        const filename = this.state.filename
        const formData = new FormData(event.target)
        
        formData.append('filename',filename)
        this.props.loadSignal(formData).then(() => this.fetchVFS(this.props.signal_global))
        
    };

    handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };



    handleChangeFilter = name => event => {  
      if(event.target.value === 'hermite'){
        this.setState({ filter: event.target.value, title_filter: title_hermite, text_filter: text_hermite}, () => this.handleOpenHermite());
        //this.setState({ filter: event.target.value}, () => {this.handleSendFilter(event)});
      }
      else if(event.target.value === 'hampel')
        this.setState({ filter: event.target.value, title_filter: title_hampel, text_filter: text_hampel}, () => this.handleOpenHampel());
      else if(event.target.value === 'butterworth')
        this.setState({ filter: event.target.value, title_filter: title_butterworth, text_filter: text_butterworth}, () => this.handleOpenButterworth());
      else if(event.target.value === 'median')
        this.setState({ filter: event.target.value, title_filter: title_median, text_filter: text_median}, () => this.handleOpenMedian());
      else if(event.target.value === 'automatic')
        this.setState({ filter: event.target.value, title_filter: title_automatic, text_filter: text_automatic}, () => this.handleOpenAutomatic());
      
    };

    handleSendFilter(event){
      event.preventDefault()
      
      if(this.state.filter === 'hermite'){
        this.setState({openWait: true, open_hermite: false}, () => this.sendFilterHermite2())
      }
      else if(this.state.filter === 'hampel'){
        this.setState({openWait: true, open_hampel: false}, () => this.getFilterHampel())
      }
      else if(this.state.filter === 'butterworth'){
        this.setState({openWait: true, open_butterworth: false}, () => this.getFilterButterworth())
      }
      else if(this.state.filter === 'median'){
        this.setState({openWait: true, open_median: false}, () => this.getFilterMedian())
      }
      else if(this.state.filter === 'automatic'){
        this.setState({openWait: true, open_automatic: false}, () => this.getAutomaticFilter())
      }

    }

    getOption_VFSD = () => ({
        title: {
          text:'VFSD',
          textStyle:echart_options.textStyle
        },
        
        tooltip: echart_options.tooltip,
        legend: {
          data:[{name:'VFSD',textStyle:echart_options.textStyle}]
        },
        
        brush:{toolbox:['lineX','clear'],throttleType: 'debounce',throttleDelay: 1000,xAxisIndex: 0},
        toolbox: echart_options.toolbox,
        grid: echart_options.grid,
        dataZoom: echart_options.dataZoom,
        xAxis: [
            {
              type: echart_options.xAxis.type,
              boundaryGap: echart_options.xAxis.boundaryGap,
              data:this.state.x_points_vfs,
              axisLabel:echart_options.xAxis.axisLabel,
              axisLine:echart_options.xAxis.axisLine
            },
          ],
          yAxis: [
            {
              type: echart_options.yAxis.type,
              scale: echart_options.yAxis.scale,
              name: 'cm/s',
              nameTextStyle: echart_options.yAxis.nameTextStyle,
              splitLine: echart_options.yAxis.splitLine,
              max: 150,
              min: 0,
              boundaryGap: echart_options.yAxis.boundaryGap,
              axisLabel:echart_options.yAxis.axisLabel,
              axisLine:echart_options.yAxis.axisLine,
            }
          ],
          series: this.state.serie_vfsd,
          //animationEasing: 'elasticOut',
          //animationDelayUpdate: function (idx) {
          //return idx * 5;
        //}
          
    });
    getOption_VFSI = () => ({
      title: {
        text:'VFSI',
        textStyle:echart_options.textStyle
      },
      brush:{toolbox:['lineX','clear'],throttleType: 'debounce',throttleDelay: 1000,xAxisIndex: 0},
      tooltip: echart_options.tooltip,
      legend: {
        data:[{name:'VFSI',textStyle:echart_options.textStyle}]
      },
      toolbox: echart_options.toolbox,
      grid: echart_options.grid,
      dataZoom: echart_options.dataZoom,
      xAxis: [
        {
          type: echart_options.xAxis.type,
          boundaryGap: echart_options.xAxis.boundaryGap,
          data:this.state.x_points_vfs,
          axisLabel:echart_options.xAxis.axisLabel,
          axisLine:echart_options.xAxis.axisLine
        },
      ],
      yAxis: [
        {
          type: echart_options.yAxis.type,
          scale: echart_options.yAxis.scale,
          name: 'cm/s',
          nameTextStyle:echart_options.yAxis.nameTextStyle,
          splitLine: echart_options.yAxis.splitLine,
          max: 150,
          min: 0,
          boundaryGap: echart_options.yAxis.boundaryGap,
          axisLabel: echart_options.yAxis.axisLabel,
          axisLine:echart_options.yAxis.axisLine
        }
      ],
        series: this.state.serie_vfsi
    });
    getOption_PSA = () => ({
      title: {
        text:'PSA',
        textStyle:echart_options.textStyle
      },
      brush:{toolbox:['lineX','clear'],throttleType: 'debounce',throttleDelay: 1000,xAxisIndex: 0},
      tooltip: echart_options.tooltip,
      legend: {
        data:[{name:'PSA',textStyle:echart_options.textStyle}]
      },
      toolbox: echart_options.toolbox,
      grid: echart_options.grid,
      dataZoom: echart_options.dataZoom,
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data:this.state.x_points_vfs,
          axisLabel:echart_options.xAxis.axisLabel,
          axisLine:echart_options.xAxis.axisLine
        },
      ],
      yAxis: [
        {
          type: echart_options.yAxis.type,
          scale: echart_options.yAxis.scale,
          name: 'mmHg',
          nameTextStyle:echart_options.yAxis.nameTextStyle,
          splitLine: echart_options.yAxis.splitLine,
          max: 150,
          min: 0,
          boundaryGap: echart_options.yAxis.boundaryGap,
          axisLabel: echart_options.yAxis.axisLabel,
          axisLine:echart_options.yAxis.axisLine
        }
      ],
      series: this.state.serie_psa
    });
    getOption_CO2 = () => ({
      title: {
        text:'EtCO2',
        textStyle:echart_options.textStyle
      },
      brush:{toolbox:['lineX','clear'],throttleType: 'debounce',throttleDelay: 1000,xAxisIndex: 0},
      tooltip: echart_options.tooltip,
      legend: {
        data:[{name:'EtCO2',textStyle:echart_options.textStyle}]
      },
      toolbox: echart_options.toolbox,
      grid: echart_options.grid,
      dataZoom: echart_options.dataZoom,
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data:this.state.x_points_vfs,
          axisLabel:echart_options.xAxis.axisLabel,
          axisLine:echart_options.xAxis.axisLine
        },
      ],
      yAxis: [
        {
          type: echart_options.yAxis.type,
          scale: echart_options.yAxis.scale,
          name: 'mV',
          nameTextStyle:echart_options.yAxis.nameTextStyle,
          splitLine: echart_options.yAxis.splitLine,
          max: 50,
          min: 0,
          boundaryGap: echart_options.yAxis.boundaryGap,
          axisLabel: echart_options.yAxis.axisLabel,
          axisLine:echart_options.yAxis.axisLine
        }
      ],        
      series: this.state.serie_co2

    })

    clearOption(){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: null,
        xAxis:null,
        legend: null,
        series:null
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        xAxis:null,
        legend: null,
        series:null
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        xAxis:null,
        legend: null,
        series:null
      })
    }

    updateOptions(){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: {
          text:'VFSD',
          textStyle:echart_options.textStyle
        },
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          type:'scroll',
          data:this.state.data_filter_VFS
        },
        series:this.state.serie_vfsd
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          type:'scroll',
          data:this.state.data_filter_VFSI
        },
        series:this.state.serie_vfsi
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          type:'scroll',
          data:this.state.data_filter_PSA
        },
        series:this.state.serie_psa
      })
      this.refs.echarts_react_4.getEchartsInstance().setOption({
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          type:'scroll',
          data:this.state.data_filter_CO2
        },
        series:this.state.serie_co2
      })
    }

    updateOptionsVFSD(hb){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: {
          text:'VFSD',
          subtext:'Latidos detectados: ' + hb,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {show:false},
        series:this.state.serie_vfsd
      })
    }

    updateOptionsVFSI(hb){
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        title: {
          text:'VFSI',
          subtext:'Latidos detectados: ' + hb,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {show:false},
        series:this.state.serie_vfsi
      })
    }

    updateOptionsPSA(hb){
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        title: {
          text:'PSA',
          subtext:'Latidos detectados: ' + hb,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {show:false},
        series:this.state.serie_psa
      })
    }

    updateOptionsPar(hb1,hb2,hb3,hb4){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: {
          text:'VFSD',
          subtext:'Latidos detectados: ' + hb1,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {show:false},
        series:this.state.serie_vfsd
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        title: {
          text:'VFSI',
          subtext:'Latidos detectados: ' + hb2,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        legend: {show:false},
        xAxis:[{data:this.state.x_points_vfs}],
        series:this.state.serie_vfsi
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        title: {
          text:'PSA',
          subtext:'Latidos detectados: ' + hb3,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        legend: {show:false},
        xAxis:[{data:this.state.x_points_vfs}],
        series:this.state.serie_psa
      })
    }

    updateOptionsSync(hb1,hb2,hb3,hb4){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: {
          text:'VFSD Sync',
          subtext:'Latidos detectados: ' + hb1,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        legend:{show:false},
        xAxis:[{data:this.state.x_points_vfs}],
        series:this.state.serie_vfsd
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        title: {
          text:'VFSI Sync',
          subtext:'Latidos detectados: ' + hb2,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        legend:{show:false},
        xAxis:[{data:this.state.x_points_vfs}],
        series:this.state.serie_vfsi
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        title: {
          text:'PSA Sync',
          subtext:'Latidos detectados: ' + hb3,
          x:'center',
          align:'right',
          textStyle:echart_options.textStyle,
          subtextStyle:echart_options.subtextStyle
        },
        legend:{show:false},
        xAxis:[{data:this.state.x_points_vfs}],
        series:this.state.serie_psa
      })
    }

    onChartClick = (param, echarts) => {
      console.log(param.dataIndex)
      this.setState({indexSignal:param.seriesIndex})
    };

    onMouseUp = (param, echarts) => {
      console.log('UP')
      console.log(param)      
    };

    onMouseDown = (param,echarts) => {
      console.log('Down')
      console.log(param)
      //if(this.state.is_heart_beat_detected)  
      this.setState({message_snackbar: 'Ha seleccionado el punto ' + param.dataIndex,open_snackbar_peak:true})
      /*this.refs.echarts_react_1.getEchartsInstance().dispatchAction({
        type: 'takeGlobalCursor',
        key: 'brush',
        brushOption: {
            brushType: 'lineX',
            brushMode: 'single'
        }
    });*/
    }

    onMouseClick = (param, echarts) =>{
      this.setState({message_snackbar:'Ha seleccionado el punto ' + param.dataIndex,open_snackbar_peak: true})
    }

    searchMarkPoint(markpoint,position){
      var pos = 0;
      for(var i = 0; i < markpoint.length; i++){
        if(markpoint[i].index == position){
          return i
        }
      }
      return -1
    }

    onChangePeak = (param,echarts) => {
      console.log(param)
      if(this.state.is_heart_beat_detected){
        if(this.state.cnt_click_peak === 0 && param.componentType === 'markPoint' && !(param.data.name === 'upstroke_vfsd' || param.data.name === 'upstroke_vfsi' || param.data.name === 'upstroke_psa')){
          this.setState({message_snackbar:'Ha seleccionado el peak ' + param.data.coord[1] + '. Haga click en el punto nuevo punto máximo/mínimo.',open_snackbar_peak: true,cnt_click_peak:1,peak_selected:param})
        }
        else if(this.state.cnt_click_peak === 1 && param.componentType != 'markPoint'){
          var point_selected = this.state.peak_selected.data.index
          var point_to_change = param.dataIndex
          
          var heartbeats = this.state.heart_beats_detected
          if(this.state.peak_selected.data.name === 'peak_vfsd' && param.seriesName === 'VFSD'){
            var vfsd = this.state.serie_vfsd[0]
            heartbeats[point_to_change][2] = 4
            heartbeats[point_selected][2] = 2
            var markpoints = vfsd.markPoint.data
            var position_index_markpoint = this.searchMarkPoint(markpoints,point_selected)
            var new_markpoint = {name: 'peak_vfsd', index:point_to_change,coord:[this.state.x_points_vfs[point_to_change],vfsd.data[point_to_change]],itemStyle:{color:echart_colors.peak}}
            markpoints[position_index_markpoint] = new_markpoint
            var markpoints_modify = {symbol:'circle',symbolSize:5,data:markpoints}
            var vfsd_serie = [{ name:'VFSD',type:'line',data:vfsd.data,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'},markPoint:markpoints_modify}]              
            this.setState({message_snackbar:'Cambiando peak ' + this.state.peak_selected.data.coord[1] + ' por ' + param.data,cnt_click_peak:0,open_snackbar_peak: true,peak_selected:{},serie_vfsd:vfsd_serie,heart_beats_detected:heartbeats,peak_modify_by_signal:this.state.peak_modify_by_signal++}, ()=>{
              this.updateOptionsVFSD('debe recalcular')
            })
          }
          else if(this.state.peak_selected.data.name === 'inicio_vfsd' && param.seriesName === 'VFSD'){
            var vfsd = this.state.serie_vfsd[0]
            heartbeats[point_to_change][2] = 1
            heartbeats[point_selected][2] = 6
            var markpoints = vfsd.markPoint.data
            var position_index_markpoint = this.searchMarkPoint(markpoints,point_selected)
            var new_markpoint = {name: 'inicio_vfsd', index:point_to_change,coord:[this.state.x_points_vfs[point_to_change],vfsd.data[point_to_change]],itemStyle:{color:echart_colors.start_heartbeat}}
            markpoints[position_index_markpoint] = new_markpoint
            var markpoints_modify = {symbol:'circle',symbolSize:5,data:markpoints}
            var vfsd_serie = [{ name:'VFSD',type:'line',data:vfsd.data,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'},markPoint:markpoints_modify}]              
            this.setState({message_snackbar:'Cambiando peak ' + this.state.peak_selected.data.coord[1] + ' por ' + param.data,cnt_click_peak:0,open_snackbar_peak: true,peak_selected:{},serie_vfsd:vfsd_serie,heart_beats_detected:heartbeats,peak_modify_by_signal:this.state.peak_modify_by_signal++}, ()=>{
              this.updateOptionsVFSD('debe recalcular')
              console.log(this.state.heart_beats_detected)
            })
          }
          else if(this.state.peak_selected.data.name === 'peak_vfsi' && param.seriesName === 'VFSI'){
            var temp = heartbeats[point_to_change][4]
            var vfsi = this.state.serie_vfsi[0]
            heartbeats[point_to_change][4] = 4
            heartbeats[point_selected][4] = 2
            var markpoints = vfsi.markPoint.data
            var position_index_markpoint = this.searchMarkPoint(markpoints,point_selected)
            var new_markpoint = {name: 'peak_vfsi', index:point_to_change,coord:[this.state.x_points_vfs[point_to_change],vfsi.data[point_to_change]],itemStyle:{color:echart_colors.peak}}
            markpoints[position_index_markpoint] = new_markpoint
            var markpoints_modify = {symbol:'circle',symbolSize:5,data:markpoints}
            var vfsi_serie = [{ name:'VFSI',type:'line',data:vfsi.data,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'},markPoint:markpoints_modify}]              
            this.setState({message_snackbar:'Cambiando peak ' + this.state.peak_selected.data.coord[1] + ' por ' + param.data,cnt_click_peak:0,open_snackbar_peak: true,peak_selected:{},serie_vfsi:vfsi_serie,heart_beats_detected:heartbeats,peak_modify_by_signal:this.state.peak_modify_by_signal++}, ()=>{
              this.updateOptionsVFSI('debe recalcular')
            })
          }
          else if(this.state.peak_selected.data.name === 'inicio_vfsi' && param.seriesName === 'VFSI'){
            var temp = heartbeats[point_to_change][4]
            var vfsi = this.state.serie_vfsi[0]
            heartbeats[point_to_change][4] = 1
            heartbeats[point_selected][4] = 6
            var markpoints = vfsi.markPoint.data
            var position_index_markpoint = this.searchMarkPoint(markpoints,point_selected)
            var new_markpoint = {name: 'inicio_vfsi', index:point_to_change,coord:[this.state.x_points_vfs[point_to_change],vfsi.data[point_to_change]],itemStyle:{color:echart_colors.start_heartbeat}}
            markpoints[position_index_markpoint] = new_markpoint
            var markpoints_modify = {symbol:'circle',symbolSize:5,data:markpoints}
            var vfsi_serie = [{ name:'VFSI',type:'line',data:vfsi.data,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'},markPoint:markpoints_modify}]              
            this.setState({message_snackbar:'Cambiando peak ' + this.state.peak_selected.data.coord[1] + ' por ' + param.data,cnt_click_peak:0,open_snackbar_peak: true,peak_selected:{},serie_vfsi:vfsi_serie,heart_beats_detected:heartbeats,peak_modify_by_signal:this.state.peak_modify_by_signal++}, ()=>{
              this.updateOptionsVFSI('debe recalcular')
              console.log(this.state.heart_beats_detected)
            })
          }
          else if(this.state.peak_selected.data.name === 'peak_psa' && param.seriesName === 'PSA'){
            var psa = this.state.serie_psa[0]
            heartbeats[point_to_change][6] = 4
            heartbeats[point_selected][6] = 2
            var markpoints = psa.markPoint.data
            var position_index_markpoint = this.searchMarkPoint(markpoints,point_selected)
            var new_markpoint = {name: 'peak_psa', index:point_to_change,coord:[this.state.x_points_vfs[point_to_change],psa.data[point_to_change]],itemStyle:{color:echart_colors.peak}}
            markpoints[position_index_markpoint] = new_markpoint
            var markpoints_modify = {symbol:'circle',symbolSize:5,data:markpoints}
            var psa_serie = [{ name:'PSA',type:'line',data:psa.data,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#029eb1'},markPoint:markpoints_modify}]              
            this.setState({message_snackbar:'Cambiando peak ' + this.state.peak_selected.data.coord[1] + ' por ' + param.data,cnt_click_peak:0,open_snackbar_peak: true,peak_selected:{},serie_psa:psa_serie,heart_beats_detected:heartbeats,peak_modify_by_signal:this.state.peak_modify_by_signal++}, ()=>{
              this.updateOptionsPSA('debe recalcular')
            })
          }
          else if(this.state.peak_selected.data.name === 'inicio_psa' && param.seriesName === 'PSA'){
            var psa = this.state.serie_psa[0]
            heartbeats[point_to_change][6] = 1
            heartbeats[point_selected][6] = 6
            var markpoints = psa.markPoint.data
            var position_index_markpoint = this.searchMarkPoint(markpoints,point_selected)
            var new_markpoint = {name: 'inicio_psa', index:point_to_change,coord:[this.state.x_points_vfs[point_to_change],psa.data[point_to_change]],itemStyle:{color:echart_colors.start_heartbeat}}
            markpoints[position_index_markpoint] = new_markpoint
            var markpoints_modify = {symbol:'circle',symbolSize:5,data:markpoints}
            var psa_serie = [{ name:'PSA',type:'line',data:psa.data,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#029eb1'},markPoint:markpoints_modify}]              
            this.setState({message_snackbar:'Cambiando peak ' + this.state.peak_selected.data.coord[1] + ' por ' + param.data,cnt_click_peak:0,open_snackbar_peak: true,peak_selected:{},serie_psa:psa_serie,heart_beats_detected:heartbeats,peak_modify_by_signal:this.state.peak_modify_by_signal++}, ()=>{
              this.updateOptionsPSA('debe recalcular')
            })
          }
          else if(
            (this.state.peak_selected.data.name === 'peak_vfsd' && param.seriesName != 'VFSD' || (this.state.peak_selected.data.name === 'inicio_vfsd' && param.seriesName != 'VFSD')) ||
            (this.state.peak_selected.data.name === 'peak_vfsi' && param.seriesName != 'VFSI' || (this.state.peak_selected.data.name === 'inicio_vfsi' && param.seriesName != 'VFSI')) ||
            (this.state.peak_selected.data.name === 'peak_psa' && param.seriesName != 'PSA' || (this.state.peak_selected.data.name === 'inicio_psa' && param.seriesName != 'PSA'))){
            this.setState({message_snackbar: 'No puede cambiar puntos entre señales',open_snackbar_peak: true,cnt_click_peak:0})
          }
        }
        else if(param.data.name === 'upstroke_vfsd' || param.data.name === 'upstroke_vfsi' || param.data.name === 'upstroke_psa'
          || param.data.name === 'incisura_vfsd' || param.data.name === 'incisura_vfsi' || param.data.name === 'incisura_psa'){
          this.setState({message_snackbar: 'no puede cambiar un peak por un punto de upstroke u otro peak',open_snackbar_peak: true,cnt_click_peak:0})
        }
        
      }
      
    }

    getUpstroke(op){
      this.handleOpenUpstrokeWait()
      var obj = {
        peaks: JSON.stringify(this.state.heart_beats_detected),
        column: op
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/detection/R/detection_upstroke/json',
        data: obj
      })
      .then((response) => {
        this.updateUpstrokeSignalOnGraph(response.data,op)
      })
    }

   

    changePeak = (param,echarts) =>{

    }

    sliceSerieData = (params,echarts) =>{
      console.log(echarts)
      
    }

    getCutterArray(array_serie,point1,point2){
      return array_serie.data.slice(point1,point2+1)
    }

    getJsonConfigArray(array_serie,array_cutter){
      var json_object = {
        name:array_serie.name,
        type:'line',
        data:array_cutter,
        symbol:echart_options.series.symbol,
        symbolSize: echart_options.series.symbolSize,
        itemStyle:{color:array_serie.itemStyle.color}
      }
      return json_object
    }

    splitSignalTimes = (event) => {
      event.preventDefault()
      var len = this.state.x_points_vfs.length;
      var times = this.state.x_points_vfs
      var pos1 = -1
      var pos2 = -1
      var h = [...this.state.history]
      for(var i = 0; i < len; i++){
        if(times[i].localeCompare(this.state.v1) === 0){
          pos1 = i
          i = len
        }
      }
      if(pos1 === -1){
        this.setState({open_snackbar:true,message_snackbar:'el tiempo de inicio no fue encontrado',v1:'',v2:''}, () => {this.handleCloseDialogCutTime()}) 
        return
      }
      for(var j = pos1+1; j < len; j++){
        if(times[j].localeCompare(this.state.v2) === 0){
          pos2 = j
          j = len
        }
      }
      if(pos2 === -1){
        this.setState({open_snackbar:true,message_snackbar:'el tiempo de termino no fue encontrado',v1:'',v2:''}, () => {this.handleCloseDialogCutTime()}) 
        return
      }
      var array_series = [this.state.serie_vfsd[this.state.indexSignal],this.state.serie_vfsi[this.state.indexSignal],this.state.serie_psa[this.state.indexSignal],this.state.serie_co2[this.state.indexSignal]]
      var array_results_json_cutter = []
      for(var m = 0; m < 4; m++){
        var cutter = this.getCutterArray(array_series[m],pos1,pos2)
        var json_result = this.getJsonConfigArray(array_series[m],cutter)
        array_results_json_cutter.push(json_result)
      }
      var x = []
      for(var k = pos1; k < pos2+1; k++)
        x.push(this.state.x_points_vfs[k])
      h.push({name:"corte de señal",prev:"Inicial",data:'-1',dialog:'Se realizó un corte entre '+this.state.v1 +" y " + this.state.v2})
      this.setState({x_points_vfs:x,
          history:h,
          serie_vfsd:[array_results_json_cutter[0]],
          serie_vfsi:[array_results_json_cutter[1]],
          serie_psa:[array_results_json_cutter[2]],
          serie_co2:[array_results_json_cutter[3]],
          signal_time: this.getSignalTime(array_results_json_cutter[0].data.length),
          v1:'',
          v2:'',
          is_signal_cut:true
        },
        ()=>{this.updateOptions() 
            this.handleCloseDialogCutTime()
            })
    }

    getPointsToSlice = () =>{
      var point1 = this.state.brushArea.batch[0].areas[0].coordRange[0]
      var point2 = this.state.brushArea.batch[0].areas[0].coordRange[1]
      var array_series = [this.state.serie_vfsd[this.state.indexSignal],this.state.serie_vfsi[this.state.indexSignal],this.state.serie_psa[this.state.indexSignal],this.state.serie_co2[this.state.indexSignal]]
      var array_results_json_cutter = []
      var h = [...this.state.history]
      for(var i = 0; i < 4; i++){
        var cutter = this.getCutterArray(array_series[i],point1,point2)
        var json_result = this.getJsonConfigArray(array_series[i],cutter)
        array_results_json_cutter.push(json_result)
      }
      var x = []
      for(var j = point1; j < point2+1; j++)
        x.push(this.state.x_points_vfs[j])
      h.push({name:"corte de señal",prev:"Inicial",data:'-1',dialog:'Se realizó un corte entre '+this.state.x_points_vfs[point1] +" y " + this.state.x_points_vfs[point2]})
      this.setState({x_points_vfs:x,
          history:h,
          serie_vfsd:[array_results_json_cutter[0]],
          serie_vfsi:[array_results_json_cutter[1]],
          serie_psa:[array_results_json_cutter[2]],
          serie_co2:[array_results_json_cutter[3]],
          signal_time: this.getSignalTime(array_results_json_cutter[0].data.length),
          brushArea:{},
          is_signal_cut: true
        },
        ()=>{
          this.updateOptions()
          this.handleCloseDialogCut()})

    }
      

    onMouseMove = (param,echarts) => {
      
    }

    onSelectPoints = (param,echarts) =>{
      this.setState({brushArea:param})

    }

    onChartMouseOver = (param,echarts) => {
      console.log(param)
    }

    searchSignal(signal,signals){
      var regex = RegExp(signal+'*');
      return (signals.filter(function(s){return regex.test(s.filter)}).length+1)
    }

    changeIntensityColor(color,num){
      if(num === 0)  return color
      else{
        num = num * 10
        var [r,g,b] = color.substr(4).split(")")[0].split(",").map(function(v){return parseInt(v)});
        if(r+num > 255 && g+num < 255 && b+num < 255)
          return 'rgb('+(r-num).toString(10)+','+(g+num).toString(10)+','+(b+num).toString(10)+')'
        else if(r+num < 255 && g+num > 255 && b+num < 255)
          return 'rgb('+(r+num).toString(10)+','+(g-num).toString(10)+','+(b+num).toString(10)+')' 
        else if(r+num < 255 && g+num < 255 && b+num > 255)
          return 'rgb('+(r+num).toString(10)+','+(g+num).toString(10)+','+(b-num).toString(10)+')' 
        else if(r+num > 255 && g+num > 255 && b+num > 255)
          return 'rgb('+(r-num).toString(10)+','+(g-num).toString(10)+','+(b-num).toString(10)+')' 
        else if(r+num < 255 && g+num > 255 && b+num > 255)
          return 'rgb('+(r+num).toString(10)+','+(g-num).toString(10)+','+(b-num).toString(10)+')' 
        else if(r+num < 255 && g+num < 255 && b+num < 255)
          return 'rgb('+(r+num).toString(10)+','+(g+num).toString(10)+','+(b+num).toString(10)+')' 
      }
    }

    getSignalTime(n){
      return n/100/60 > 1  ? (n/100/60).toFixed(1).toString(10) + " min" : (n/100).toFixed(1).toString(10) + " seg" 
    }

    isEmpty = json => {
      for(var key in json){
        if(json.hasOwnProperty(key))
          return false
      }
      return true
    }

    showHistoryDetail = () => {
      let history = this.state.history[this.state.indexSignalToDelete].dialog
      history = history.split('\n')
      return history.map((c,i) => {
        return <li key = {i} style = {{color: 'rgba(0,0,0,0.54)'}}>{c}</li>
      })
    }

    saveFilteredFile = () => {
      
    }

    updateUpstrokeSignalOnGraph(json,op){
      console.log(json)
      console.log(json.length)
      var new_upstroke = []
      if(op == 2){
        var vfsd = this.state.serie_vfsd[0].data
        for(var i = 0; i < json.length; i++){
          if(json[i][2] === 1)
            new_upstroke.push({name: 'inicio_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.start_heartbeat}})
          else if(json[i][2] === 3)
            new_upstroke.push({name: 'upstroke_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.upstroke}})
          else if(json[i][2] === 4)
            new_upstroke.push({name: 'peak_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.peak}})
          else if(json[i][2] === 5)
            new_upstroke.push({name: 'incisura_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.incisura}})
        }
        var vfsd_beat = {symbol:'circle',symbolSize:5,data:new_upstroke}
        var vfsd_serie = [{
            name:'VFSD',type:'line',data:vfsd,
            symbol:echart_options.series.symbol,
            symbolSize: echart_options.series.symbolSize,
            itemStyle:{color:'#d22824'},
            markPoint:vfsd_beat
        }]
        this.setState({serie_vfsd:vfsd_serie}, ()=>{
          this.updateOptionsVFSD(vfsd_beat.data.length/4)
          this.handleCloseUpstrokeWait()
        })
      }
      else if(op == 4){
        var vfsi = this.state.serie_vfsi[0].data
        for(var i = 0; i < json.length; i++){
          if(json[i][4] === 1)
            new_upstroke.push({name: 'inicio_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.start_heartbeat}})
          else if(json[i][4] === 3)
            new_upstroke.push({name: 'upstroke_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.upstroke}})
          else if(json[i][4] === 4)
            new_upstroke.push({name: 'peak_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.peak}})
          else if(json[i][4] === 5)
            new_upstroke.push({name: 'incisura_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.peak}})
        }
        var vfsi_beat = {symbol:'circle',symbolSize:5,data:new_upstroke}
        var vfsi_serie = [{
          name:'VFSI',type:'line',data:vfsi,
          symbol:echart_options.series.symbol,
          symbolSize: echart_options.series.symbolSize,
          itemStyle:{color:'#d22824'},
          markPoint:vfsi_beat
        }]
        this.setState({serie_vfsi:vfsi_serie}, ()=>{
          this.updateOptionsVFSI(vfsi_beat.data.length/4)
          this.handleCloseUpstrokeWait()
        })
      }
      else if(op == 6){
        var psa = this.state.serie_psa[0].data
        for(var i = 0; i < json.length; i++){
          if(json[i][6] === 1)
            new_upstroke.push({name: 'inicio_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.start_heartbeat}})
          else if(json[i][6] === 3)
            new_upstroke.push({name: 'upstroke_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.upstroke}})
          else if(json[i][6] === 4)
            new_upstroke.push({name: 'peak_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.peak}})
        }
        var psa_beat = {symbol:'circle',symbolSize:5,data:new_upstroke}
        var psa_serie = [{
          name:'PSA',type:'line',data:psa,
          symbol:echart_options.series.symbol,
          symbolSize: echart_options.series.symbolSize,
          itemStyle:{color:'#029eb1'},
          markPoint:psa_beat 
        }]
        this.setState({serie_psa:psa_serie}, ()=>{
          this.updateOptionsPSA(psa_beat.data.length/4)
          this.handleCloseUpstrokeWait()
        })
      }
    }

    getStartBeat(array,vfsd,vfsi,psa){
      var vfsd_beat_start = []
      var vfsi_beat_start = []
      var psa_beat_start = []
      for(var i = 0; i < array.length; i++){
        if(array[i][2] === 1)
          vfsd_beat_start.push({name: 'inicio_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.start_heartbeat}})
        else if(array[i][2] === 3)
          vfsd_beat_start.push({name: 'upstroke_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.upstroke}})
        else if(array[i][2] === 4)
          vfsd_beat_start.push({name: 'peak_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.peak}})
        else if(array[i][2] === 5)
          vfsd_beat_start.push({name: 'incisura_vfsd', index:i,coord:[this.state.x_points_vfs[i],vfsd[i]],itemStyle:{color:echart_colors.incisura}})
        if(array[i][4] === 1)
          vfsi_beat_start.push({name: 'inicio_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.start_heartbeat}})
        else if(array[i][4] === 3)
          vfsi_beat_start.push({name: 'upstroke_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.upstroke}})
        else if(array[i][4] === 4)
          vfsi_beat_start.push({name: 'peak_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.peak}})
        else if(array[i][4] === 5)
          vfsi_beat_start.push({name: 'incisura_vfsi',index:i,coord:[this.state.x_points_vfs[i],vfsi[i]],itemStyle:{color:echart_colors.incisura}})
        if(array[i][6] === 1)
          psa_beat_start.push({name: 'inicio_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.start_heartbeat}})
        else if(array[i][6] === 3)
          psa_beat_start.push({name: 'upstroke_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.upstroke}})
        else if(array[i][6] === 4)
          psa_beat_start.push({name: 'peak_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.peak}})
        else if(array[i][6] === 5)
          psa_beat_start.push({name: 'peak_psa',index:i,coord:[this.state.x_points_vfs[i],psa[i]],itemStyle:{color:echart_colors.incisura}})
      }
      var vfsd_beat = {symbol:'circle',symbolSize:5,data:vfsd_beat_start}
      var vfsi_beat = {symbol:'circle',symbolSize:5,data:vfsi_beat_start}
      var psa_beat = {symbol:'circle',symbolSize:5,data:psa_beat_start}
      return[vfsd_beat,vfsi_beat,psa_beat]
    }

    getDataToPar = () =>{
      this.handleOpenBeat()
      var vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      var vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      var psa = this.state.serie_psa[this.state.indexSignal].data
      var signals_aux = [this.state.serie_vfsd,this.state.serie_vfsi,this.state.serie_psa,this.state.serie_co2]
      var signals_history_aux = [...this.state.signals_history]

      //var signals = [{filter:this.state.history[this.state.indexSignalToDelete].name}]
      var signals = [{filter:this.state.signals_history[this.state.indexSignal].filter}]
      var history = [...this.state.history]
      
      //history = [history[this.state.indexSignalToDelete]]
      if(history.length > 0)
        history.push({name:'latidos',prev:signals[0].filter,data:'detec latidos',dialog:history[this.state.indexSignalToDelete].dialog + '\n' + 'detección de latidos'})
      else
        history.push({name:'latidos',prev:signals[0].filter,data:'detec latidos',dialog:'detección de latidos'})
      var beats_detected;
      var signal_to_detect_beats = [vfsd,vfsi,psa]
      var obj = {
        signal:JSON.stringify(signal_to_detect_beats),
        times: JSON.stringify(this.state.x_points_vfs)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/detection/R/detection/json',
        data: obj
      })
      .then(res => {
        
        beats_detected = this.getStartBeat(res.data,vfsd,vfsi,psa)
        var vfsd_beats = beats_detected[0]
        var vfsi_beats = beats_detected[1]
        var psa_beats = beats_detected[2]
        this.setState({
            heart_beats_detected:res.data,
            signals_history: signals,
            history: history,
            is_heart_beat_detected:true,
            serie_signals_history:signals_aux,
            signal_history_backup:signals_history_aux,
            indexSignal:0,
            etco2_echart:'none',
            serie_vfsd:[{
              name:'VFSD',type:'line',data:vfsd,
              symbol:echart_options.series.symbol,
              symbolSize: echart_options.series.symbolSize,
              itemStyle:{color:'#d22824'},
              markPoint:vfsd_beats
            }],
            serie_vfsi:[{
              name:'VFSI',type:'line',data:vfsi,
              symbol:echart_options.series.symbol,
              symbolSize: echart_options.series.symbolSize,
              itemStyle:{color:'#d22824'},
              markPoint: vfsi_beats
            }],
            serie_psa:[{
              name:'PSA',type:'line',data:psa,
              symbol:echart_options.series.symbol,
              symbolSize: echart_options.series.symbolSize,
              itemStyle:{color:'#029eb1'},
              markPoint: psa_beats
            }]
          },()=>{
            this.updateOptionsPar(vfsd_beats.data.length/4,vfsi_beats.data.length/4,psa_beats.data.length/4)
            this.handleCloseBeat()
          })
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false}, ()=>{this.handleCloseBeat()})})
      //var marks = {symbol:'arrow',symbolSize:60,data:maximos}
      
    }

    sync_heartbeat(){
    
      this.handleOpenSyncSignalsWait()
      this.handleCloseSyncSignals()
      //var signals = [{filter:this.state.signals_history[this.state.indexSignal].filter}]
      var history = [...this.state.history]
      var signals_aux = [this.state.serie_vfsd,this.state.serie_vfsi,this.state.serie_psa,this.state.serie_co2]
      let rate_aux = this.state.headerFile[0].header[3].split(':')[1]
      if(history.length > 0)
        history.push({name:'sync',prev:this.state.signals_history[this.state.indexSignal].filter,data:'señales sync',dialog:history[this.state.indexSignalToDelete].dialog + '\n' + 'señales sincronizadas'})
      else
        history.push({name:'sync',prev:this.state.signals_history[0].filter,data:'señales sync',dialog:'señales sincronizadas'})
      let rate = ''
      var i = 0
      for(var i = 0; rate_aux[i] != 'H'; i++)
        rate+=rate_aux[i]
      var obj = {
        signal:JSON.stringify(this.state.heart_beats_detected),
        times: JSON.stringify(this.state.x_points_vfs),
        frecuency:parseInt(rate)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/sync/R/sync/json',
        data: obj
      })
      .then(res=>{
        console.log(res.data)
        var sync_data = this.getSyncHeartBeat(res.data)
        this.setState({
          //signals_history: signals,
          is_signal_sync: true,
          history: history,
          sync_data:res.data,
          //is_heart_beat_detected:true,
          //serie_signals_history:signals_aux,
          //signal_history_backup:signals_history_aux,
          indexSignal:0,
          etco2_echart:'none',
          x_points_vfs:sync_data[0],
          serie_vfsd:[{
            name:'VFSD',type:'line',data:sync_data[1],
            symbol:echart_options.series.symbol,
            symbolSize: echart_options.series.symbolSize,
            itemStyle:{color:'#d22824'},
            markPoint:sync_data[4]
          }],
          serie_vfsi:[{
            name:'VFSI',type:'line',data:sync_data[2],
            symbol:echart_options.series.symbol,
            symbolSize: echart_options.series.symbolSize,
            itemStyle:{color:'#d22824'},
            markPoint: sync_data[5]
          }],
          serie_psa:[{
            name:'PSA',type:'line',data:sync_data[3],
            symbol:echart_options.series.symbol,
            symbolSize: echart_options.series.symbolSize,
            itemStyle:{color:'#029eb1'},
            markPoint: sync_data[6]
          }]
        },()=>{
          
          this.updateOptionsSync(sync_data[4].data.length/3,sync_data[5].data.length/3,sync_data[6].data.length/3)
          this.handleCloseSyncSignalsWait()
          //this.handleCloseBeat()
        })
    })
    .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false}, ()=>{this.handleCloseSyncSignalsWait()})})
    
    }

    getSyncHeartBeat(sync_json){
      console.log(sync_json)
      var sync_time = []
      var vfsd_sync = []
      var vfsi_sync = []
      var psa_sync = []
      var heartbeat_vfsd = []
      var heartbeat_vfsi = []
      var heartbeat_psa = []
      var actual_vfsd = 0
      var actual_vfsi = 0
      var actual_psa = 0
      for(var i = 0; i < sync_json.length; i++){
        sync_time.push(sync_json[i].Time)
        vfsd_sync.push(sync_json[i].vfsd)
        vfsi_sync.push(sync_json[i].vfsi)
        psa_sync.push(sync_json[i].psa)
        
        if(sync_json[i].LATIDO_vfsd > actual_vfsd){
          actual_vfsd = sync_json[i].LATIDO_vfsd
          heartbeat_vfsd.push({coord:[sync_json[i].Time,sync_json[i].vfsd],itemStyle:{color:'#fff'}})
        }
        else if(sync_json[i].vfsd_pos === 3)
          heartbeat_vfsd.push({coord:[sync_json[i].Time,sync_json[i].vfsd],itemStyle:{color:echart_colors.upstroke}})
        else if(sync_json[i].vfsd_pos === 4)
          heartbeat_vfsd.push({coord:[sync_json[i].Time,sync_json[i].vfsd],itemStyle:{color:echart_colors.peak}})
        
        if(sync_json[i].LATIDO_vfsi > actual_vfsi){
          actual_vfsi = sync_json[i].LATIDO_vfsi
          heartbeat_vfsi.push({coord:[sync_json[i].Time,sync_json[i].vfsi],itemStyle:{color:'#fff'}})
        }
        else if(sync_json[i].vfsi_pos === 3)
          heartbeat_vfsi.push({coord:[sync_json[i].Time,sync_json[i].vfsi],itemStyle:{color:echart_colors.upstroke}})
        else if(sync_json[i].vfsi_pos === 4)
          heartbeat_vfsi.push({coord:[sync_json[i].Time,sync_json[i].vfsi],itemStyle:{color:echart_colors.peak}})
        
        if(sync_json[i].LATIDO_psa > actual_psa){
          actual_psa = sync_json[i].LATIDO_psa
          heartbeat_psa.push({coord:[sync_json[i].Time,sync_json[i].psa],itemStyle:{color:'#fff'}})
        }
        else if(sync_json[i].psa_pos === 3)
          heartbeat_psa.push({coord:[sync_json[i].Time,sync_json[i].psa],itemStyle:{color:echart_colors.upstroke}})
        else if(sync_json[i].psa_pos === 4)
          heartbeat_psa.push({coord:[sync_json[i].Time,sync_json[i].psa],itemStyle:{color:echart_colors.peak}})
      }
      var vfsd_beat_sync = {symbol:'circle',symbolSize:5,data:heartbeat_vfsd}
      var vfsi_beat_sync = {symbol:'circle',symbolSize:5,data:heartbeat_vfsi}
      var psa_beat_sync = {symbol:'circle',symbolSize:5,data:heartbeat_psa}
      return([sync_time,vfsd_sync,vfsi_sync,psa_sync,vfsd_beat_sync,vfsi_beat_sync,psa_beat_sync])
    }

    getPCCRAP = (event) =>{
      event.preventDefault()
      this.handleOpenWaitPCCRAP()
      this.handleClosePCCRAP()
      
      var obj = {
        signal:JSON.stringify(this.state.sync_data),
        times: JSON.stringify(this.state.x_points_vfs)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/par/R/getParFile/json',
        data: obj
      })
      .then(res => {
        console.log(res.data)
        this.handleCloseWaitPCCRAP()
      })
      .catch((error) => {this.setState({open_snackbar:true,message_snackbar:error.message,openWait:false}, () => {this.handleCloseWaitPCCRAP()})})
    }

    renderMissingSignal(){
        const { classes } = this.props
        return(
            <div >
                <div className = {classes.selectSignal}>
                <Timeline className = {classes.myIcon2} />
                <h1 className = {classes.selectTitle}>Para comenzar cargue una señal</h1>
                <div className = {classes.nextStep}>
                    <Button 
                        variant = "contained" 
                        className = {classes.myPrimaryColor}
                        onClick = {this.handleClickOpen}>Seleccionar</Button>
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
                    
                </div>
            </div>
            </div>
            
        )
    }

    renderSignal(){
        const { classes } = this.props
        let onEvents = {
          //'mouseup':this.onMouseUp,
          //'mousedown':this.onMouseDown,
          'brushselected':this.onSelectPoints,
          'click': this.onChangePeak
        };
        return(
          <div style = {{flexGrow:1}}>
            <Grid container spacing={16}>
            
              <Grid item lg = {10} xl = {10} md = {9}>
                <Paper className = {classes.paper}>
                <Grid container style = {{marginBottom:'20px',textAlign:'center',flexGrow:1}}>
                  <Grid item lg = {3} xl = {3} md = {3} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Archivo: <span style = {{fontStyle:'italic'}}>{this.state.name_signal}</span></p>
                  
                  </Grid> 
                  <Grid item lg = {3} xl = {3} md = {3} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Duración señal: <span style = {{fontStyle:'italic'}}>{this.state.signal_time} </span></p>
                  </Grid>
                  <Grid item lg = {3} xl = {3} md = {3} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Tasa muestreo: <span style = {{fontStyle:'italic'}}>{this.state.headerFile[0].header[3].split(':')[1]}</span></p>
                  </Grid> 
                  <Grid item lg = {3} xl = {3} md = {3} >
                  <form style = {{display:'flex',flexWrap:'wrap',marginTop:'13px'}} autoComplete="off" >
                    <FormControl  className={classes.formControl} style = {{marginBottom:0}}>
                      <Select
                          name = "filters"
                          className={classes.textField}
                          value={this.state.filter}
                          onChange={this.handleChangeFilter('filter')}
                          displayEmpty
                          autoWidth
                          disabled={this.state.is_heart_beat_detected}
                      >
                        <MenuItem value="" disabled>
                            -- Filtros --
                          </MenuItem>
                        {this.state.filters.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    </form>
                  </Grid>
                  
                </Grid>
                <Grid container>
                <Grid item lg = {12} xl = {12} md = {12}>
                <ReactEcharts ref='echarts_react_1'
                  option={this.getOption_VFSD()}
                  style={{height: 300,marginBottom:'10px'}}
                  notMerge={true}
                  lazyUpdate={true}
                  showZoom={true}
                  onEvents={onEvents}
                  />
                  {this.state.is_heart_beat_detected ?
                  <Grid container>
                    <Grid item lg = {3} xl = {3} md = {6}>
                    <Button variant="contained" className={classes.btn_peaks} onClick = {()=>this.getUpstroke(2)}>Re-calcular upstroke</Button>
                    </Grid>
                  </Grid>
                    
                  :
                    <div></div>
                  }
                  </Grid>
                  <Grid item lg = {12} xl = {12} md = {12}>
                  <ReactEcharts ref='echarts_react_2'
                  option={this.getOption_VFSI()}
                  style={{height: 300,marginBottom:'20px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  notMerge={true}
                  onEvents={onEvents}
                  />
                  {this.state.is_heart_beat_detected ?
                   <Grid container>
                    <Grid item lg = {3} xl = {3} md = {6}>
                      <Button variant="contained" className={classes.btn_peaks} onClick = {()=>this.getUpstroke(4)}>Re-calcular upstroke</Button>
                    </Grid>
                   </Grid>
                    
                  :
                    <div></div>
                  }
                  </Grid>
                  <Grid item lg = {12} xl = {12} md = {12}>
                  <ReactEcharts ref='echarts_react_3'
                  option={this.getOption_PSA()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  notMerge={true}
                  onEvents={onEvents}
                  />
                  {this.state.is_heart_beat_detected ? 
                    <Grid container>
                      <Grid item lg = {3} xl = {3} md = {6}>
                        <Button variant="contained" className={classes.btn_peaks} onClick = {()=>this.getUpstroke(6)}>Re-calcular upstroke</Button>
                      </Grid>
                    </Grid>
                  :
                    <div></div>
                  }
                  </Grid>
                  <Grid item lg = {12} xl = {12} md = {12}>
                  <ReactEcharts ref='echarts_react_4'
                  option={this.getOption_CO2()}
                  style={{height: 300,marginBottom:'30px',display:this.state.etco2_echart}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  onEvents={onEvents}
                  />
                  </Grid>
                  </Grid>
                  </Paper>
              </Grid>
              <Grid item lg = {2} xl = {2} md = {2}>
                <Signal key = {3} signalHistory = {this.state.signals_history} changeSelectedSignal = {this.changeSelectedSignal}/>
                <History key = {this.state.index_key+1} history = {this.state.history} chooseSignalToDelete = {this.chooseSignalToDelete} FullHistory = {this.FullHistory} ConfirmSave = {this.ConfirmSave}/>
              </Grid>
            </Grid>
          </div>
        )
    }

    render(){
        const { classes } = this.props
        return(
            <div className = {classes.root}>
              <Drawer
                variant="permanent"
                classes={{paper: classNames(classes.drawer)}}> 
                <List className={classes.iconsAction}>
                  <ListItem button className={classes.itemAction} title = "Nuevo Archivo">
                    <ListItemIcon className = {classes.myIcon} onClick = {this.handleOpenDialogClean}><NoteAdd className = {classes.iconStyle}/></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction} title = "Cortar señal">
                    <ListItemIcon className = {classes.myIcon}><Crop onClick = {this.handleOpenDialogCutTime}/></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction} title = "Cortar selección">
                    <ListItemIcon className = {classes.myIcon}><CropFree onClick = {this.handleOpenDialogCut}/></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction} title = "Detectar latidos">
                    <ListItemIcon className = {classes.myIcon}><img src = {detectHeartbeatIcon} alt="" width="24" height="24" onClick = {this.handleOpenConfirmBeat}/></ListItemIcon>
                  </ListItem>
                  
                  <ListItem button className={classes.itemAction} title = "Sincronizar señales">
                    <ListItemIcon className = {classes.myIcon}><img src = {syncHeartBeatIcon} alt="" width="24" height="24" onClick = {this.handleOpenSyncSignals} /></ListItemIcon>
                  </ListItem>
                </List>
              </Drawer>
              <Grid container style = {{marginTop:'10px',height:'40px'}}>
                <Grid item xl = {12} lg={12} md={12} style = {{backgroundColor:'#27293D',boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'}}>
                  {/*<Typography style = {{marginTop:'8px',color:'#9a9a9a',fontStyle:'italic',marginLeft:'10px'}}>{this.state.helper_text}</Typography>*/}
                  
                </Grid>
              </Grid>
              <Grid container spacing={40} className ={classes.myGrid}>
                  {!this.state.isReadySignal ? this.renderMissingSignal() : this.renderSignal()}
              </Grid>
              
              <SnackbarPeak open_snackbar_peak = {this.state.open_snackbar_peak} message_snackbar = {this.state.message_snackbar} handleCloseSnackbarPeak = {this.handleCloseSnackbarPeak}/>
              <SnackbarWarning open_snackbar = {this.state.open_snackbar} message_snackbar = {this.state.message_snackbar} handleCloseSnackbar = {this.handleCloseSnackbar}/>
              
              {/* Dialog para seleccionar señal */}
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
                        <input required type = "file" onChange={this.onChange} />
                        <Button type = "submit" variant="contained" className = {classes.myPrimaryColor}>Cargar</Button>
                    </form>
                </FormControl>
              </Dialog>
              {/* Fin Dialog para seleccionar señal */}
              
              {/* Dialog para cambiar señal */}
              <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.open_dialog_clean}
                onClose={this.handleCloseDialogClean}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Nuevo archivo</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    ¿Está seguro que desea usar otra señal? Los cambios no guardados se perderan.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseDialogClean} style = {{color: '#2196f3'}}>
                      No
                    </Button>
                    <Button onClick={this.handleCleanData} style = {{color: '#2196f3'}} autoFocus>
                      Si
                    </Button>
                </DialogActions>
              </Dialog>
              {/* Fin Dialog para cambiar señal */}
              {/* Dialog para guardar señal */}
              <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.open_confirm_save}
                onClose={this.handleCloseConfirmSave}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Guardar señal resultante</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    ¿Está seguro que desea guardar la señal seleccionada?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseConfirmSave} style = {{color: '#2196f3'}}>
                      No
                    </Button>
                    <Button onClick={()=>this.exportSignal2()} style = {{color: '#2196f3'}} autoFocus>
                      Si
                    </Button>
                </DialogActions>
              </Dialog>
              {/* Fin Dialog para guardar señal */}

              {/* Dialog para cortar señal */}
              <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.open_dialog_cut}
                onClose={this.handleCloseDialogCut}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Cortar señal</DialogTitle>
                  {!this.isEmpty(this.state.brushArea) && this.state.signals_history.length === 1 ?
                    <div> 
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que desea cortar la señal?. El corte se aplicará a las 4 señales
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseDialogCut} style = {{color: '#2196f3'}}>
                        No
                      </Button>
                      <Button onClick={this.getPointsToSlice} style = {{color: '#2196f3'}} autoFocus>
                        Si
                      </Button>
                    </DialogActions>
                  </div>
                  :
                  <div> 
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No ha seleccionado sección de señal para cortar o existe más de una señal en el mismo gráfico.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseDialogCut} style = {{color: '#2196f3'}}>
                        Cerrar
                      </Button>
                    </DialogActions>
                  </div>
                  }
              </Dialog>
              {/* Fin Dialog para cortar señal */}

              {/* Dialog para cortar señal indicando tiempos*/}
              <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.open_dialog_cut_times}
                onClose={this.handleCloseDialogCutTime}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Cortar señal</DialogTitle>
                {this.state.signals_history.length === 1  ? 
                  <div>
                    <form onSubmit={this.splitSignalTimes.bind(this)}>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Ingrese el tiempo de inicio y fin requeridos de la señal  
                        </DialogContentText>  
                        <Input 
                          required
                          placeholder="Inicio (HH:MM:SS:CC)" 
                          className = {classes.input} 
                          value = {this.state.v1} 
                          onChange={this.handleChangeInput('v1')} 
                        />
                        <Input 
                          required
                          placeholder="Termino (HH:MM:SS:CC)" 
                          className = {classes.input}
                          value = {this.state.v2}   
                          onChange={this.handleChangeInput('v2')} 
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleCloseDialogCutTime} style = {{color: '#2196f3'}}>
                          Cancelar
                        </Button>
                        <Button type = "submit"  style = {{color: '#2196f3'}} autoFocus>
                          Aceptar
                        </Button>
                      </DialogActions>
                    </form>
                  </div>
                  :
                  <div> 
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No ha seleccionado sección de señal para cortar o existe más de una señal en el mismo gráfico.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseDialogCutTime} style = {{color: '#2196f3'}}>
                        Cerrar
                      </Button>
                    </DialogActions>
                  </div>
                }
              </Dialog>
              {/* Fin Dialog para cortar señal indicando tiempos */}

              {/* Dialog filtrando */}
              <Dialog
              open={this.state.openWait}
              onClose={this.handleCloseWait}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
              fullWidth={true}
              disableBackdropClick={true}
            >
              <DialogTitle id="alert-dialog-title">Filtrando</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Por favor espere ... 
                </DialogContentText>
                <br />
                <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary}} />
              </DialogContent>
            </Dialog>
            {/* Fin Dialog filtrando */}
            {/* Dialog para confirmar la deteccion de latidos */}
            <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.open_confirm_beat}
                onClose={this.handleCloseConfirmBeat}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Detectar latidos</DialogTitle>
                  {this.state.signals_history.length >= 1  ?
                    <div>
                    <DialogContent>
                      <p style = {{color:'rgba(0,0,0,.54)'}}>¿Está seguro que desea detectar latidos? Las señales no usadas serán guardadas.</p>
                      <p style = {{color:'rgba(0,0,0,.54)'}}>Para recuperarlas solo debe eliminar el resultado de este proceso en el historial.</p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseConfirmBeat} style = {{color: '#2196f3'}}>
                        No
                      </Button>
                      <Button onClick={()=>{this.getDataToPar()}} style = {{color: '#2196f3'}} autoFocus>
                        Si
                      </Button>
                    </DialogActions>
                    </div>
                  :
                  <div> 
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No ha cargado una señal. Imposible realizar la operación.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseConfirmBeat} style = {{color: '#2196f3'}}>
                        Cerrar
                      </Button>
                    </DialogActions>
                  </div>
                  }
                  
              </Dialog>
              {/* Fin Dialog para confirmar la deteccion de latidos */}

            {/* Dialog detectar latidos */}
            <Dialog
              open={this.state.openBeat}
              onClose={this.handleCloseBeat}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
              fullWidth={true}
              disableBackdropClick={true}
            >
              <DialogTitle id="alert-dialog-title">Detectando latidos</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Por favor espere ... 
                </DialogContentText>
                <br />
                <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary}} />
              </DialogContent>
            </Dialog>
            {/* Fin Dialog detectar latidos */}
            {/* Dialog para confirmar la sync de señales */}
            <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.open_sync_signals}
                onClose={this.handleCloseSyncSignals}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Sincronizar señales</DialogTitle>
                  {this.state.signals_history.length >= 1  && this.state.is_heart_beat_detected ?
                    <div>
                    <DialogContent>
                      <p style = {{color:'rgba(0,0,0,.54)'}}>¿Está seguro que desea sincronizar las señales (VFSD, VFSI, PSA)? </p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseSyncSignals} style = {{color: '#2196f3'}}>
                        No
                      </Button>
                      <Button onClick={()=>{this.sync_heartbeat()}} style = {{color: '#2196f3'}} autoFocus>
                        Si
                      </Button>
                    </DialogActions>
                    </div>
                  :
                  <div> 
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No ha cargado una señal. Imposible realizar la operación.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseSyncSignals} style = {{color: '#2196f3'}}>
                        Cerrar
                      </Button>
                    </DialogActions>
                  </div>
                  }
                  
              </Dialog>
              {/* Fin Dialog para confirmar la sync de señales */}
            {/* Dialog upstroke señales */}
            <Dialog
              open={this.state.open_upstroke_wait}
              onClose={this.handleCloseUpstrokeWait}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
              disableBackdropClick={true}
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">Recalculando Upstroke</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Por favor espere ... 
                </DialogContentText>
                <br />
                <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary}} />
              </DialogContent>
            </Dialog>
            {/* Fin Dialog upstroke señales */}
            {/* Dialog sync señales */}
            <Dialog
              open={this.state.open_sync_signals_wait}
              onClose={this.handleCloseSyncSignalsWait}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
              disableBackdropClick={true}
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">Sincronizando señales</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Por favor espere ... 
                </DialogContentText>
                <br />
                <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary}} />
              </DialogContent>
            </Dialog>
            {/* Fin Dialog sync señales */}
            {/* Dialog para pcc y rap */}
            <Dialog
                open={this.state.open_pcc_rap}
                onClose={this.handleClosePCCRAP}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">Detectar PCC y RAP</DialogTitle>
              {this.state.is_signal_sync ? 
                <form onSubmit={this.getPCCRAP.bind(this)}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Seleccione los métodos con los que desee calcular la PCC (presión cierre crítico) y RAP (resistencia área-producto).
                  </DialogContentText>
                  <Grid container >
                    <Grid item lg = {12} xl = {12} md = {12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.RL}
                            onChange={this.handleChange('RL')}
                            value="RL"
                            inputProps={{
                              'aria-label': 'primary checkbox',
                            }}
                        />
                        }
                        label= "Regresión Lineal"
                      />
                    </Grid>
                    <Grid item lg = {12} xl = {12} md = {12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.RE}
                            onChange={this.handleChange('RE')}
                            value="RE"
                            inputProps={{
                              'aria-label': 'primary checkbox',
                            }}
                        />
                        }
                        label= "Regresión Exponencial"
                      />
                    </Grid>
                    <Grid item lg = {12} xl = {12} md = {12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.RE}
                            onChange={this.handleChange('PS')}
                            value="RE"
                            inputProps={{
                              'aria-label': 'primary checkbox',
                            }}
                        />
                        }
                        label= "Puntos sistólicos y diastólicos"
                      />
                    </Grid>
                    <Grid item lg = {12} xl = {12} md = {12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.RE}
                            onChange={this.handleChange('PM')}
                            value="RE"
                            inputProps={{
                              'aria-label': 'primary checkbox',
                            }}
                        />
                        }
                        label= "Puntos medios y diastólicos"
                      />
                    </Grid>
                    
                  </Grid> 
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClosePCCRAP} style = {{color: '#2196f3'}}>
                    Cancelar
                  </Button>
                  <Button type = "submit"  style = {{color: '#2196f3'}} autoFocus>
                    Aceptar
                  </Button>
                </DialogActions>
                </form>
                :
                <div>
                  <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No ha cargado una señal o no ha realizado la sincronización entre las señales.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClosePCCRAP} style = {{color: '#2196f3'}}>
                        Cerrar
                      </Button>
                    </DialogActions>
                </div>
              }

              {/* Dialog espera calculo de pcc y rap */}
            <Dialog
              open={this.state.open_wait_pccrap}
              onClose={this.handleCloseWaitPCCRAP}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
              fullWidth={true}
              disableBackdropClick={true}
            >
              <DialogTitle id="alert-dialog-title">Calculando PCC y RAP</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Por favor espere ... 
                </DialogContentText>
                <br />
                <LinearProgress classes={{
                                        colorPrimary: classes.linearColorPrimary,
                                        barColorPrimary: classes.linearBarColorPrimary}} />
              </DialogContent>
            </Dialog>
            {/* Fin Dialog espera calculo pcc y rap */}
              
              </Dialog>     
              {/* Fin Dialog para pcc y rap*/}

              {/* Dialog para Hermite */}
              <Dialog
                open={this.state.open_hermite}
                onClose={this.handleCloseHermite}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{title_hermite}</DialogTitle>
              <form onSubmit={this.handleSendFilter.bind(this)}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_hermite}
                </DialogContentText>
                
                <TextField 
                  required
                  placeholder="Ingrese porcentaje(*)" 
                  className = {classes.input} 
                  type="number" 
                  helperText = "Ingrese porcentaje (ej:1)"
                  value={this.state.value_order_hermite}
                  onChange={this.handleChangeInput('value_order_hermite')}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>} 
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseHermite} style = {{color: '#2196f3'}}>
                  Cancelar
                </Button>
                <Button type = "submit"  style = {{color: '#2196f3'}} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
              </form>
              </Dialog>     
              {/* Fin Dialog para Hermite*/}
              {/* Dialog para Mediana */}
              <Dialog
                open={this.state.open_median}
                onClose={this.handleCloseMedian}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{title_median}</DialogTitle>
              <form onSubmit={this.handleSendFilter.bind(this)}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_median}
                </DialogContentText>
                <TextField
                  placeholder="Ingrese orden (ej: 5)" 
                  helperText = "Ingrese orden (ej:5)"
                  className = {classes.input} 
                  type="number"
                  value={this.state.value_order_median} 
                  onChange={this.handleChangeInput('value_order_median')}
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseMedian} style = {{color: '#2196f3'}}>
                  Cancelar
                </Button>
                <Button type = "submit" style = {{color: '#2196f3'}} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
              </form>
              </Dialog>     
              {/* Fin Dialog para Mediana*/}

              {/* Dialog para Hampel*/}
              <Dialog
                open={this.state.open_hampel}
                onClose={this.handleCloseHampel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{title_hampel}</DialogTitle>
              <form onSubmit={this.handleSendFilter.bind(this)}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_hampel}
                </DialogContentText>
                <TextField required value = {this.state.value_window_hampel} placeholder="Ventana (ej: 10)" helperText="Ventana (ej:10)" className = {classes.input} type="number" onChange={this.handleChangeInput('value_thresold_window')} />
                <TextField  required value = {this.state.value_thresold_hampel} placeholder="Thresold (ej: 1.6)" helperText="Thresold (ej:1.6)" className = {classes.input}  step=".01" onChange={this.handleChangeInput('value_thresold_hampel')} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseHampel} style = {{color: '#2196f3'}}>
                  Cancelar
                </Button>
                <Button type = "submit" style = {{color: '#2196f3'}} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
              </form>
              </Dialog>
              {/* Fin Dialog para Hampel*/}

              {/* Dialog para Butterworth*/}
              <Dialog
                open={this.state.open_butterworth}
                onClose={this.handleCloseButterworth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{title_butterworth}</DialogTitle>
              <form onSubmit={this.handleSendFilter.bind(this)}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_butterworth}
                </DialogContentText>
                <TextField required value = {this.state.value_order_butter} placeholder="Orden (ej: 4)" helperText="Orden (ej:4)" className = {classes.input} type="number" onChange={this.handleChangeInput('value_order_butter')} />
                <TextField required value = {this.state.value_slice_butter} placeholder="Corte (ej: 20)" helperText="Corte (ej: 20)" className = {classes.input}  onChange={this.handleChangeInput('value_slice_butter')} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseButterworth} style = {{color: '#2196f3'}}>
                  Cancelar
                </Button>
                <Button type = "submit" style = {{color: '#2196f3'}} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
              </form>
              </Dialog>
              {/* Fin Dialog para Butterworth*/}

              {/* Dialog para Automatic*/}
              <Dialog
                open={this.state.open_automatic}
                onClose={this.handleCloseAutomatic}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{title_automatic}</DialogTitle>
              <form onSubmit={this.handleSendFilter.bind(this)}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" style = {{marginBottom:'20px'}}>
                  {text_automatic}
                </DialogContentText>
                <Grid container style = {{marginBottom:'10px'}}>
                  <Grid item lg = {2} xl = {2} md = {3}>
                    <p style = {{color:'rgba(0,0,0,.7)'}}>Hermite</p>
                  </Grid>
                  <Grid item lg = {10} xl = {10} md = {3}>
                    <TextField value = {this.state.value_order_hermite} required placeholder="Orden Hermite (ej: 1)" helperText="Orden Hermite (ej: 1)" className = {classes.input} type="number" onChange={this.handleChangeInput('value_order_hermite')} />
                  </Grid>
                </Grid>
                <Grid container style = {{marginBottom:'10px'}}>
                  <Grid item lg = {2} xl = {2} md = {3}>
                  <p style = {{color:'rgba(0,0,0,.7)'}}>Hampel</p>
                  </Grid>
                  <Grid item lg = {10} xl = {10} md = {3}>
                    <TextField required value = {this.state.value_window_hampel} placeholder="Ventana Hampel (ej: 10)" helperText= "Ventana Hampel (ej: 10)" className = {classes.input} type="number" onChange={this.handleChangeInput('value_window_hampel')} />
                    <TextField required value = {this.state.value_thresold_hampel} placeholder="Thresold Hampel(ej: 1.6)" helperText="Thresold Hampel(ej: 1.6)" className = {classes.input} onChange={this.handleChangeInput('value_thresold_hampel')} />
                  </Grid>
                </Grid>
                <Grid container style = {{marginBottom:'10px'}}>
                  <Grid item lg = {2} xl = {2} md = {3}>
                  <p style = {{color:'rgba(0,0,0,.7)'}}>Butterworth</p>
                  </Grid>
                  <Grid item lg = {10} xl = {10} md = {3}>
                    <TextField required value = {this.state.value_order_butter} placeholder="Orden Butter (ej: 5)" helperText="Orden Butter (ej: 5)" className = {classes.input} type="number" onChange={this.handleChangeInput('value_order_butter')} />
                    <TextField required value = {this.state.value_slice_butter} placeholder="Corte Butter (ej: 20)" helperText="Corte Butter (ej: 20)" className = {classes.input}  onChange={this.handleChangeInput('value_slice_butter')} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseAutomatic} style = {{color: '#2196f3'}}>
                  Cancelar
                </Button>
                <Button type = "submit" style = {{color: '#2196f3'}} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
              </form>
              </Dialog>
              {/* Fin Dialog para Automatic*/}
              
              {/*Dialog delete signal*/}
              <Dialog
                open={this.state.open_dialog_delete_signal}
                onClose={this.handleCloseDialogDeleteSignal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">Eliminar señal</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Está seguro que desea eliminar la señal resultante?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseDialogDeleteSignal} style = {{color: '#2196f3'}}>
                  No
                </Button>
                <Button onClick={this.deleteSignal} style = {{color: '#2196f3'}} autoFocus>
                  Si
                </Button>
              </DialogActions>
              </Dialog>
              {/*Fin Dialog delete signal*/}
              {/* Dialog para mostrar historial completo de la señal seleccionada */}
              <Dialog 
                maxWidth="sm"
                fullWidth={true}
                open={this.state.openDialogFullHistory}
                onClose={this.handleCloseDialogFullHistory}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">Detalle historial</DialogTitle>
                <DialogContent>
                  <p style = {{color: 'rgba(0,0,0,0.54)'}}>Se han aplicado los siguientes filtros a la señal seleccionada: </p>
                  <ul>
                    {this.state.history.length >= 1 ? this.showHistoryDetail(): <p>nada</p>}
                  </ul>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleCloseDialogFullHistory} style = {{color: '#2196f3'}}>
                  Cerrar
                </Button>
              </DialogActions>
              </Dialog>
              {/* Fin Dialog para mostrar historial completo de la señal seleccionada */}
            </div>
            
        )
    }

}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        signal_global: state.signal_global,
        vsfd_global: state.vsfd_global,
        vsfi_global: state.vsfi_global,
        psa_global: state.psa_global,
        co2_global: state.co2_global,
        
        signalHistory: state.signalHistory
    }
}

const mapDispatchToProps = (dispatch) => ({
        loadSignal: formData => dispatch(loadSignal(formData)),
        setSignalVSFD: vfsd => dispatch(setSignalVSFD(vfsd)),
        setSignalVSFI: vfsi => dispatch(setSignalVSFI(vfsi)),
        setSignalPSA: psa => dispatch(setSignalPSA(psa)),
        setSignalCO2: co2 => dispatch(setSignalCO2(co2))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));