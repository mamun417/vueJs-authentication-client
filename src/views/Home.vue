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
                    <h3 class="text-center">Welcome to Task Manager System</h3>
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
