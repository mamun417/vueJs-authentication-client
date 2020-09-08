<template>
    <div>
        <top-bar/>
        <div class="customizer">
            <button class="btn test">
                <i class="material-icons">shopping_cart</i>
            </button>
        </div>

        <section>
            <left-sidebar/>
            <right-sidebar/>
        </section>

        <router-view/>
    </div>
</template>

<script>

    import TopBar from '../element/TopBar.vue'
    import LeftSidebar from '../element/LeftSidebar.vue'
    import RightSidebar from '../element/RightSidebar.vue'

    export default {
        name: 'MainLayout',
        components: {
            TopBar,
            LeftSidebar,
            RightSidebar
        },

        mounted() {
            $('body').removeClass().addClass('swal2-toast-shown swal2-shown theme-red');
        }
    }
</script>
