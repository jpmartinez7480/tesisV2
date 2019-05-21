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
import Header from '../../components/Header/Header';
import Axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import echart_options from '../../config/echart_configs';
import echart_colors from '../../config/echart_colors';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Crop from '@material-ui/icons/Crop';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Save from '@material-ui/icons/Save';
import Functions from '@material-ui/icons/Functions';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux'

import Signal from '../../components/Card/Signal'
import History from '../../components/Card/History'
import Checkbox from '@material-ui/core/Checkbox';
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
  
  })

const text_hampel = 'Debe ingresar valor de ventana y thresold para usar este filtro. Para rapidez los valores por defecto se muestran'
const text_butterworth = 'Debe ingresar el orden y la frecuencia de corte para usar este filtro. Recuerde que las señales utilizadas son de 100 Hz.'
const title_hampel = "Filtro Hampel"
const title_butterworth = "Filtro Butterworth"
const title_hermite = "Hermite's Spline Interpolation"
const text_hermite = "Debe ingresar el porcentaje de puntos altos y bajos a filtrar de la señal. Se recomienda un valor de 1%"
const title_median = "Filtro Mediana"
const text_median = "Debe ingresar el orden de mediana para este filtro, para una señal de 100 Hz se recomienda orden 5."


class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            filename: null,
            signal: [{"V1":"","V2":"","V3":"","V4":"","V5":"","V6":"","V7":"","V8":"","V9":"","V10":"","V11":"","V12":"",}],
            vsfi_signal:[{"V3":"1"}],
            vsfd_signal:[{"V2":"1"}],
            psa_signal: [{"V4":"1"}],
            co2_signal: [{"V6":"1"}],
            signals:['Inicial'],
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
            indexSignal:0,
            colorSignal: '',
            serie_vfsd: [],
            serie_vfsi: [],
            serie_psa: [],
            serie_co2: [],
            data_filter_VFS: [{name:'VFSD',textStyle:echart_options.textStyle}],
            data_filter_VFSI: [{name:'VFSI',textStyle:echart_options.textStyle}],
            data_filter_PSA: [{name:'PSA',textStyle:echart_options.textStyle}],
            data_filter_CO2: [{name:'CO2',textStyle:echart_options.textStyle}],
            open_hermite: false,
            open_median: false,
            open_hampel: false,
            open_butterworth: false,
            open_auto: false,
            openWait: false,
            title_filter: '',
            text_filter:'',
            helper_text:'Pase el mouse sobre un ícono para ver detalle',
            filters: [
              {
                value:'all',
                label: 'Automático'
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

        }
        this.onChange = this.onChange.bind(this)
        this.handleUploadSignal = this.handleUploadSignal.bind(this)
        this.handleSendFilter = this.handleSendFilter.bind(this)
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

    handleOpenWait = () => {
      this.setState({openWait: true})
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

    handleCloseWait = () => {
      this.setState({openWait: false})
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    
    handleChangeInput = name => event => {
      this.setState({ [name]: event.target.value });
    };

    handleClickOpen = () => {
        this.setState({ loadingGraph:false,open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    onChange(e){
      this.setState({filename:e.target.files[0]})
    }

    sendFilterHermite2(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[0].data
      let signal_to_filter = [vfsd,vfsi,psa,co2]

      var obj = {
        signal:JSON.stringify(signal_to_filter)
      }
      Axios({
        method: 'POST',
        url: 'http://localhost/ocpu/user/juanpablo/library/hermiteSplineFilter/R/getHermiteSplineInterpolation/json',
        data: obj
      })
      //.then(res => {this.setState({vsfd_filter: res.data}, () => this.updateDataFilter())})
      //.then(res => {this.setState({vsfd_filter: res.data[0],vsfi_filter:res.data[1],psa_filter:res.data[2]}, () => this.updateDataFilter())})
      .then(res => {
        this.updateDataFilter('Hermite')
        this.state.serie_vfsd.push({name:'Hermite',type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.hermite}})
        this.state.serie_vfsi.push({name:'Hermite',type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.hermite}})
        this.state.serie_psa.push({name:'Hermite',type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.hermite}})
        this.updateOptions()
        //agregar co2
      })
      .finally(this.state.history.push({name:this.state.filter,data:'res:'+this.state.signals[this.state.indexSignal]}))
    }

    getFilterHampel(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[0].data
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
        this.updateDataFilter('Hampel')
        this.state.serie_vfsd.push({name:'Hampel',type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.hampel}})
        this.state.serie_vfsi.push({name:'Hampel',type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.hampel}})
        this.state.serie_psa.push({name:'Hampel',type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.hampel}})
        this.updateOptions()
        //agregar co2
      })
      .finally(this.state.history.push({name:this.state.filter,data:'res:'+this.state.signals[this.state.indexSignal]}))
    }

    getFilterButterworth(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[0].data
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
        this.updateDataFilter('Butterworth')
        this.state.serie_vfsd.push({name:'Butterworth',type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.butterworth}})
        this.state.serie_vfsi.push({name:'Butterworth',type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.butterworth}})
        this.state.serie_psa.push({name:'Butterworth',type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.butterworth}})
        this.updateOptions()
        //agregar co2
      })
      .finally(this.state.history.push({name:this.state.filter,data:'res:'+this.state.signals[this.state.indexSignal]}))
    }

    getFilterMedian(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.state.serie_co2[0].data
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
        let filter = 'Mediana'
        let aux = this.searchSignal(filter,this.state.signals) 
        if(aux > 1)
          filter = filter + (aux-1).toString(10)
        
        this.updateDataFilter(filter)
        this.state.serie_vfsd.push({name:filter,type:'line',data:res.data[0],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:this.changeIntensityColor(echart_colors.median,aux)}})
        this.state.serie_vfsi.push({name:filter,type:'line',data:res.data[1],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.median}})
        this.state.serie_psa.push({name:filter,type:'line',data:res.data[2],symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:echart_colors.median}})
        this.updateOptions()
        //agregar co2
      })
      .finally(
        this.state.signals.push("Mediana"+this.searchSignal("Mediana",this.state.signals).toString(10)),
        this.state.history.push({name:this.state.filter,data:'res: '+this.state.signals[this.state.indexSignal]})
      )
    }

    updateDataFilter(filter){
      this.state.data_filter_VFS.push({name:filter,textStyle:echart_options.textStyle})
      this.state.data_filter_VFSI.push({name:filter,textStyle:echart_options.textStyle})
      this.state.data_filter_PSA.push({name:filter,textStyle:echart_options.textStyle})
      this.state.data_filter_CO2.push({name:filter,textStyle:echart_options.textStyle})
      this.handleCloseWait()
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
        /*this.setState({vsfi_signal:vsfi}, () => this.props.setSignalVSFI(this.state.vsfi_signal))
        this.setState({vsfd_signal:vsfd}, () => this.props.setSignalVSFD(this.state.vsfd_signal))
        this.setState({psa_signal: psa}, () => this.props.setSignalPSA(this.state.psa_signal))
        this.setState({co2_signal: co2}, () => this.props.setSignalCO2(this.state.co2_signal))*/
        this.setState({x_points_vfs:x_points})
        this.state.serie_vfsd.push({name:'VFSD',type:'line',data:vsfd,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'}})
        this.state.serie_vfsi.push({name:'VFSI',type:'line',data:vsfi,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'}})
        this.state.serie_psa.push({name: 'PSA', type:'line',data: psa,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#029eb1'}})
        this.state.serie_co2.push({name:'CO2',type:'line',data:co2,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#288c6c'}})
        this.setState({isReadySignal:true}, () => {this.handleClose()})
        
      }

    handleUploadSignal(event){
        event.preventDefault()
        this.setState({loadingGraph:true})
        const filename = this.state.filename
        const formData = new FormData(event.target)
        console.log(filename)
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
    };

    handleSendFilter(event){
      event.preventDefault()
      if(this.state.filter === 'hermite'){
        this.state.signals.push('Hermite')
        this.setState({openWait: true, open_hermite: false}, () => this.sendFilterHermite2())
      }
      else if(this.state.filter === 'hampel'){
        this.state.signals.push('Hampel')
        this.setState({openWait: true, open_hampel: false}, () => this.getFilterHampel())
      }
      else if(this.state.filter === 'butterworth'){
        this.state.signals.push('Butterworth')
        this.setState({openWait: true, open_butterworth: false}, () => this.getFilterButterworth())
      }
      else if(this.state.filter === 'median'){
        
        this.setState({openWait: true, open_median: false}, () => this.getFilterMedian())
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

    updateOptions(){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: {
          text:'VFSD',
          textStyle:echart_options.textStyle
        },
        tooltip: echart_options.tooltip.trigger,
        legend: {
          data:this.state.data_filter_VFS
        },
        series:this.state.serie_vfsd
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        legend: {
          data:this.state.data_filter_VFSI
        },
        series:this.state.serie_vfsi
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        legend: {
          data:this.state.data_filter_PSA
        },
        series:this.state.serie_psa
      })
    }

    onChartClick = (param, echarts) => {
      console.log(param.seriesIndex)
      this.setState({indexSignal:param.seriesIndex})
    };

    searchSignal(signal,signals){
      var regex = RegExp(signal+'*');
      return signals.filter(function(s){return regex.test(s)}).length
    }

    changeIntensityColor(color,num){
      if(num == 0)  return color
      else{
        num = num + 30
        let [r,g,b] = color.substr(4).split(")")[0].split(",");
        if((b + num) < 256 && g < 256)
          return 'rgb('+r.toString(10)+','+g.toString(10)+','+(b+num).toString(10)+')'
        else if((b+num) > 255 && (g+num)>255)
          return 'rgb('+(r-1).toString(10)+',111,0)'
        else return 'rgb('+r.toString(10)+','+g.toString(10)+','+(b+num).toString(10)+')'

      }
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
          'click': this.onChartClick,
        };
        return(
          <div style = {{flexGrow:1}}>
            <Grid container spacing={16}>
            
              <Grid item lg = {10} xl = {10} md = {9}>
                <Paper className = {classes.paper}>
                <Grid container style = {{marginBottom:'20px',textAlign:'center',flexGrow:1}}>
                  <Grid item lg = {4} xl = {4} md = {4} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Nombre archivo:<span style = {{fontStyle:'italic'}}>{this.state.filename.name}</span></p>
                  </Grid> 
                  <Grid item lg = {4} xl = {4} md = {4} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Duración señal: <span style = {{fontStyle:'italic'}}>22 min</span></p>
                  </Grid> 
                  <Grid item lg = {4} xl = {4} md = {4} >
                  <form style = {{display:'flex',flexWrap:'wrap'}} autoComplete="off">
                    <FormControl className={classes.formControl} style = {{marginBottom:0}}>
                    <InputLabel htmlFor="age-simple" style = {{color:'rgba(154,154,154,0.54)'}}>Filtros</InputLabel>
                      <Select
                          name = "filters"
                          className={classes.textField}
                          value={this.state.filter}
                          onChange={this.handleChangeFilter('filter')}
                          inputProps={{
                            name: 'filter',
                            id: 'age-simple',
                          }}
                          autoWidth
                      >
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
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  onEvents={onEvents}
                  />
                  <ReactEcharts ref='echarts_react_2'
                  option={this.getOption_VFSI()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  onEvents={onEvents}
                  />
                  <ReactEcharts ref='echarts_react_3'
                  option={this.getOption_PSA()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
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
                <Signal key = {this.state.index_key} signals = {this.state.signals}/>
                <History key = {this.state.index_key+1} history = {this.state.history} />
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
                    <ListItemIcon className = {classes.myIcon} onClick = {this.handleClickOpen}><NoteAdd className = {classes.iconStyle}/></ListItemIcon>
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
              <Grid container style = {{marginTop:'10px',height:'40px'}}>
                <Grid item xl = {12} lg={12} md={12} style = {{backgroundColor:'#27293D',boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'}}>
                  <Typography style = {{marginTop:'8px',color:'#9a9a9a',fontStyle:'italic',marginLeft:'10px'}}>{this.state.helper_text}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={40} className ={classes.myGrid}>
                  {!this.state.isReadySignal ? this.renderMissingSignal() : this.renderSignal()}
              </Grid>
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
              {/* Dialog para Hermite */}
              <Dialog
                open={this.state.open_hermite}
                onClose={this.handleCloseHermite}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{title_hermite}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_hermite}
                </DialogContentText>
                <Input 
                  placeholder="Ingrese porcentaje" 
                  className = {classes.input} 
                  type="number" 
                  onChange={this.handleChangeInput('v1')}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>} 
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseHermite} style = {{color: '#2196f3'}}>
                  No
                </Button>
                <Button onClick={this.handleSendFilter} style = {{color: '#2196f3'}} autoFocus>
                  Si
                </Button>
              </DialogActions>
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
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_median}
                </DialogContentText>
                <Input 
                  placeholder="Ingrese orden (ej: 5)" 
                  className = {classes.input} 
                  type="number" 
                  onChange={this.handleChangeInput('v1')}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseMedian} style = {{color: '#2196f3'}}>
                  No
                </Button>
                <Button onClick={this.handleSendFilter} style = {{color: '#2196f3'}} autoFocus>
                  Si
                </Button>
              </DialogActions>
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
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_hampel}
                </DialogContentText>
                <Input placeholder="Ventana (ej: 10)" className = {classes.input} type="number" onChange={this.handleChangeInput('v1')} />
                <Input placeholder="Thresold (ej: 1.6)" className = {classes.input} type="number" onChange={this.handleChangeInput('v2')} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseHampel} style = {{color: '#2196f3'}}>
                  No
                </Button>
                <Button onClick={this.handleSendFilter} style = {{color: '#2196f3'}} autoFocus>
                  Si
                </Button>
              </DialogActions>
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
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text_butterworth}
                </DialogContentText>
                <Input placeholder="Orden (ej: 4)" className = {classes.input} type="number" onChange={this.handleChangeInput('v1')} />
                <Input placeholder="Corte (ej: 0.4)" className = {classes.input} type="number" onChange={this.handleChangeInput('v2')} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseButterworth} style = {{color: '#2196f3'}}>
                  No
                </Button>
                <Button onClick={this.handleSendFilter} style = {{color: '#2196f3'}} autoFocus>
                  Si
                </Button>
              </DialogActions>
              </Dialog>
              {/* Fin Dialog para Butterworth*/}

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