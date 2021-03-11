<template>
    <div>
        <vue-headful
            title="DASHBOARD | VUE-AUTH"
        />

        <section class="content">
            <div class="container-fluid">
                <!-- Widgets -->
                <div class="row clearfix">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="header">
                                <h2>TASK REPORT</h2>
                                <div class="header-dropdown pull-right m-r-5 m-t--5">
                                    <select @change="getTaskReport($event.target.value, true)" class="form-control">
                                        <option v-for="year in taskReport.years" :value="year">
                                            {{ year }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <loader v-if="loader"/>

                            <div class="body">
                                <canvas id="bar_chart" height="80"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'Home',
    data() {
        return {
            loader: false,
            taskReport: {
                years: [],
                months: [],
                createdTaskCount: []
            },
            chart: ''
        }
    },

    mounted() {
        this.getTaskReport()
    },

    methods: {
        getTaskReport(year, reloadChart = false) {
            this.loader = true

            this.$store.dispatch('task/getTaskReport', {
                year
            })
                .then(res => {
                    this.taskReport.months = []
                    this.taskReport.createdTaskCount = []

                    let report = res.data.report

                    this.taskReport.years = report.years

                    this.$_.each(report.info, (createdTask, month) => {
                        this.taskReport.months.push(month)
                        this.taskReport.createdTaskCount.push(createdTask)
                    })

                    this.loadChart(reloadChart)
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    this.loader = false
                })
        },

        loadChart(reloadChart = false) {

            if (!reloadChart) {

                let ctx = document.getElementById("bar_chart").getContext("2d");

                this.chart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: this.taskReport.months,
                        datasets: [
                            {
                                label: "Created task",
                                data: this.taskReport.createdTaskCount,
                                backgroundColor: "rgba(0, 188, 212, 0.8)",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        legend: false,
                    },
                });
            } else {
                this.reloadChart()
            }
        },

        reloadChart() {
            this.chart.data.labels = this.taskReport.months;
            this.chart.data.datasets.forEach((dataset) => {
                dataset.data = this.taskReport.createdTaskCount;
            });

            this.chart.update()
        }
    },
}
</script>
