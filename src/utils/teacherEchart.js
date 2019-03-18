import echarts from 'echarts';

export default function teacherAssessment(data, element) {
  const myChart = echarts.init(element);
  const option = {
    color: ['rgb(50, 143, 230)', 'rgb(184, 99, 29)'],
    tooltip: {
      trigger: 'axis',
      position: ['0%', '10%'],
    },

    radar: [
      {
        indicator: [
          { text: '出勤', max: 5 },
          { text: '活跃', max: 5 },
          { text: '练习', max: 5 },
          { text: '讨论', max: 5 },
          { text: '资料', max: 5 },
        ],
        radius: 60,
        center: ['50%', '50%'],
      },
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item',
        },
        label: {
          normal: {
            show: false,
            position: 'inside',
            fontSize: 12,
            color: 'rgb(255, 0, 0)',
          },
        },
        itemStyle: { normal: { areaStyle: { type: 'default' } } },

        data: [{ value: data, name: '五维图' }],
      },
    ],
  };
  myChart.setOption(option, true);
}
