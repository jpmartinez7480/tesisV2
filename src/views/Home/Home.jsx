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
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Crop from '@material-ui/icons/Crop';
import CropFree from '@material-ui/icons/CropFree';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Save from '@material-ui/icons/Save';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined'
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import SnackbarWarning from '../../components/Dialogs/snackbar'
import { connect } from 'react-redux'

import Signal from '../../components/Card/Signal'
import History from '../../components/Card/History'
import { loadSignal }  from '../../actions/actions.signal'
import { setSignalVSFD } from '../../actions/actions.vsfd'
import { setSignalVSFI } from '../../actions/actions.vsfi'
import { setSignalPSA } from '../../actions/actions.psa'
import { setSignalCO2 } from '../../actions/actions.co2'


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
            v1: '',
            v2: '',
            v3:'',
            v4:'',
            v5:'',
            signal_time:0,
            indexSignal:0,
            indexSignalToDelete:0,
            colorSignal: '',
            serie_vfsd: [],
            serie_vfsi: [],
            serie_psa: [],
            serie_co2: [],
            start_point_cut:0,
            end_point_cut:0,
            data_filter_VFS: [{name:'VFSD',textStyle:echart_options.textStyle}],
            data_filter_VFSI: [{name:'VFSI',textStyle:echart_options.textStyle}],
            data_filter_PSA: [{name:'PSA',textStyle:echart_options.textStyle}],
            data_filter_CO2: [{name:'CO2',textStyle:echart_options.textStyle}],
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
            openDialogFullHistory: false,
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
            brushArea:{}

        }
        this.onChange = this.onChange.bind(this)
        this.handleUploadSignal = this.handleUploadSignal.bind(this)
        this.handleSendFilter = this.handleSendFilter.bind(this)
        this.splitSignalTimes = this.splitSignalTimes.bind(this)
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
            echarts.connect('group1');
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

    deleteSignal = () =>{
      var serie_vfsd_copy = [...this.state.serie_vfsd]
      var serie_vfsi_copy = [...this.state.serie_vfsi]
      var serie_psa_copy = [...this.state.serie_psa]
      var serie_co2_copy= [...this.state.serie_co2]
      var history_copy = [...this.state.history]
      var signals_history_copy = [...this.state.signals_history]
      serie_vfsd_copy.splice(this.state.indexSignalToDelete+1,1)
      serie_vfsi_copy.splice(this.state.indexSignalToDelete+1,1)
      serie_psa_copy.splice(this.state.indexSignalToDelete+1,1)
      serie_co2_copy.splice(this.state.indexSignalToDelete+1,1)
      history_copy.splice(this.state.indexSignalToDelete)
      signals_history_copy.splice(this.state.indexSignalToDelete+1,1)
      this.setState({serie_vfsd:serie_vfsd_copy,serie_vfsi:serie_vfsi_copy,serie_psa:serie_psa_copy,serie_co2:serie_co2_copy,history:history_copy,signals_history:signals_history_copy},()=>{
        this.updateOptions()
        this.handleCloseDialogDeleteSignal()
      })
      
    }

    getAutomaticFilter(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]

      var obj = {
        listaSenal:JSON.stringify(signal_to_filter),
        order_hermite:parseInt(this.state.v1),
        window_hampel:parseInt(this.state.v2),
        thresold_hermite:parseFloat(this.state.v3),
        order_butter:parseInt(this.state.v4),
        cut_butter:parseFloat(this.state.v5)
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
          
          filter = filter + ' ' + (aux).toString(10)
          
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.automatic,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:"Automatic "+this.searchSignal("Automatic",this.state.signals_history).toString(10)})
          if(this.state.indexSignal >= 1)
            h.push({name:this.state.filter,data:'pendiente',dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden Hermite: '+this.state.v1+'/ '+'ventana Hampel: '+ this.state.v2+';'+' umbral Hampel: '+this.state.v3+'/ '+'orden Butterworth: '+this.state.v4+';'+' corte Butterworth:'+this.state.v5})
          else
            h.push({name:this.state.filter,data:'pendiente',dialog:'orden Hermite: '+this.state.v1+'/ '+'ventana Hampel: '+ this.state.v2+';'+' umbral Hampel: '+this.state.v3+'/ '+'orden Butterworth: '+this.state.v4+';'+' corte Butterworth:'+this.state.v5})
          this.setState({signals_history:sh,history:h})
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
        order:parseInt(this.state.v1)
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
          
          filter = filter + ' ' + (aux).toString(10)
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hermite,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:"Hermite "+this.searchSignal("Hermite ",this.state.signals_history).toString(10)})
          if(this.state.indexSignal >= 1)
            h.push({name:this.state.filter,data:'Ord: '+this.state.v1,dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden Hermite: '+this.state.v1})
          else
            h.push({name:this.state.filter,data:'Ord: '+this.state.v1,dialog:'orden Hermite: '+this.state.v1})
          this.setState({signals_history:sh,history:h})
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
        window: parseInt(this.state.v1),
        threshold: parseFloat(this.state.v2)
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
          
          filter = filter + ' ' + (aux).toString(10)
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.hampel,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:"Hampel "+this.searchSignal("Hampel ",this.state.signals_history).toString(10)})
          if(this.state.indexSignal >= 1)
            h.push({name:this.state.filter,data:'W: '+this.state.v1+'/ T: '+this.state.v2,dialog:h[this.state.indexSignal-1].dialog+'\n'+'ventana Hampel: '+this.state.v1+'/ '+ 'umbral: '+this.state.v2})
          else
            h.push({name:this.state.filter,data:'W: '+this.state.v1+'/ T: '+this.state.v2,dialog:'ventana Hampel: '+this.state.v1+'/ '+ 'umbral: '+this.state.v2})
          this.setState({signals_history:sh,history:h})
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
      var obj = {
        signal:JSON.stringify(signal_to_filter),
        order: parseInt(this.state.v1),
        frecuency: parseFloat(this.state.v2)
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
          
          filter = filter + ' ' + (aux).toString(10)
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.butterworth,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:"Butterworth "+this.searchSignal("Butterworth ",this.state.signals_history).toString(10)})
          if(this.state.indexSignal >= 1)
            h.push({name:this.state.filter,data:'Ord:'+this.state.v1+'/ Cut: '+this.state.v2,dialog:h[this.state.indexSignal-1].dialog+'\n'+'orden Butterworth: '+this.state.v1+'/ '+'corte Butterworth: '+this.state.v2})
          else
            h.push({name:this.state.filter,data:'Ord:'+this.state.v1+'/ Cut: '+this.state.v2,dialog:'orden Butterworth: '+this.state.v1+'/ '+'corte Butterworth: '+this.state.v2})
          this.setState({signals_history:sh,history:h})
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
        order: parseInt(this.state.v1),
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
          
          filter = filter + ' ' + (aux).toString(10)
          
          this.updateDataFilter(filter)
          this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          this.state.serie_co2.push({name:filter,type:'line',data:res.data[3],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
          var sh = [...this.state.signals_history]
          var h = [...this.state.history]
          sh.push({filter:"Mediana "+this.searchSignal("Mediana",this.state.signals_history).toString(10)})
          if(this.state.indexSignal >= 1)
            h.push({name:this.state.filter,data:'Ord: '+this.state.v1,dialog:h.dialog+'\n'+'orden mediana:'+this.state.v1})
          else
            h.push({name:this.state.filter,data:'Ord: '+this.state.v1,dialog:'orden mediana:'+this.state.v1})
          this.setState({signals_history:sh,history:h})
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

    exportSignal(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[this.state.indexSignal].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]
      var obj = {
        signals:JSON.stringify(signal_to_filter),
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/exportSignal/R/exportSignal/json',
        data: obj
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
        this.setState({serie_vfsd:[],serie_vfsi:[],serie_psa:[],serie_co2:[],x_points_vfs:[],history:[],signals_history:[],data_filter_VFS:[{name:'VFSD',textStyle:echart_options.textStyle}],data_filter_VFSI:[{name:'VFSI',textStyle:echart_options.textStyle}],data_filter_PSA:[{name:'PSA',textStyle:echart_options.textStyle}],data_filter_CO2:[{name:'CO2',textStyle:echart_options.textStyle}],filter:'',signal_time:0,indexSignal:0,name_signal:''},() => {
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
        console.log(json)
        for(var i = 1; i < json.length; i++){
          vsfd.push(Number(json[i].V3))
          vsfi.push(Number(json[i].V4))
          psa.push(Number(json[i].V5))
          co2.push(Number(json[i].V7))
          x_points.push(json[i].V1)      
        }
        let time = this.getSignalTime(vsfd.length).toFixed(1)
        
        
        this.setState({x_points_vfs:x_points,signals_history:[{filter:'Inicial'}],signal_time:time})
        this.state.serie_vfsd.push({name:'VFSD',type:'line',data:vsfd,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'}})
        this.state.serie_vfsi.push({name:'VFSI',type:'line',data:vsfi,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'}})
        this.state.serie_psa.push({name: 'PSA', type:'line',data: psa,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#029eb1'}})
        this.state.serie_co2.push({name:'CO2',type:'line',data:co2,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#288c6c'}})
        this.setState({isReadySignal:true,name_signal:this.state.filename.name}, () => {
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
        
        tooltip: echart_options.tooltip.trigger,
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
              max: 100,
              min: 0,
              boundaryGap: echart_options.yAxis.boundaryGap,
              axisLabel:echart_options.yAxis.axisLabel,
              axisLine:echart_options.yAxis.axisLine,
            }
          ],
          series: this.state.serie_vfsd
          
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
          max: 100,
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
        text:'CO2',
        textStyle:echart_options.textStyle
      },
      brush:{toolbox:['lineX','clear'],throttleType: 'debounce',throttleDelay: 1000,xAxisIndex: 0},
      tooltip: echart_options.tooltip,
      legend: {
        data:[{name:'CO2',textStyle:echart_options.textStyle}]
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
          data:this.state.data_filter_VFS
        },
        series:this.state.serie_vfsd
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          data:this.state.data_filter_VFSI
        },
        series:this.state.serie_vfsi
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          data:this.state.data_filter_PSA
        },
        series:this.state.serie_psa
      })
      this.refs.echarts_react_4.getEchartsInstance().setOption({
        xAxis:[{data:this.state.x_points_vfs}],
        legend: {
          data:this.state.data_filter_CO2
        },
        series:this.state.serie_co2
      })
    }

    onChartClick = (param, echarts) => {
      console.log(param.dataIndex)
      this.setState({indexSignal:param.seriesIndex})
    };

    onMouseUp = (param, echarts) => {
      console.log('UP')
      console.log(param.dataIndex)
     
      
    };

    onMouseDown = (param,echarts) => {
      console.log('Down')
      this.refs.echarts_react_1.getEchartsInstance().dispatchAction({
        type: 'takeGlobalCursor',
        key: 'brush',
        brushOption: {
            brushType: 'lineX',
            brushMode: 'single'
        }
    });
       
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
      console.log(this.state.v1)
      console.log(this.state.v2)
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
      this.setState({x_points_vfs:x,
          serie_vfsd:[array_results_json_cutter[0]],
          serie_vfsi:[array_results_json_cutter[1]],
          serie_psa:[array_results_json_cutter[2]],
          serie_co2:[array_results_json_cutter[3]],
          signal_time: this.getSignalTime(array_results_json_cutter[0].data.length).toFixed(1),
          v1:'',
          v2:''
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
      for(var i = 0; i < 4; i++){
        var cutter = this.getCutterArray(array_series[i],point1,point2)
        var json_result = this.getJsonConfigArray(array_series[i],cutter)
        array_results_json_cutter.push(json_result)
      }
      var x = []
      for(var j = point1; j < point2+1; j++)
        x.push(this.state.x_points_vfs[j])
      this.setState({x_points_vfs:x,
          serie_vfsd:[array_results_json_cutter[0]],
          serie_vfsi:[array_results_json_cutter[1]],
          serie_psa:[array_results_json_cutter[2]],
          serie_co2:[array_results_json_cutter[3]],
          signal_time: this.getSignalTime(array_results_json_cutter[0].data.length).toFixed(1),
          brushArea:{}
        },
        ()=>{
          console.log(this.state.serie_vfsd)
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
      return (n/100/60)
    }

    isEmpty = json => {
      for(var key in json){
        if(json.hasOwnProperty(key))
          return false
      }
      return true
    }

    onMouseOut=(param)=>{
      console.log(param)
    }

    showHistoryDetail = () => {
      return(
        <DialogContentText id="alert-dialog-description">
          {this.state.history[this.state.indexSignalToDelete].dialog}
        </DialogContentText>
      )
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
          'mouseup':this.onMouseUp,
        
          'brushselected':this.onSelectPoints
          
        };
        return(
          <div style = {{flexGrow:1}}>
            <Grid container spacing={16}>
            
              <Grid item lg = {10} xl = {10} md = {9}>
                <Paper className = {classes.paper}>
                <Grid container style = {{marginBottom:'20px',textAlign:'center',flexGrow:1}}>
                  <Grid item lg = {4} xl = {4} md = {4} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Nombre archivo:<span style = {{fontStyle:'italic'}}>{this.state.name_signal}</span></p>
                  </Grid> 
                  <Grid item lg = {4} xl = {4} md = {4} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Duración señal: <span style = {{fontStyle:'italic'}}>{this.state.signal_time} min</span></p>
                  </Grid> 
                  <Grid item lg = {4} xl = {4} md = {4} >
                  <form style = {{display:'flex',flexWrap:'wrap',marginTop:'13px'}} autoComplete="off">
                    <FormControl  className={classes.formControl} style = {{marginBottom:0}}>
                      <Select
                          name = "filters"
                          className={classes.textField}
                          value={this.state.filter}
                          onChange={this.handleChangeFilter('filter')}
                          displayEmpty
                          autoWidth
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
                
                <ReactEcharts ref='echarts_react_1'
                  option={this.getOption_VFSD()}
                  style={{height: 300,marginBottom:'15px'}}
                  notMerge={true}
                  lazyUpdate={true}
                  showZoom={true}
                  onEvents={onEvents}
                  />
                  <ReactEcharts ref='echarts_react_2'
                  option={this.getOption_VFSI()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  notMerge={true}
                  onEvents={onEvents}
                  />
                  <ReactEcharts ref='echarts_react_3'
                  option={this.getOption_PSA()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  notMerge={true}
                  onEvents={onEvents}
                  />
                  <ReactEcharts ref='echarts_react_4'
                  option={this.getOption_CO2()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  onEvents={onEvents}
                  />
                  </Paper>
              </Grid>
              <Grid item lg = {2} xl = {2} md = {2}>
                <Signal key = {3} signalHistory = {this.state.signals_history} changeSelectedSignal = {this.changeSelectedSignal}/>
                <History key = {this.state.index_key+1} history = {this.state.history} chooseSignalToDelete = {this.chooseSignalToDelete} FullHistory = {this.FullHistory}/>
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
                  <ListItem button className={classes.itemAction}>
                    <ListItemIcon className = {classes.myIcon} onClick = {this.handleOpenDialogClean}><NoteAdd className = {classes.iconStyle}/></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction}>
                    <ListItemIcon className = {classes.myIcon}><Crop onClick = {this.handleOpenDialogCutTime}/></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction}>
                    <ListItemIcon className = {classes.myIcon}><CropFree onClick = {this.handleOpenDialogCut}/></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction}>
                    <ListItemIcon className = {classes.myIcon}><FavoriteOutlined /></ListItemIcon>
                  </ListItem>
                  <ListItem button className={classes.itemAction}>
                    <ListItemIcon className = {classes.myIcon}><Save onClick = {()=>{this.exportSignal()}}/></ListItemIcon>
                  </ListItem>
                </List>
              </Drawer>
              <Grid container style = {{marginTop:'10px',height:'40px'}}>
                <Grid item xl = {12} lg={12} md={12} style = {{backgroundColor:'#27293D',boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'}}>
                  <Typography style = {{marginTop:'8px',color:'#9a9a9a',fontStyle:'italic',marginLeft:'10px'}}>{this.state.helper_text}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={40} className ={classes.myGrid}>
                  {!this.state.isReadySignal ? this.renderMissingSignal() : this.renderSignal()}
              </Grid>
              
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
                          inputProps={{maxLength: 11}}
                          onChange={this.handleChangeInputTime('v1')} 
                        />
                        <Input 
                          required
                          placeholder="Termino (HH:MM:SS:CC)" 
                          className = {classes.input}
                          inputProps={{maxLength: 11}}
                          value = {this.state.v2}   
                          onChange={this.handleChangeInputTime('v2')} 
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
                
                <InputBase 
                  required
                  placeholder="Ingrese porcentaje(*)" 
                  className = {classes.input} 
                  type="number" 
                  onChange={this.handleChangeInput('v1')}
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
                <InputBase
                  placeholder="Ingrese orden (ej: 5)" 
                  className = {classes.input} 
                  type="number" 
                  onChange={this.handleChangeInput('v1')}
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
                <InputBase required placeholder="Ventana (ej: 10)" className = {classes.input} type="number" onChange={this.handleChangeInput('v1')} />
                <InputBase  required placeholder="Thresold (ej: 1.6)" className = {classes.input}  step=".01" onChange={this.handleChangeInput('v2')} />
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
                <InputBase required placeholder="Orden (ej: 4)" className = {classes.input} type="number" onChange={this.handleChangeInput('v1')} />
                <InputBase required placeholder="Corte (ej: 0.4)" className = {classes.input}  onChange={this.handleChangeInput('v2')} />
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
                    <InputBase required placeholder="Orden Hermite (ej: 1)" className = {classes.input} type="number" onChange={this.handleChangeInput('v1')} />
                  </Grid>
                </Grid>
                <Grid container style = {{marginBottom:'10px'}}>
                  <Grid item lg = {2} xl = {2} md = {3}>
                  <p style = {{color:'rgba(0,0,0,.7)'}}>Hampel</p>
                  </Grid>
                  <Grid item lg = {10} xl = {10} md = {3}>
                    <InputBase required placeholder="Ventana Hampel (ej: 10)" className = {classes.input} type="number" onChange={this.handleChangeInput('v2')} />
                    <InputBase required  placeholder="Thresold Hampel(ej: 1.6)" className = {classes.input} onChange={this.handleChangeInput('v3')} />
                  </Grid>
                </Grid>
                <Grid container style = {{marginBottom:'10px'}}>
                  <Grid item lg = {2} xl = {2} md = {3}>
                  <p style = {{color:'rgba(0,0,0,.7)'}}>Butterworth</p>
                  </Grid>
                  <Grid item lg = {10} xl = {10} md = {3}>
                    <InputBase required placeholder="Orden Butter (ej: 5)" className = {classes.input} type="number" onChange={this.handleChangeInput('v4')} />
                    <InputBase required placeholder="Corte Butter (ej: 0.4)" className = {classes.input}  onChange={this.handleChangeInput('v5')} />
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
                {this.state.history.length >= 1 ? this.showHistoryDetail(): <p>nada</p>}
                  
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleCloseDialogFullHistory} style = {{color: '#2196f3'}}>
                  Cerrar
                </Button>
              </DialogActions>
              </Dialog>
              {/* Fin Dialog para seleccionar señal */}
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