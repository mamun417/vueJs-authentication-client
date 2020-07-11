<template>
    <div class="login-page">
        <div class="login-box">
            <div class="logo">
                <a href="javascript:void(0);">Admin<b>BSB</b></a>
                <small>Admin BootStrap Based - Material Design</small>
            </div>
            <div class="card">
                <div class="body">
                    <div id="sign_in">
                        <div class="msg">Sign in to start your session</div>
                        <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                            <div class="form-line">
                                <input type="text" class="form-control" name="username" placeholder="Username" required autofocus>
                            </div>
                        </div>
                        <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                            <div class="form-line">
                                <input type="password" class="form-control" name="password" placeholder="Password" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 p-t-5">
                                <input type="checkbox" name="rememberme" id="rememberme" class="filled-in chk-col-pink">
                                <label for="rememberme">Remember Me</label>
                            </div>
                            <div class="col-xs-4">
                                <button class="btn btn-block bg-pink waves-effect" @click="login">SIGN IN</button>
                            </div>
                        </div>
                        <div class="row m-t-15 m-b--20">
                            <div class="col-xs-6">
                                <router-link :to="{name: 'register'}">Register Now!</router-link>
                            </div>
                            <div class="col-xs-6 align-right">
                                <router-link :to="{name: 'email'}">Forgot Password?</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    
    export default {
        name: 'Login',
        data(){
            return {
                formData   : {},
                formErrors : ''
            }
        },
        
        components: {},

        mounted() {
            $('body').removeClass().addClass('login-page');
        },
        
        methods: {
            login(){
                this.$store.dispatch('auth/login', {
                    inputs: {
                        email: 'test@gmail.com',
                        password: '11111111'
                    }
                })
                    .then(res => {
                        //console.log(res);
                    })
                    .catch(err => {

                    })
            }
        }
    }
</script>
