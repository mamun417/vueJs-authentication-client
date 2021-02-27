<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: 'LoginLayout',
        components: {},

        updated() {
            this.addBodyClass()
        },

        mounted() {
            this.addBodyClass()
        },
    
        methods: {
            addBodyClass() {
                $('body').addClass('swal2-toast-shown swal2-shown');
            }
        }
    }
</script>
