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
                                    656
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
                                    545
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
                                    42432
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
                                     data-fresh-interval="20">54534</div>
                            </div>
                        </div>
                    </div>
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

    methods: {},

    handleProductRedirect(pipeline) {
        this.$router.push({name: 'product', params: {pipeline: pipeline}})
    }
}
</script>
