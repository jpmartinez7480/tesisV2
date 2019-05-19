
const echart_options = 
    {
        textStyle:{
            color: '#9a9a9a'
        },
        tooltip:{
            trigger: 'axis'
        },
        toolbox:{
            show: true,
            feature: {
                dataView: {readOnly: false},
                magicType: {show: true, type: ['stack', 'tiled']},
                restore: {},
                saveAsImage: {},
            },
            iconStyle:{
                borderColor:'#9a9a9a'
            }      
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
            end: 1,
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
            symbolSize: '5',
        }



    }

export default echart_options;