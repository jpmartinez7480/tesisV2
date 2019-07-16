import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import GetApp from '@material-ui/icons/GetApp';
import Info from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import Axios from 'axios';
const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      myGrid: {
        marginTop: '30px',
        marginLeft: theme.spacing.unit * 10 + 1,
        padding:'5px',
        width: '93%',
        justifyContent:'center'
      },
      paper: {
        padding: theme.spacing.unit * 2,
        
        backgroundColor: '#27293D',
        marginRight:'15px',
        boxShadow:'0 1px 20px 0 rgba(0,0,0,.1)'
      },
      myTable:{},
      tablecellTitle:{
        color: '#9a9a9a',
        fontSize: '16px',
        borderBottom:'1px solid rgba(255,255,255,.1)',
        marginBottom: '10px',
        fontWeight:300
      },
      tablecell:{
        color: '#9a9a9a',
        borderBottom:'1px solid rgba(255,255,255,.05)',
        fontWeight: 300
      },
      title:{
          textAlign:'left',
          padding: '10px',
          marginBottom:'10px'
      },
      titlePaper:{
          color: '#9a9a9a',
          fontSize: '20px',
          fontWeight: 300,
          
      },
      myIcon:{
          fontSize: '18px',
          marginLeft:'12px',
          textAlign:'center',
          "&:hover":{
            color: blue[600]
          },
          cursor:'pointer'
      },
      tablePagination:{
        marginTop:'20px',
        color: 'rgba(154,154,154,0.7)'
      }

})

const signals = [
    {
        signal:'ABCDEF',
        type:'Baseline',
        duration:'5 min',
        date_upload:'09/07/2019'
    },
    {
        signal:'BCDEFG',
        type:'Sit-to-Stand',
        duration:'2.5 min',
        date_upload:'09/07/2019'
    },
    {
        signal:'CDEFGH',
        type:'Baseline',
        duration:'10 min',
        date_upload:'09/07/2019'
    },
    {
        signal:'DEFGHI',
        type:'Sit-to-Stand',
        duration:'2.5 min',
        date_upload:'09/07/2019'
    },
    {
        signal:'EFGHIJ0',
        type:'Baseline',
        duration:'2.5 min',
        date_upload:'09/07/2019'
    },
    {
        signal:'EFGHIJ1',
        type:'Baseline',
        duration:'2.5 min',
        date_upload:'09/07/2019'
    },
    {
        signal:'EFGHIJ2',
        type:'Baseline',
        duration:'2.5 min',
        date_upload:'09/07/2019'
    }
]



class Repository extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            signals_repository:[{name_signal:'',type_signal:'',duration:'',date_upload:''}],
            page: 0,
            rowsPerPage: 5
        }


    }

    componentDidMount(){
        Axios({
            method: 'GET',
            url: 'http://localhost:8100/web/get_signals.php',
          })
          .then(res => {
            if(res.data.data.length > 0)
              this.setState({signals_repository:res.data.data})
          })          
    }

    handleDownloadFile = (name) => {
        
        Axios({
            method:'GET',
            url: 'http://localhost:8100/web/download.php?file='+name+'.zip',
            responseType: 'arraybuffer'
        })
        .then((response) => {
            console.log(response)
            
            const link = document.createElement('a')
            link.href = response.request.responseURL  
            
            link.setAttribute('download',name+'.zip')
            document.body.appendChild(link)
            link.click()
        })
    }


    handleDownloadFile2 = (name) => {
        
        Axios({
            headers:{
            
            },
            method:'GET',
            url: 'http://localhost:8100/repository/'+name+'.zip',
            responseType: 'arraybuffer'
        })
        .then((response) => {
            console.log(response)
            
            const link = document.createElement('a')
            link.href = response.request.responseURL  
            
            link.setAttribute('download',name+'.zip')
            document.body.appendChild(link)
            link.click()
        })
    }

    handleChangePage = (event,newPage) =>{
        this.setState({page: newPage}, ()=>{console.log(this.state.page)})
    }

    handleChangeRowsPerPage = (event) =>{
        this.setState({rowsPerPage:parseInt(event.target.value,10),page:0})
    }

    render(){
        const { classes } = this.props
        return(
            <div className = {classes.root}>
                <Grid container spacing={16} className ={classes.myGrid}>
                    <Grid item lg = {11} xl = {11} md = {12}>
                        <Paper className = {classes.paper}>
                        <div className = {classes.title}>
                            <Typography className = {classes.titlePaper}>Repositorio Señales Biomédicas</Typography>
                        </div>
                            <Table className = {classes.myTable}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className = {classes.tablecellTitle}>Señal</TableCell>
                                        <TableCell className = {classes.tablecellTitle}>Tipo</TableCell>
                                        <TableCell className = {classes.tablecellTitle}>Duración</TableCell>
                                        <TableCell className = {classes.tablecellTitle}>Muestreo</TableCell>
                                        <TableCell className = {classes.tablecellTitle}>Subido</TableCell>
                                        <TableCell className = {classes.tablecellTitle}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.signals_repository.slice(this.state.page*this.state.rowsPerPage,this.state.page*this.state.rowsPerPage+this.state.rowsPerPage).map(row => (
                                        <TableRow key={row.name_signal}>
                                            <TableCell component = "th" scope = "row" className = {classes.tablecell}>
                                                {row.name_signal}
                                            </TableCell>
                                            <TableCell className = {classes.tablecell}>{row.type_signal}</TableCell>
                                            <TableCell className = {classes.tablecell}>{row.duration}</TableCell>
                                            <TableCell className = {classes.tablecell}>{row.frecuency}</TableCell>
                                            <TableCell className = {classes.tablecell}>{row.date_upload.split(' ')[0]}</TableCell>
                                            <TableCell className = {classes.tablecell}><GetApp className = {classes.myIcon} onClick = {()=>{this.handleDownloadFile(row.name_signal)}}/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow style = {{marginTop:'30px'}}>
                                        <TablePagination
                                            className = {classes.tablePagination}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            labelRowsPerPage='Señales por paǵina:'
                                            colSpan={8}
                                            count={this.state.signals_repository.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            SelectProps={{
                                            inputProps: { 'aria-label': 'Señales por paǵina' },
                                            //native: true,
                                            }}
                                            onChangePage={this.handleChangePage}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            //onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            //nextIconButtonProps={this.handleNextPageButtonClick}
                                            
                                            //ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}



Repository.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default (withStyles(styles)(Repository));