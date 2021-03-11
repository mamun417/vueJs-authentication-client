<template>
    <div>
        <div @click="removeOverLay" class="overlay" style="display: none;"></div>
        <!-- Top Bar -->
        <nav class="navbar">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                    <a @click="barClick" href="javascript:void(0);" class="bars"></a>
                    <router-link :to="{name: 'home'}" style="color: #fff!important;" class="navbar-brand">Task Management System</router-link>
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
    </div>
</template>

<script>
    export default {
        name: 'TopBar',

        methods: {
            barClick() {
                $('body').addClass('ls-closed overlay-open')
                $('.overlay').css('display', 'block')
            },

            removeOverLay() {
                $('.overlay').css('display', 'none')
            },

            logout(){
                this.$store.dispatch('auth/logout')

                toast.fire({
                    icon: 'success',
                    title: 'Logout Successful!'
                });

                this.$router.push({name: 'login'})
            }
        }
    }
</script>
