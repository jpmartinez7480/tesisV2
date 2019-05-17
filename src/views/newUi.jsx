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
import History from '@material-ui/icons/History';
import Note from '@material-ui/icons/Note';
import Header from '../components/Header/Header';
import Axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import LinearProgress from '@material-ui/core/LinearProgress';
import Sidebar  from '../components/Sidebar/Sidebar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'

import { loadSignal }  from '../actions/actions.signal'
import { setSignalVSFD } from '../actions/actions.vsfd'
import { setSignalVSFI } from '../actions/actions.vsfi'
import { setSignalPSA } from '../actions/actions.psa'
import { setSignalCO2 } from '../actions/actions.co2'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    rootActions: {
        display: 'block',
        marginTop: '20px',
        marginLeft: theme.spacing.unit,
        float:'left'
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
      marginTop: '40px',
      marginLeft: theme.spacing.unit + 1,
      padding:'5px',
      //justifyContent:'center'
      float:'left'

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
      margin: theme.spacing.unit * 3,
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
      actions:{
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: '#303E47',
    
      },
      history_title:{
          borderBottom:'2px solid #303E47',
          textAlign:'center'

      }
  
  })

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
            x_points_vfs:[],
            times:[],
            open: false,
            isReadySignal: false,
            loadingGraph: false

        }
        this.onChange = this.onChange.bind(this)
        this.handleUploadSignal = this.handleUploadSignal.bind(this)
    }

    componentDidUpdate(){
        /*if(this.state.isReadySignal){
            let echart1 = this.refs.echarts_react_1.getEchartsInstance();
            let echart2 = this.refs.echarts_react_2.getEchartsInstance();
            let echart3 = this.refs.echarts_react_3.getEchartsInstance(); 
            echart1.group = 'group1';
            echart2.group = 'group1';
            echart3.group = 'group1';
            echarts.connect('group1');
        }*/
        
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
        formData.append('filename',filename)
        this.props.loadSignal(formData).then(() => this.fetchVFS(this.props.signal_global))
        
    };

    getOption = () => ({
        title: {
          text:'VFS',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['VSFD', 'VSFI']
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
          series: [
            {
              name:'VSFI',
              type:'line',
              data:this.state.vsfi_signal,
            },
            {
              name:'VSFD',
              type:'line',
              data:this.state.vsfd_signal,
            }
          ],
          
    });
    getOption2 = () => ({
          
          title: {
            text:'PSA',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['PSA']
          },
          toolbox: {
            show: false,
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
            series: [
              {
                name:'PSA',
                type:'line',
                data:this.state.psa_signal,
              },
            ],
            
    });
    getOption3 = () => ({
            title: {
              text:'CO2',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['CO2']
            },
            toolbox: {
              show: false,
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
                  name: 'mV',
                  max: 30,
                  min: 0,
                  boundaryGap: [0.2, 0.2]
                }
              ],
              series: [
                {
                  name:'CO2',
                  type:'line',
                  data:this.state.co2_signal,
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
            <div style = {{flexGrow:'1'}}>
            <Grid container spacing={8}>
            <Grid item lg = {9} xl = {9} md = {9} className = {classes.gridDecoration}>
              <ReactEcharts ref='echarts_react_1'
                option={this.getOption()}
                style={{height: 300}}
                lazyUpdate={true}
                //showLoading={true}
                showZoom={true}
                />
                 <ReactEcharts ref='echarts_react_2'
                option={this.getOption2()}
                style={{height: 300}}
                lazyUpdate={true}
                //showLoading={true}
                showZoom={true}
                />
                <ReactEcharts ref='echarts_react_3'
                option={this.getOption3()}
                style={{height: 300}}
                lazyUpdate={true}
                //showLoading={true}
                showZoom={true}
                />
            </Grid>
            <Grid item lg = {2} xl = {2} md = {2} className = {classes.gridDecoration} style={{marginLeft:'30px'}}>
                <div className = {classes.history_title}>
                    <div style={{marginBottom:'10px'}}><History style={{float:'left',color:'#303E47'}}/><span style ={{verticalAlign:'sub',marginBottom:'10px',color:'#303E47'}}>Historial</span></div>
                </div>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <Avatar>
                            <Timeline />
                        </Avatar>
                    <ListItemText
                        primary="Mediana"
                        secondary="Orden: 5"
                    />
                    </ListItem>
                    <Divider />
                </List>
            </Grid>
            </Grid>
            </div>
        )
    }

    render(){
        const { classes } = this.props
        return(
            <div className = {classes.root}>
                <div className = {classes.rootActions}>
                    <Grid container spacing={24}>
                        <Grid item xs = {2}>
                            <div className = {classes.actions}>Cargar</div>
                        </Grid>
                        <Grid item xs = {2}>
                            <div className = {classes.actions}>Cortar</div>
                        </Grid>
                        <Grid item xs = {2}>
                            <div className = {classes.actions}>Filtros</div>
                        </Grid>
                        <Grid item xs = {2}>
                            <div className = {classes.actions}>Latidos</div>
                        </Grid>
                        <Grid item xs = {2}>
                            <div className = {classes.actions}>Exportar</div>
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={16} className ={classes.myGrid} style = {{marginTop:'20px'}}>
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