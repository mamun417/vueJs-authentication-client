<template>
    <div class="fp-box">
        <div class="logo">
            <a href="javascript:void(0);">Admin<b>BSB</b></a>
            <small>Admin BootStrap Based - Material Design</small>
        </div>
        <div class="card">
            <div class="body">
                <div id="forgot_password">
                    <div class="msg">Reset your password.</div>

                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control"
                                   v-model="formData.email"
                                   placeholder="Email Address" autofocus
                                   @input="formErrors.email = ''"
                            >
                        </div>
                        <label v-if="formErrors.email" id="username-error" class="error">{{ formErrors.email }}</label>
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

                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control"
                                   v-model="formData.password_confirmation"
                                   placeholder="Confirm Password"
                            >
                        </div>
                        <label v-if="formErrors.password_confirmation" class="error">
                            {{ formErrors.password_confirmation }}
                        </label>
                    </div>

                    <button @click="resetPassword" class="btn btn-block btn-lg bg-pink waves-effect">
                        RESET MY PASSWORD
                    </button>

                    <div class="row m-t-20 m-b--5 align-center">
                        <router-link :to="{name: 'login'}">Sign In!</router-link>
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
    components: {},

    data() {
        return {
            formData: {
                email: '',
                password: '',
                password_confirmation: '',
                token: this.$route.params.token
            },
            formErrors: {}
        }
    },

    mounted() {
        $('body').removeClass().addClass('fp-page');
    },

    methods: {
        resetPassword() {
            this.$store.dispatch('auth/resetPassword', {
                inputs: this.formData
            })
                .then(res => {

                    toast.fire({
                        icon: 'success',
                        title: 'Password reset Successful!'
                    });

                    this.$store.dispatch('auth/login', {
                        inputs: this.formData
                    })
                        .then(res => {
                            this.$router.push({name: 'home'})
                        })
                })
                .catch(err => {
                    if (err.response.data.errors) {
                        this.formErrors = err.response.data.errors
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
