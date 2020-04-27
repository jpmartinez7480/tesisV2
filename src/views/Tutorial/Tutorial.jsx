import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      },
      infoDb:{
        color: '#757575',
        fontWeight: 300,
        padding: '30px'
      },
      question:{
          backgroundColor:'#27293D',
      },
      heading:{
        color: 'rgba(154,154,154,0.7)'
      }

})

class Tutorial extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        const { classes } = this.props
        return(
            <div className = {classes.root}>
                <Grid container spacing={16} className ={classes.myGrid}>
                    <Grid item lg = {11} xl = {11} md = {12}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.title}>
                                <Typography className = {classes.titlePaper}>Preguntas Frecuentes</Typography>
                            </div>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Lectura de archivos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Para leer los archivos de señales debe hacer click en el botón 'Nueva señal' o 'Señal Procesada'. El primero mostrará un cuadro de 
                                        dialogo que deberá llenar antes de cargar el archivo .exp de señal. El botón 'Señal Procesada' permite leer un archivo que haya sido filtrado o un archivo que haya
                                        sido sincronizado. Para ello se deben seleecionar los archivos .hdr y .fil o .sync de la señal a leer.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel  className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Formato</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        El formato de archivo .exp es de cuatro columnas con: primera columna tiempo de muestra, segunda columna velocidad flujo sanguíneo cerebral derecho,
                                        velocidad flujo sanguíneo cerebral izquierdo, presión sanguínea y EtCO2. Se diseñó un script en Python que permite modificar el archivo en el formato solicitado. Para ello visite el siguiente repositorio GitHub <a href="https://github.com/jpmartinez7480/scriptSignalPreprocesing">https://github.com/jpmartinez7480/scriptSignalPreprocesing</a>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Visualización de señales</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Luego de haber seleccionado el archivo a leer se muestran 4 gráficos que muestran la señal cargada. Cada gráfico indica que tipo
                                        de señal está siendo mostrada. 
                                        La barra de color azul debajo de cada gráfico muestra los valores de la señal en cualquier intervalo del eje x(tiempo). Esta permite aumentar o disminuir el zoom 
                                        de la señal. La barra azul lateral muestra los valores de la señal en cualquier itnervalo del eje y(valores).
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Cortado</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Para cortar la señal existen dos formas. En la imagen adjunta se ven dos íconos, el primero permite cortar la señal ingresando el tramo 
                                        deseado. Por ejemplo, si se cargo una señal con un muestro de 100Hz, y la señal fue tomada desde 10:00:00:00 hasta las 11:00:00:00. 
                                        Si quiero una señal de 2.5 minutos basta con ingresar 10:00:00:00 y 10:02:30:00. Si el tramo que se ingreso es incorrecto o no se encuentra
                                        entre los valores cargados entonces se mostrará un mensaje de error. 
                                        El segundo ícono permite cortar la señal seleccionando el tramo deseado. Para ello se debe seleccionar la herramienta mostrada en la imagen y luego 
                                        hacer click en el ícono mostrado. Este corte a pesar de que se está seleccionando solo en una señal se aplicará a todas las señales.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Filtros</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Hasta el momento se han agregado 5 tipos de filtrado, cada resultado se muestra de un color diferente. Los filtros son:
                                        Hermite's spline interpolation(verde), Hampel(fucsia), Butterworth(azul), Mediana(naranjo) y Cascada sugerida(amarillo).
                                        El filtro cascada sugerida fue propuesto por Marcial Hernandez en su trabajo de titulación. Este filtro aplica el filtro Hermite's spline
                                        interpolation, Hampel y Butterworth en ese orden y con los valores indicados(que pueden ser cambiados). 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Componente Señales e Historial</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        El componente Señal muestra todas las señales resultantes luego de aplicar los filtros. Para aplicar un filtro se debe seleccionar 
                                        desde este componente la señal a la que se le desea aplicar el filtro, la señal seleccionada se mostrará de color naranjo en este cuadro.
                                        El componente Historial muestra las acciones que se han aplicado hasta el momento. Como se ve en la imagen se muestran 3 íconos. El ícono
                                        de guardado permite guardar la señal de forma local, el ícono de info muestra el historial de filtros y cortes aplicados a la señal seleccionada
                                        desde el componente Señal y el ícono con forma de basurero permite eliminar dicha acción.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Exportar archivo</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        La señal que se esta trabajando puede ser exportada en cualquier momento. Para ello debe hacer click en el botón guardado que se encuentra en el componente de señales en la parte derecha de su pantalla.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Compartir archivo</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Una vez la señal haya pasado por el proceso de sincronización se puede descargar la señal y guardar una copia en el repositorio público de señales. Para ello debe registrarse como colaborador en la plataforma.
                                        Luego, debe seguir las instrucciones dadas por la plataforma.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Detectar latidos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        El proceso de detectar latidos se debe realizar una vez el usuario haya determinado que la señal se encuentra con el menor nivel de ruido posible. Luego, debe seleccionar en el componente Señales a mano derecha la señal a trabajar 
                                        para luego hacer click en el menú lateral izquierdo en el ícono de detección de latidos. Una vez el proceso termine se mostrará en todas las señales los puntos inicio de latido, upstroke y peak de latido.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Corregir puntos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Este proceso le permitirá corregir algún punto de latido que haya sido mal detectado. La plataforma le mostrará sombreado en color rojo el latido que presente algún punto mal detectado.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className = {classes.question}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Sincronizar señales</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.heading}>
                                        Este proceso le permitirá sincronizar el desface de señales (entre la velocidad del flujo sanguíneo de ambos hemisferios con la PSA) que se produce al tomar la muestra de estas. Recordar que el desface se produce porque 
                                        la PSA se mide a través de una arteria periférica.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}


Tutorial.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default (withStyles(styles)(Tutorial));