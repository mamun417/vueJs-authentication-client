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
            console.log('fffffffff')
        },

        mounted() {
            $('body').addClass('swal2-toast-shown swal2-shown');
        }
    }
</script>
