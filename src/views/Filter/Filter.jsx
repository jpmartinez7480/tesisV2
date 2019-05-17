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
import Sidebar  from '../../components/Sidebar/Sidebar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Save from '@material-ui/icons/Save';
import Restore from '@material-ui/icons/Restore';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'



const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    checked:{
      '&$checked':{
        color:'#2196f3'
      }
    },
    paper: {
      padding: theme.spacing.unit * 2,
      color: theme.palette.text.secondary,
      textAlign:'center'
    },
    myGrid: {
      marginTop: '10px',
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
      backgroundColor: 'white',
      border: '1px solid #e0e4e7',
      marginBottom: '10px'
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
      backgroundColor: '#303E47',
      marginTop: '10px',
      marginBottom: '10px'
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
      flexDirection:'row'
    },
    myIcon:{
        fill: '#757575',
        fontSize: '80px'
    },
    selectTitle:{
        fontWeight: 300,
        lineHeight: 1.4,
        letterSpacing: '1.4px !important',
        color: '#808080'
    },
    selectSignal:{
        textAlign:'center'
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
      tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '5px',
      },
      tabsIndicator: {
        backgroundColor: '#1890ff',
      },
      tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$tabSelected': {
          color: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#40a9ff',
        },
      },
      tabSelected: {},
      typography: {
        padding: theme.spacing.unit * 3,
      },
      textField: {
        width: 230,
      },
      menu: {
        width: 230,
      },
      button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop:  theme.spacing.unit*2,

      },
      listFilter: {
        marginTop:  theme.spacing.unit*4,
        fontStyle: 'italic',
        fontSize: '14px'
      },
      chip: {
        marginLeft: '5px'
      },
      input: {
        margin: theme.spacing.unit,
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

class Filter extends Component{
    constructor(props){
        super(props)
        this.state={
            value: 0,
            v1: '',
            v2: '',
            indexSignal:0,
            colorSignal: '',
            signal: this.props.signal_global,
            serie_vfsd: [],
            serie_vfsi: [],
            serie_psa: [],
            serie_co2: [],
            data_filter_VFS: ['VFSD'],
            data_filter_VFSI: ['VFSI'],
            data_filter_PSA: ['PSA'],
            data_filter_CO2: ['CO2'],
            open_hermite: false,
            open_median: false,
            open_hampel: false,
            open_butterworth: false,
            open_auto: false,
            openWait: false,
            title_filter: '',
            text_filter:'',
            //vsfd_signal:this.props.vsfd_global,
            x_points_vfs:[],
            filter: '-',
            name: '',
            history:[],
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
            option_global:
            {
              tooltip: {
                trigger: 'axis'
              },
              toolbox: {
                show: true,
                feature: {
                  dataView: {readOnly: false},
                  magicType: {show: true, type: ['stack', 'tiled']},
                  restore: {},
                  saveAsImage: {}
                }
              },
              grid: {
                top: 60,
                left: 60,
                right: 60,
                bottom:60
              },
              dataZoom: {
                show: true,
                start: 0,
                end: 1,
                type: 'slider',
              },

            }
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleSendFilter = this.handleSendFilter.bind(this)
        
    }

    componentDidMount(){
      var em = []
        var l = this.props.vsfi_global
        for(var i = 0; i < l.length; i++){
          em.push(i)
        }
        this.setState({x_points_vfs:em})
        this.state.serie_vfsd.push({name:'VFSD',type:'line',data:this.props.vsfd_global})
        this.state.serie_vfsi.push({name:'VFSI',type:'line',data:this.props.vsfi_global})
        this.state.serie_psa.push({name: 'PSA', type: 'line', data: this.props.psa_global})
        this.state.serie_co2.push({name:'CO2',type:'line',data:this.props.co2_global})
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

    handleDelete = filter => () => {
      this.setState(state => {
        const history = [...state.history];
        const filterToDelete = history.indexOf(filter);
        history.splice(filterToDelete, 1);
        return { history };
      });
    }

    handleChangeInput = name => event => {
      this.setState({ [name]: event.target.value });
    };

    

    getOption = () => ({
        title: {
          text:'VFSD',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:this.state.data_filter_VFS
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            magicType: {show: true, type: ['stack', 'tiled']},
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          top: 60,
          left: 60,
          right: 60,
          bottom:60
        },
        dataZoom: {
          show: true,
          start: 0,
          end: 1,
          type: 'slider',
        },
        
        xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data:this.state.x_points_vfs
            },
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: 'cm/s',
              max: 100,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: this.state.serie_vfsd
    });

    getOption2 = () => ({
      title: {
        text:'VFSI',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:this.state.data_filter_VFSI
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {readOnly: false},
          magicType: {show: true, type: ['stack', 'tiled']},
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        top: 60,
        left: 60,
        right: 60,
        bottom:60
      },
      dataZoom: {
        show: true,
        start: 0,
        end: 1,
        type: 'slider',
      },
      
      xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data:this.state.x_points_vfs
          },
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: 'cm/s',
            max: 100,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: this.state.serie_vfsi
        
  });

  getOption3 = () => ({
    title: {
      text:'PSA',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:this.state.data_filter_PSA
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        magicType: {show: true, type: ['stack', 'tiled']},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {
      top: 60,
      left: 60,
      right: 60,
      bottom:60
    },
    dataZoom: {
      show: true,
      start: 0,
      end: 1,
      type: 'slider',
    },
    
    xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data:this.state.x_points_vfs
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'mmHg',
          max: 150,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: this.state.serie_psa
      
});

    showHistorialFilters(){
      const { classes } = this.props
      return this.state.history.map((f,index) => {
        return <Chip key = {index} style = {{color:f.color}} label = {f.name} className = {classes.chip} onDelete={this.handleDelete(f)}/>
      })
    }

    sendFilterHermite2(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.props.co2_global
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
        this.state.serie_vfsd.push({name:'Hermite',type:'line',data:res.data[0]})
        this.state.serie_vfsi.push({name:'Hermite',type:'line',data:res.data[1]})
        this.state.serie_psa.push({name:'Hermite',type:'line',data:res.data[2]})
        this.updateOptions()
        //agregar co2
      })
    }

    updateOptions(){
      this.refs.echarts_react_1.getEchartsInstance().setOption({
        title: {
          text:'VFSD',
        },
        legend: {
          data:this.state.data_filter_VFS
        },
        xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data:this.state.x_points_vfs
            },
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: 'cm/s',
              max: 100,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series:this.state.serie_vfsd
      })
      this.refs.echarts_react_2.getEchartsInstance().setOption({
        title: {
          text:'VFSI',
        },
        legend: {
          data:this.state.data_filter_VFSI
        },
        xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data:this.state.x_points_vfs
            },
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: 'cm/s',
              max: 100,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series:this.state.serie_vfsi
      })
      this.refs.echarts_react_3.getEchartsInstance().setOption({
        title: {
          text:'PSA',
        },
        legend: {
          data:this.state.data_filter_PSA
        },
        xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data:this.state.x_points_vfs
            },
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: 'mmHg',
              max: 150,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series:this.state.serie_psa
      })

    }

    getFilterHampel(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.props.co2_global
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
        this.state.serie_vfsd.push({name:'Hampel',type:'line',data:res.data[0]})
        this.state.serie_vfsi.push({name:'Hampel',type:'line',data:res.data[1]})
        this.state.serie_psa.push({name:'Hampel',type:'line',data:res.data[2]})
        this.updateOptions()
        //agregar co2
      })
    }

    getFilterButterworth(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.props.co2_global
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
        this.state.serie_vfsd.push({name:'Butterworth',type:'line',data:res.data[0]})
        this.state.serie_vfsi.push({name:'Butterworth',type:'line',data:res.data[1]})
        this.state.serie_psa.push({name:'Butterworth',type:'line',data:res.data[2]})
        this.updateOptions()
        //agregar co2
      })
    }

    getFilterMedian(){
      let vfsd = this.state.serie_vfsd[this.state.indexSignal].data
      let vfsi = this.state.serie_vfsi[this.state.indexSignal].data
      let psa = this.state.serie_psa[this.state.indexSignal].data
      let co2 = this.props.co2_global
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
        this.updateDataFilter('Mediana')
        this.state.serie_vfsd.push({name:'Mediana',type:'line',data:res.data[0]})
        this.state.serie_vfsi.push({name:'Mediana',type:'line',data:res.data[1]})
        this.state.serie_psa.push({name:'Mediana',type:'line',data:res.data[2]})
        this.updateOptions()
        //agregar co2
      })
    }

    updateDataFilter(filter){
      this.state.data_filter_VFS.push(filter)
      this.state.data_filter_VFSI.push(filter)
      this.state.data_filter_PSA.push(filter)
      this.state.data_filter_CO2.push(filter)
      this.handleCloseWait()
    }

    handleSendFilter(event){
      event.preventDefault()
      this.state.history.push({name:this.state.filter,color:'#000'})
      if(this.state.filter === 'hermite')
        this.setState({openWait: true, open_hermite: false}, () => this.sendFilterHermite2())
      else if(this.state.filter === 'hampel')
        this.setState({openWait: true, open_hampel: false}, () => this.getFilterHampel())
      else if(this.state.filter === 'butterworth'){
        this.setState({openWait: true, open_butterworth: false}, () => this.getFilterButterworth())
      }
      else if(this.state.filter === 'median'){
        this.setState({openWait: true, open_median: false}, () => this.getFilterMedian())
      }

    }

    onChartClick = (param, echarts) => {
      console.log(param.seriesIndex)
      this.setState({indexSignal:param.seriesIndex})
    };

    render(){
        const { classes } = this.props
        const { value } = this.state
        let onEvents = {
          'click': this.onChartClick,
        };
        return(
          <div className = {classes.root}>
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

            <Grid container spacing={16} className ={classes.myGrid}>
              <div style = {{width:'100%',display:'flex',marginBottom:'25px'}}>
                <Grid item lg={3} xl = {3} md = {3}>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Señal seleccionada"
                    value={this.state.data_filter_VFS[this.state.indexSignal]}
                    className={classes.formControl}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Timeline style={{color:'#000000'}}/>
                        </InputAdornment>
                      ),
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item lg={4} xl = {4} md = {4}>
                  <form>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="filters">Filtros</InputLabel>
                      <Select
                          name = "filters"
                          className={classes.textField}
                          value={this.state.filter}
                          onChange={this.handleChangeFilter('filter')}
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
                  
                <Grid item lg={4} xl = {4} md = {4}>
                    <div className={classes.listFilter}>
                      <span className={classes.textFilters}>Filtros usados: </span>
                      {this.state.history.length === 0 ? 
                        <span style = {{color:'#808080'}}>No ha usado ningún filtro</span> : this.showHistorialFilters() }
                    </div>
                </Grid>
                </div>
                <Grid item lg = {12} xl = {12} md = {12} className = {classes.gridDecoration}>
                  <ReactEcharts ref='echarts_react_1'        
                          option={this.getOption()}
                          style={{height: 300,marginTop: '10px'}}
                          lazyUpdate={true}
                          //showLoading={true}
                          showZoom={true}
                          onEvents={onEvents}
                    />
                     <ReactEcharts ref='echarts_react_2'        
                        option={this.getOption2()}
                        style={{height: 300,marginTop: '10px'}}
                        lazyUpdate={true}
                        //showLoading={true}
                        showZoom={true}
                        onEvents={onEvents}
                    />
                    <ReactEcharts ref='echarts_react_3'        
                    option={this.getOption3()}
                    style={{height: 300,marginTop: '10px'}}
                    lazyUpdate={true}
                    //showLoading={true}
                    showZoom={true}
                    onEvents={onEvents}
                    />
              </Grid>
              <Button className={classes.button}>Deshacer</Button>
              <Button variant = "contained" className={classes.button} style = {{color: '#fff',backgroundColor:'#2196f3'}} onClick={this.renderOptionMenu}>Guardar</Button>
            </Grid>
          </div>
        )
    }
}

Filter.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
  return({
    vsfi_global: state.vsfi_global,
    signal_global: state.signal_global,
    vsfd_global: state.vsfd_global,
    psa_global: state.psa_global,
    co2_global: state.co2_global
  })
}


export default connect(mapStateToProps,null)(withStyles(styles)(Filter));