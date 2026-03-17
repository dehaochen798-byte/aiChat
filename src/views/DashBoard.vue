<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <el-col :span="6" v-if="aiDate?.systemOverview">
        <el-card>
          <div class="card-content">
            <div class="avatar users">
              <el-image
                :src="iconUrl1"
                style="width: 40px; height: 40px"
              ></el-image>
            </div>
            <div class="info">
              <p class="title">总用户数</p>
              <p class="value">
                {{ aiDate?.systemOverview?.totalUsers || 0 }}
              </p>
              <p class="subtitle-title">
                活跃用户：{{ aiDate?.systemOverview?.activeUsers }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-if="aiDate?.systemOverview">
        <el-card>
          <div class="card-content">
            <div class="avatar like">
              <el-image
                :src="iconUrl2"
                style="width: 40px; height: 40px"
              ></el-image>
            </div>
            <div class="info">
              <p class="title">情绪日志</p>
              <p class="value">
                {{ aiDate?.systemOverview?.totalDiaries || 0 }}
              </p>
              <p class="subtitle-title">
                今日新增：{{ aiDate?.systemOverview?.todayNewDiaries || 0 }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-if="aiDate?.systemOverview">
        <el-card>
          <div class="card-content">
            <div class="avatar comments">
              <el-image
                :src="iconUrl3"
                style="width: 40px; height: 40px"
              ></el-image>
            </div>
            <div class="info">
              <p class="title">咨询会话</p>
              <p class="value">
                {{ aiDate?.systemOverview?.totalSessions || 0 }}
              </p>
              <p class="subtitle-title">
                今日新增：{{ aiDate?.systemOverview?.todayNewSessions || 0 }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" v-if="aiDate?.systemOverview">
        <el-card>
          <div class="card-content">
            <div class="avatar smile">
              <el-image
                :src="iconUrl4"
                style="width: 40px; height: 40px"
              ></el-image>
            </div>
            <div class="info">
              <p class="title">平均情绪</p>
              <p class="value">
                {{ aiDate?.systemOverview?.avgMoodScore || 0 }}/10
              </p>
              <p class="subtitle-title">情绪健康指数</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card style="width: 100%">
          <template #header>
            <div class="card-header">情绪趋势分析</div>
          </template>
          <div class="chart-content">
            <div ref="emotionChartRef" style="height: 300px; width: 100%"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 100%">
          <template #header>
            <div class="card-header">咨询会话统计</div>
          </template>
          <div class="chart-content">
            <div class="consultation-stats">
              <div class="stat-item">
                <div class="stat-label">总会话数</div>
                <div class="stat-value">
                  {{ aiDate?.consultationStats?.totalSessions || 0 }}
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-label">平均时长</div>
                <div class="stat-value">
                  {{ aiDate?.consultationStats?.avgDurationMinutes || 0 }}
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-label">活跃用户</div>
                <div class="stat-value">
                  {{ aiDate?.systemOverview?.activeUsers || 0 }}
                </div>
              </div>
            </div>
            <div
              ref="consultationChartRef"
              style="height: 260px; width: 100%"
            ></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAnalyticsOverview } from "@/api/admin";
import type { AnalyticsOverviewResponse } from "@/type/DashBoard";
import * as echarts from "echarts";

//统计图片引入
const iconUrl1 = new URL("@/assets/images/users.png", import.meta.url).href;
const iconUrl2 = new URL("@/assets/images/like.png", import.meta.url).href;
const iconUrl3 = new URL("@/assets/images/comments.png", import.meta.url).href;
const iconUrl4 = new URL("@/assets/images/smile.png", import.meta.url).href;

const aiDate = ref<AnalyticsOverviewResponse | null>(null);

//初始化图表
const initChart = () => {
  initEmotionChart();
  initConsultationChart();
};

// 初始化情绪图表
let emotionChart: echarts.ECharts | null = null;
const emotionChartRef = ref<HTMLDivElement | null>(null);
const initEmotionChart = () => {
  if (!emotionChartRef.value) return;
  //销毁现有的图表
  if (emotionChart) {
    emotionChart.dispose();
    emotionChart = null;
  }

  //创建Echarts实例
  emotionChart = echarts.init(emotionChartRef.value);
  //获取情绪趋势数据
  const TrendData = aiDate.value?.emotionTrend || [];

  //配置情绪图表
  const option = {
    title: {
      text: "情感趋势分析",
      textStyle: {
        fontSize: 16,
        fontWeight: 700,
        color: "#2d3436",
      },
      left: "center",
      top: 10,
    },
    tooltip: {
      trigger: "axis",
      borderColor: "#fab1a0",
      borderWidth: 1,
      textStyle: {
        color: "#2d3436",
      },
    },
    legend: {
      data: ["平均情绪评分", "记录数量"],
      top: 40,
    },
    //控制图表区域的位置和大小
    grid: {
      top: 80,
      bottom: "3%",
      left: "3%",
      right: "4%",
    },
    xAxis: {
      type: "category",
      data: TrendData.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: "#2d3436",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "情绪评分",
        position: "left",
        axisLine: {
          lineStyle: {
            color: "#d6e372",
          },
        },
      },
      {
        type: "value",
        name: "记录数量",
        position: "right",
        axisLine: {
          lineStyle: {
            color: "#d6e372",
          },
        },
      },
    ],
    series: [
      {
        name: "平均情绪评分",
        type: "line",
        data: TrendData.map((item) => item.avgMoodScore),
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#cbdb4ac7",
        },
        itemStyle: {
          color: "#cbdb4ac7",
        },
      },
      {
        name: "记录数量",
        type: "line",
        data: TrendData.map((item) => item.recordCount),
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#eeb5a3",
        },
        itemStyle: {
          color: "#eeb5a3",
        },
      },
    ],
  };

  emotionChart.setOption(option);
};

// 初始化会话统计图表
let consultationChart: echarts.ECharts | null = null;
const consultationChartRef = ref<HTMLDivElement | null>(null);

const initConsultationChart = () => {
  if (!consultationChartRef.value) return;

  //销毁现有的图表
  if (consultationChart) {
    consultationChart.dispose();
    consultationChart = null;
  }

  //创建Echarts实例
  consultationChart = echarts.init(consultationChartRef.value);
  //获取会话统计数据
  const dailyTrend = aiDate.value?.consultationStats.dailyTrend || [];

  const option = {
    title: {
      text: "咨询活动统计",
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#2d3436",
      },
      left: "center",
      top: 10,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#fab1a0",
      borderWidth: 1,
      textStyle: {
        color: "#2d3436",
      },
    },
    legend: {
      data: ["会话数量", "参与用户数"],
      top: 40,
      textStyle: {
        color: "#636e72",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: 80,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: dailyTrend.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: "rgba(244, 162, 97, 0.3)",
        },
      },
      axisLabel: {
        color: "#636e72",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#636e72",
      },
      axisLine: {
        lineStyle: {
          color: "rgba(244, 162, 97, 0.3)",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(244, 162, 97, 0.1)",
        },
      },
    },
    series: [
      {
        name: "会话数量",
        type: "bar",
        data: dailyTrend.map((item) => item.sessionCount),
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#74b9ff" },
              { offset: 1, color: "#0984e3" },
            ],
          },
        },
        barWidth: "40%",
      },
      {
        name: "参与用户数",
        type: "bar",
        data: dailyTrend.map((item) => item.userCount),
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#fdcb6e" },
              { offset: 1, color: "#f39c12" },
            ],
          },
        },
        barWidth: "40%",
      },
    ],
  };
  //设置会话统计图表选项
  consultationChart.setOption(option);
};

onMounted(() => {
  getAnalyticsOverview().then((res) => {
    console.log(res, "数据分析");
    aiDate.value = res;
    initChart();
  });
});
</script>
<style scoped lang="scss">
.dashboard-container {
  .card-content {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 12px;
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.users {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      &.like {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }
      &.comments {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      &.smile {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      }
    }
    .info {
      .title {
        font-size: 14px;
        color: #7f8c8d;
        margin-bottom: 4px;
      }
      .value {
        font-size: 24px;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 4px;
      }
      .subtitle-title {
        font-size: 12px;
        color: #95a5a6;
      }
    }
  }
  .chart-content {
    padding: 20px;
    height: 300px;
    position: relative;

    canvas {
      width: 100% !important;
      height: 100% !important;
    }

    .consultation-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;

      .stat-item {
        text-align: center;

        .stat-label {
          font-size: 12px;
          color: #7f8c8d;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
        }
      }
    }
  }
}
</style>
