
const echart_options = 
    {
        textStyle:{
            color: 'rgba(154,154,154,.70)'
        },
        tooltip:{
            trigger: 'axis'
        },
        toolbox:{
            show: true,
            itemGap:20,
            feature: {
                dataZoom: {
                    title:{zoom:'zoom area',back:'restaurar zoom'},
                    yAxisIndex: 'none',
                },
                restore: {title:'Restaurar'},
                saveAsImage: {title:'imagen'},
                brush:{title:{lineX:'Seleccione área',clear:'Limpiar selección'}}
                
            },
            iconStyle:{
                borderColor:'rgba(154,154,154,.70)'
            },
            right:35      
        },
        grid: {
            show:false,
            top: 60,
            left: 60,
            right: 60,
            bottom:60,
            borderColor:'rgba(154,154,154,0.54)'
            
        },
        dataZoom: {
            show: true,
            start: 0,
            end: 10,
            type: 'slider',
            backgroundColor:'rgba(12,134,202,0.4)',
            borderColor: 'rgba(154,154,154,0.54)',
            dataBackground:{
              lineStyle:{
                color:'#fff'
              }
            }
        },
        xAxis:{
            type: 'category',
            boundaryGap: true,
            axisLabel:{
              color:'rgba(154,154,154,0.54)'
            },
            axisLine:{
              lineStyle:{
                color:'rgba(154,154,154,0.54)',
              }
            }  
        },
        yAxis:{
            type: 'value',
            scale: true,
            nameTextStyle:{
                color:'rgba(154,154,154,0.54)'
            },
            splitLine: {
                show: false
            },
            boundaryGap: [0.2, 0.2],
            axisLabel:{
                color:'rgba(154,154,154,0.54)'
            },
            axisLine:{
                lineStyle:{
                    color:'rgba(154,154,154,0.54)',
                }
            }
        },
        series:{
            symbol:'circle',
            symbolSize: '1',
        }



    }

export default echart_options;