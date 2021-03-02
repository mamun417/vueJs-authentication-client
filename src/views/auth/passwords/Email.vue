<template>
    <div class="fp-box">
        <div class="logo">
            <a href="javascript:void(0);">TASK MANAGER</a>
        </div>
        <div class="card">
            <div class="body">
                <div id="forgot_password">

                    <loader v-if="loader"/>

                    <div class="msg">
                        Enter your email address that you used to register. We'll send you an email with your username
                        and a
                        link to reset your password.
                    </div>

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

                    <button @click="resetPassword" class="btn btn-block btn-lg bg-pink waves-effect">
                        SEND EMAIL
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
        data(){
            return {
                formData : {
                    email : '',
                    url: this.$resetPasswordUrl
                },
                formErrors : {},
                loader: false
            }
        },

        mounted() {
            $('body').removeClass().addClass('fp-page');
        },

        methods: {
            resetPassword() {
                this.loader = true

                this.$store.dispatch('auth/sendPasswordResetEmail', {
                    inputs: this.formData
                })
                    .then(res => {
                        this.loader = false

                        toast.fire({
                            icon: 'success',
                            title: 'We have e-mailed your password reset link!'
                        });

                        this.formData.email = ''
                    })
                    .catch(err => {
                        this.loader = false

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

