
import echarts from 'echarts'

export default function getChart1(item) {
    let goodNum = 0;// 大于等于八十分
    let smallGoodNum = 0;// 大于60 小80
    let badNum = 0;

    item && item.forEach(element => {
        if (element.ScoreFinal >= 80) {
            goodNum += 1;
        } else if (element.ScoreFinal >= 60 && element.ScoreFinal < 80) {
            smallGoodNum++;
        } else if (element.ScoreFinal < 60) {
            badNum++;
        }
    })

    const myChart = echarts.init( document.getElementById('echarId') );
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}人"
        },
        // tooltip: {
        //     trigger: 'item',
        //     axisPointer: {
        //         type: 'cross',
        //         crossStyle: {
        //             color: '#999'
        //         }
        //     }
        // },
        color: ['#02a1ec'],
        xAxis: {
            type: 'category',
            show: true,
            data: ['一般', '良好', '优秀'],
        },
        yAxis: {
            type: 'value',
            show: false,

        },
        series: [
            {
                data: [badNum, smallGoodNum, goodNum],
                type: 'bar'
            },
            {
                data: [badNum, smallGoodNum, goodNum],
                type: 'line',
                color: ['#f32f0c'],

            },
        ]
    };
    myChart.setOption(option, true);

}
