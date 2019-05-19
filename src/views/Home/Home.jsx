import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

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
    myIcon:{
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
        letterSpacing:'15%',
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
      primary:{}
  
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
            history:[{name:'',data:[]}],
            times_checked:true,
            x_points_vfs:[],
            times:[],
            index_key: 1,
            checked:[1],
            open: false,
            isReadySignal: false,
            loadingGraph: false,
            filter: '-',
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

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
        this.setState({x_points_vfs:x_points})
        this.setState({isReadySignal:true})
        
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

    add = () =>{
      const aux = this.state.signals
      aux.push('Mediana')
      this.setState({signals:aux})
      console.log(this.state.signals)
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
          series: [
            {
              name:'VFSD',
              type:'line',
              data:this.state.vsfd_signal,
              symbol:echart_options.series.symbol,
              symbolSize: echart_options.series.symbolSize,
              itemStyle:{
                color:'#d22824'
              },
            }
          ],
          
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
        series: [
          {
            name:'VFSI',
            type:'line',
            data:this.state.vsfi_signal,
            symbol: echart_options.series.symbol,
            symbolSize: echart_options.series.symbolSize,
            itemStyle:{
              color:'#d22824' // color at 0% position
            }
          } 
        ],
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
      series: [
        {
          name:'PSA',
          type:'line',
          symbol: echart_options.series.symbol,
          symbolSize: echart_options.series.symbolSize,
          data:this.state.psa_signal,
          itemStyle:{
            color:'#029eb1'
          },
        },
      ],      
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
      series: [
        {
          name:'CO2',
          type:'line',
          symbol: echart_options.series.symbol,
          symbolSize: echart_options.series.symbolSize,
          data:this.state.co2_signal,
          itemStyle:{
            color:'#288c6c'
          },
        },
      ],        
    })

    renderMissingSignal(){
        const { classes } = this.props
        return(
            <div >
                <div className = {classes.selectSignal}>
                <Timeline className = {classes.myIcon} />
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
        return(
          <div style = {{flexGrow:1}}>
            <Grid container spacing={16}>
            
              <Grid item lg = {10} xl = {10} md = {9}>
                <Paper className = {classes.paper}>

                
                <Grid container style = {{marginBottom:'20px',textAlign:'center',flexGrow:1}}>
                  <Grid item lg = {4} xl = {4} md = {4}>
                    <p className={classes.describeSignal}>Nombre archivo:<span style = {{fontStyle:'italic'}}>{this.state.filename.name}</span></p>
                  </Grid> 
                  <Grid item lg = {4} xl = {4} md = {4}>
                    <p className={classes.describeSignal}>Duración señal: <span style = {{fontStyle:'italic'}}>22 min</span></p>
                  </Grid> 
                  <Grid item lg = {4} xl = {4} md = {4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          
                          checked={this.state.times_checked}
                          onChange={this.handleChange('times_checked')}
                          value="times_checked"
                          classes={{
                            root: classes.rootChecked,
                            checked: classes.checked,
                          }}
                      />
                      }
                      label={<Typography style={{ color: '#9a9a9a' }}>Mostrar tiempos</Typography>}
                    />
                  </Grid>
                </Grid>
                
                <ReactEcharts ref='echarts_react_1'
                  option={this.getOption_VFSD()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  />
                  <ReactEcharts ref='echarts_react_2'
                  option={this.getOption_VFSI()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  />
                  <ReactEcharts ref='echarts_react_3'
                  option={this.getOption_PSA()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  />
                  <ReactEcharts ref='echarts_react_4'
                  option={this.getOption_CO2()}
                  style={{height: 300,marginBottom:'15px'}}
                  lazyUpdate={true}
                  //showLoading={true}
                  showZoom={true}
                  />
                  </Paper>
              </Grid>
              <Grid item lg = {2} xl = {2} md = {2}>
                <Signal key = {this.state.index_key} signals = {this.state.signals}/>
                <History key = {this.state.index_key} history = {this.state.history} />
              </Grid>
            </Grid>
          </div>
        )
    }

    render(){
        const { classes } = this.props
        return(
            <div className = {classes.root}>
                <Grid container style = {{marginTop:'10px',height:'40px'}}>
                  <Grid item xl = {12} lg={12} md={12} style = {{backgroundColor:'#27293D',boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'}}>
                    <Typography style = {{marginTop:'8px',color:'#9a9a9a',fontStyle:'italic',marginLeft:'10px'}}>{this.state.helper_text}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={40} className ={classes.myGrid}>
                    {!this.state.isReadySignal ? this.renderMissingSignal() : this.renderSignal()}
                </Grid>
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