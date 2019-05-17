import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

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
    marginTop: '80px',
    marginLeft: theme.spacing.unit * 10 + 1,
    padding:'10px',
    width: '93%'
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
    backgroundColor: '#303E47'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection:'row'
  },


})


function getSteps(){
  return ['Cargar señal','Cortar','Filtrar','Upstroke','Generar']
}

function getStepContent(step){
  // eslint-disable-next-line default-case
  switch(step){
    case 0:
      return 'Cargar señal';
    case 1:
      return 'Cortar';
    case 2:
      return 'Filtrar';
    case 3:
      return 'Upstroke';
    case 4:
      return 'Generar';
  }
}

class App extends React.Component{

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
      value:'',
      loadingGraph: false,
      completed: 0
    }  

    this.onChange = this.onChange.bind(this)
    this.handleUploadSignal = this.handleUploadSignal.bind(this)
   
  }

  componentDidMount(){
    let echart1 = this.refs.echarts_react_1.getEchartsInstance();
    let echart2 = this.refs.echarts_react_2.getEchartsInstance();
    let echart3 = this.refs.echarts_react_3.getEchartsInstance(); 
    echart1.group = 'group1';
    echart2.group = 'group1';
    echart3.group = 'group1';
    echarts.connect('group1');
  }


  handleUploadSignal(event){
    event.preventDefault()
    const url = 'http://localhost/ocpu/user/juanpablo/library/readFile2/R/read_signal_file/json'
    const filename = this.state.filename
    const formData = new FormData(event.target)
    formData.append('filename',filename)
    console.log(formData)
    Axios({
      method:'POST',
      url:url,
      data: formData
    }).then(res => {this.setState({signal:res.data,loadingGraph:true}, () => {this.fetchVFS(res.data)})})
  };

  /*fetchVFSI(json){
    var time_range = []
    var times_aux = []
    for(var i = 1; i < json.length; i++){
        if(time_range.length === 0){
          time_range.push(json[i].V1)
          time_range.push(json[i].V2)
        }
        else if(i % 5000 === 0 || i === json.length - 1){
          time_range.push(json[i].V1)
          times_aux.push(time_range)
          time_range = []
        }
    }
    this.setState({times:times_aux,loadingGraph:false,value:'0'}, () => {this.changeSerie(0)})
  };*/

  fetchVFS(json){
    var vsfi = []
    var vsfd = []
    var psa = []
    var co2 = []
    var x_points = []
    for(var i = 1; i < json.length; i++){
          vsfd.push(json[i].V3)
          vsfi.push(json[i].V4)
          psa.push(json[i].V5)
          co2.push(json[i].V6)
          x_points.push(i)
    }
    //this.setState({times:times_aux,loadingGraph:false,value:'0'}, () => {this.changeSerie(0)})
    this.setState({vsfi_signal:vsfi})
    this.setState({vsfd_signal:vsfd})
    this.setState({psa_signal: psa})
    this.setState({co2_signal: co2})
    this.setState({x_points_vfs:x_points})
  }

  onChange(e){
    this.setState({filename:e.target.files[0]})
  }

  getOption = () => ({
    title: {
      text:'Señal',
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
        
      }
       
      );
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

  render(){
    const { classes } = this.props
    const steps = getSteps()
    
    return (
      <div className="App">
        <Sidebar/>
        <div className = {classes.root}>
          <Grid container spacing={16} className ={classes.myGrid}>
            <Grid item lg={12} xl={12} md={12} className = {classes.gridDecoration}>
              <Stepper activeStep={0}  className = {classes.myItemGrid}>
                {steps.map((label,index) => {
                  const props={}
                  return (<Step key ={label} {...props}>
                    <StepLabel>{label}</StepLabel>
                  </Step>)
                })}
              </Stepper>
            </Grid>
            <div className = {classes.nextStep}>
              <form onSubmit={this.handleUploadSignal}>
                <input type = "file" onChange={this.onChange} />
                <Button type = "submit" variant="contained" className = {classes.myPrimaryColor}>Cargar</Button>
              </form>
            </div>
            <Grid item lg = {12} xl = {12} md = {12} className = {classes.gridDecoration}>
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
          </Grid>
          <div className = {classes.nextStep}><Button variant="contained" className = {classes.myPrimaryColor}>Siguiente</Button></div>
        </div>
      </div>
    );
  }

  
}
    

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
