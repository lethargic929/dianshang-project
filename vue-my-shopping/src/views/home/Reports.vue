<template>
  <div>
    <my-bread>
      数据统计
      <span slot="third">数据报表</span>
    </my-bread>
    <!-- 表格 -->
    <el-card class="box-card">
        <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
import echarts from 'echarts'
import lodash from 'lodash'

export default {
   components: {
    MyBread
  },
  data () {
    return {
        options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
 async mounted () {
// 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main'))
// 发送请求
const {data:res} = await this.$http.get('reports/type/1')
console.log(res)
 // . 准备数据和配置项
    const result = _.merge(res.data, this.options)

// 使用刚指定的配置项和数据显示图表。
        myChart.setOption(result)
 }
};
</script>

<style  lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin: 20px 20px;
}
.input-with-select {
  width: 300px;
}
</style>