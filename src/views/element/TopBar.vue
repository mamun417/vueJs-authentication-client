<template>
    <!-- Top Bar -->
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                <a href="javascript:void(0);" class="bars"></a>
                <router-link :to="{name: 'home'}" style="color: #fff!important;" class="navbar-brand">VueCli Authentication with laravel API</router-link>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="navbar-brand" style="cursor: pointer" @click="logout"><b>Logout</b></a>
                    </li>
                    <!--<li class="pull-right"><a href="javascript:void(0);" class="js-right-sidebar" data-close="true"><i class="material-icons">more_vert</i></a></li>-->
                </ul>
            </div>
        </div>
    </nav>
    <!-- #Top Bar -->
</template>

<script>
    export default {
        name: 'TopBar',
        
        methods: {
            logout(){
                this.$store.dispatch('auth/logout')
                
                toast.fire({
                    icon: 'success',
                    title: 'logout Successful'
                });
                
                this.$router.push({name: 'login'})
            }
        }
    }
</script>
