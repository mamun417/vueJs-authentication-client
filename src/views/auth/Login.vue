<template>
    <div class="login-page" style="position: relative">
        <div class="login-box">
            <div class="logo">
                <a href="javascript:void(0);">Admin<b>BSB</b></a>
                <small>Admin BootStrap Based - Material Design</small>
            </div>
            <div class="card">
                <div class="body">
                    <div id="sign_in">

                        <loader v-if="loader"/>

                        <div class="msg">Sign in to start your session</div>

                        <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                            <div class="form-line">
                                <input type="text" class="form-control"
                                       v-model="formData.email"
                                       placeholder="Email Address" autofocus
                                       @input="formErrors.email = ''"
                                >
                            </div>
                            <label v-if="formErrors.email" id="username-error" class="error">{{ formErrors.email
                                }}</label>
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">lock</i>
                            </span>
                            <div class="form-line">
                                <input type="password"
                                       class="form-control"
                                       v-model="formData.password"
                                       placeholder="Password"
                                       @input="formErrors.password = ''">
                            </div>
                            <label v-if="formErrors.password" id="password-error" class="error">{{ formErrors.password
                                }}</label>
                        </div>

                        <div class="row">
                            <div class="text-center">
                                <button class="btn btn-block bg-pink waves-effect" @click="login">SIGN IN</button>
                            </div>
                        </div>
                        <div class="row m-t-15 m-b--10">
                            <div class="text-center">
                                <router-link :to="{name: 'password.email'}">Forgot Password?</router-link>
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
    data() {
        return {
            formData: {
                email: 'admin@test.com',
                password: 'password'
            },
            formErrors: {},
            loader: false
        }
    },

    mounted() {
        $('body').removeClass().addClass('login-page');
    },

    methods: {
        login() {
            this.loader = true

            this.$store.dispatch('auth/login', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false

                    toast.fire({
                        icon: 'success',
                        title: 'Login Successful!'
                    });

                    this.$router.push({name: 'home'})
                })
                .catch(err => {
                    let self = this;

                    self.loader = false

                    if (err.response.data.errors) {
                        self.formErrors = err.response.data.errors
                    } else {
                        toast.fire({
                            icon: 'error',
                            title: err.response.data.message
                        })
                    }
                })
        }
    }
}
</script>
