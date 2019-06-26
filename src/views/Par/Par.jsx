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

class Par extends Component{
    constructor(props){
        super(props)
        this.state = {
            name_signal:'',
            history:[],
            signals_history:[],
            x_points_vfs:[],
            isReadySignal: false,
            v1:'',
            v2:'',
            signal_time:0,
            indexSignal:0,
            indexSignalToDelete:0,
            serie_vfsd: [{name:'VFSD',type:'line',data:this.props.vsfd_global,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'}}],
            serie_vfsi: [{name:'VFSI',type:'line',data:this.props.vsfd_global,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#d22824'}}],
            serie_psa: [{name: 'PSA', type:'line',data:this.props.vsfd_global,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#029eb1'}}],
            serie_co2: [{name:'CO2',type:'line',data:this.props.vsfd_global,symbol:echart_options.series.symbol,symbolSize: echart_options.series.symbolSize,itemStyle:{color:'#288c6c'}}],
            start_point_cut:0,
            end_point_cut:0,
            openWait: false,
            open_dialog_clean: false,
            open_dialog_delete_signal:false,
            open_dialog_cut:false,
            open_dialog_cut_times: false,
            open_snackbar:false,
            openDialogFullHistory: false,
            message_snackbar:'',
            helper_text:'Pase el mouse sobre un ícono para ver detalle',
            brushArea:{},
            headerFile:{}

        }
        this.onChange = this.onChange.bind(this)
        this.splitSignalTimes = this.splitSignalTimes.bind(this)
    }

    componentDidUpdate(){
      
      var points = []
      var l = this.props.vsfd_global.length
      for(var i = 0; i < l ; i++)
        points.push(i)
      this.setState({x_points_vfs:points,isReadySignal:true}, ()=>{console.log(this.props.vsfd_global)})
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

    handleClickOpen = () => {
        this.setState({ loadingGraph:false,open_dialog_clean: false,open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    onChange(e){
      this.setState({filename:e.target.files[0]})
    }

    FullHistory=index=>{
      this.setState({indexSignalToDelete:index},()=>{this.handleOpenDialogFullHistory()})
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
      .then((response) => {
        console.log(response)
        const link = document.createElement('a')
        link.href = response.headers.location+'files/test.fil'
        link.setAttribute('download','test1.fil')
        document.body.appendChild(link)
        link.click()
      })
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

    handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };

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

    onSelectPoints = (param,echarts) =>{
      this.setState({brushArea:param})

    }

    searchSignal(signal,signals){
      var regex = RegExp(signal+'*');
      return (signals.filter(function(s){return regex.test(s.filter)}).length+1)
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

    showHistoryDetail = () => {
      let history = this.state.history[this.state.indexSignalToDelete].dialog
      history = history.split('\n')
      return history.map((c,i) => {
        return <li key = {i} style = {{color: 'rgba(0,0,0,0.54)'}}>{c}</li>
      })
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
            
              <Grid item lg = {11} xl = {11} md = {11}>
                <Paper className = {classes.paper}>
                <Grid container style = {{marginBottom:'20px',textAlign:'center',flexGrow:1}}>
                  <Grid item lg = {3} xl = {3} md = {3} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Nombre archivo:<span style = {{fontStyle:'italic'}}>archivo</span></p>
                  </Grid> 
                  <Grid item lg = {3} xl = {3} md = {3} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Duración señal: <span style = {{fontStyle:'italic'}}>x min</span></p>
                  </Grid>
                  <Grid item lg = {3} xl = {3} md = {3} style = {{marginTop:'18px'}}>
                    <p className={classes.describeSignal}>Tasa muestreo: <span style = {{fontStyle:'italic'}}>y Hz</span></p>
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
            </Grid>
          </div>
        )
    }

    renderMissingSignal(){
      const { classes } = this.props
      return(
          <div >
              <div className = {classes.selectSignal}>
              <Timeline className = {classes.myIcon2} />
              <h1 className = {classes.selectTitle}>No ha filtrado señal</h1>
              
            </div>
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

Par.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        vsfd_global: state.vsfd_global,
        vsfi_global: state.vsfi_global,
        psa_global: state.psa_global,
        co2_global: state.co2_global,
        signalHistory: state.signalHistory
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Par));