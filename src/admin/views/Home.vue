<template>
    <div>
        <vue-headful
            title="DASHBOARD | VUE-AUTH"
        />

        <section class="content">
            <div class="container-fluid">
                <div class="block-header">
                    <h2>DASHBOARD</h2>
                </div>
                <!-- Widgets -->
                <div class="row clearfix">
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div @click="handleProductRedirect({filter:''})"
                             class="info-box bg-green hover-expand-effect cursor_pointer">
                            <div class="icon">
                                <i class="material-icons">playlist_add_check</i>
                            </div>
                            <div class="content">
                                <div class="text">TOTAL PRODUCTS</div>
                                <div class="number count-to">
                                    <number
                                        :from="0"
                                        :to="productsCountInfo.total"
                                        :duration=".5"
                                        :delay="1"
                                        easing="Power1.easeOut"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div @click="handleProductRedirect({filter:'active'})"
                             class="info-box bg-cyan hover-expand-effect cursor_pointer">
                            <div class="icon">
                                <i class="material-icons">help</i>
                            </div>
                            <div class="content">
                                <div class="text">ACTIVE PRODUCTS</div>
                                <div class="number count-to">
                                    <number
                                        :from="0"
                                        :to="productsCountInfo.active"
                                        :duration=".5"
                                        :delay="1"
                                        easing="Power1.easeOut"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div @click="handleProductRedirect({filter:'inactive'})"
                             class="info-box bg-orange hover-expand-effect cursor_pointer">
                            <div class="icon">
                                <i class="material-icons">person_add</i>
                            </div>
                            <div class="content">
                                <div class="text">INACTIVE PRODUCTS</div>
                                <div class="number count-to">
                                    <number
                                        :from="0"
                                        :to="productsCountInfo.total"
                                        :duration=".5"
                                        :delay="1"
                                        easing="Power1.easeOut"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="info-box bg-pink hover-expand-effect cursor_pointer">
                            <div class="icon">
                                <i class="material-icons">playlist_add_check</i>
                            </div>
                            <div class="content">
                                <div class="text">NEW TASKS</div>
                                <div class="number count-to" data-from="0" data-to="125" data-speed="15"
                                     data-fresh-interval="20"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #END# Widgets -->
                <div class="row clearfix">
                    <!-- Visitors -->
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <div class="card">
                            <div class="body bg-pink">
                                <div class="sparkline" data-type="line" data-spot-Radius="4"
                                     data-highlight-Spot-Color="rgb(233, 30, 99)" data-highlight-Line-Color="#fff"
                                     data-min-Spot-Color="rgb(255,255,255)" data-max-Spot-Color="rgb(255,255,255)"
                                     data-spot-Color="rgb(255,255,255)"
                                     data-offset="90" data-width="100%" data-height="92px" data-line-Width="2"
                                     data-line-Color="rgba(255,255,255,0.7)"
                                     data-fill-Color="rgba(0, 188, 212, 0)">
                                    12,10,9,6,5,6,10,5,7,5,12,13,7,12,11
                                </div>
                                <ul class="dashboard-stat-list">
                                    <li>
                                        TODAY
                                        <span class="pull-right"><b>1 200</b> <small>USERS</small></span>
                                    </li>
                                    <li>
                                        YESTERDAY
                                        <span class="pull-right"><b>3 872</b> <small>USERS</small></span>
                                    </li>
                                    <li>
                                        LAST WEEK
                                        <span class="pull-right"><b>26 582</b> <small>USERS</small></span>
                                    </li>
                                    <li>
                                        LAST WEEK
                                        <span class="pull-right"><b>26 582</b> <small>USERS</small></span>
                                    </li>
                                    <li>
                                        LAST WEEK
                                        <span class="pull-right"><b>26 582</b> <small>USERS</small></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- #END# Visitors -->
                    <!-- Latest Social Trends -->
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <div class="card">
                            <div class="body bg-cyan">
                                <div class="m-b--35 font-bold">LATEST SOCIAL TRENDS</div>
                                <ul class="dashboard-stat-list">
                                    <li>
                                        #socialtrends
                                        <span class="pull-right">
                                        <i class="material-icons">trending_up</i>
                                    </span>
                                    </li>
                                    <li>
                                        #materialdesign
                                        <span class="pull-right">
                                        <i class="material-icons">trending_up</i>
                                    </span>
                                    </li>
                                    <li>#adminbsb</li>
                                    <li>#freeadmintemplate</li>
                                    <li>#bootstraptemplate</li>
                                    <li>
                                        #freehtmltemplate
                                        <span class="pull-right">
                                        <i class="material-icons">trending_up</i>
                                    </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- #END# Latest Social Trends -->
                    <!-- Answered Tickets -->
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <div class="card">
                            <div class="body bg-teal">
                                <div class="font-bold m-b--35">ANSWERED TICKETS</div>
                                <ul class="dashboard-stat-list">
                                    <li>
                                        TODAY
                                        <span class="pull-right"><b>12</b> <small>TICKETS</small></span>
                                    </li>
                                    <li>
                                        YESTERDAY
                                        <span class="pull-right"><b>15</b> <small>TICKETS</small></span>
                                    </li>
                                    <li>
                                        LAST WEEK
                                        <span class="pull-right"><b>90</b> <small>TICKETS</small></span>
                                    </li>
                                    <li>
                                        LAST MONTH
                                        <span class="pull-right"><b>342</b> <small>TICKETS</small></span>
                                    </li>
                                    <li>
                                        LAST YEAR
                                        <span class="pull-right"><b>4 225</b> <small>TICKETS</small></span>
                                    </li>
                                    <li>
                                        ALL
                                        <span class="pull-right"><b>8 752</b> <small>TICKETS</small></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- #END# Answered Tickets -->
                </div>
                <div class="row clearfix">
                    <!-- Task Info -->
                    <div class="col-xs-12 col-sm-12">
                        <div class="card">
                            <div class="header">
                                <h2>TASK INFOS</h2>
                                <ul class="header-dropdown m-r--5">
                                    <li class="dropdown">
                                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"
                                           role="button" aria-haspopup="true" aria-expanded="false">
                                            <i class="material-icons">more_vert</i>
                                        </a>
                                        <ul class="dropdown-menu pull-right">
                                            <li><a href="javascript:void(0);">Action</a></li>
                                            <li><a href="javascript:void(0);">Another action</a></li>
                                            <li><a href="javascript:void(0);">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="body">
                                <div class="table-responsive">
                                    <table class="table table-hover dashboard-task-infos">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Task</th>
                                            <th>Status</th>
                                            <th>Manager</th>
                                            <th>Progress</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Task A</td>
                                            <td><span class="label bg-green">Doing</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-green" role="progressbar"
                                                         aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"
                                                         style="width: 62%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Task B</td>
                                            <td><span class="label bg-blue">To Do</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-blue" role="progressbar"
                                                         aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
                                                         style="width: 40%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Task C</td>
                                            <td><span class="label bg-light-blue">On Hold</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-light-blue" role="progressbar"
                                                         aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"
                                                         style="width: 72%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Task D</td>
                                            <td><span class="label bg-orange">Wait Approvel</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-orange" role="progressbar"
                                                         aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"
                                                         style="width: 95%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Task E</td>
                                            <td>
                                                <span class="label bg-red">Suspended</span>
                                            </td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-red" role="progressbar"
                                                         aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"
                                                         style="width: 87%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- #END# Task Info -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            productsCountInfo: {}
        }
    },

    mounted() {
        this.getProductsInfo()
    },

    methods: {
        getProductsInfo() {
            this.$store.dispatch('product/getProductsCountInfo')
                .then(res => {
                    this.productsCountInfo = res.data.count_info
                })
                .catch(err => {
                    //
                })
        },

        handleProductRedirect(pipeline) {
            this.$router.push({name: 'product', params: {pipeline: pipeline}})
        }
    }
}
</script>
