<template>
    <div class="login-page" style="position: relative">
        <vue-headful title="LOGIN | VUE-AUTH" />

        <div class="login-box">
            <div class="logo">
                <a href="javascript:void(0);">Admin<b>BSB</b></a>
                <small>Admin BootStrap Based - Material Design</small>
            </div>
            <div class="card">
                <div class="body">
                    <div id="sign_in">
                        <loader v-if="loader" />

                        <div class="msg">Sign in to start your session</div>

                        <form @submit.prevent="login">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line">
                                    <input
                                        class="form-control"
                                        v-model="formData.email"
                                        placeholder="Email Address"
                                        @input="formErrors.email = ''"
                                        type="text"
                                        autofocus
                                    />
                                </div>
                                <label v-if="formErrors.email" id="username-error" class="error">
                                    {{ formErrors.email }}
                                </label>
                            </div>

                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">lock</i>
                                </span>
                                <div class="form-line">
                                    <input
                                        type="password"
                                        class="form-control"
                                        v-model="formData.password"
                                        placeholder="Password"
                                        @input="formErrors.password = ''"
                                    />
                                </div>
                                <label v-if="formErrors.password" id="password-error" class="error">
                                    {{ formErrors.password }}
                                </label>
                            </div>

                            <div class="row">
                                <div class="col-xs-8 p-t-5">
                                    <input
                                        type="checkbox"
                                        name="rememberme"
                                        id="rememberme"
                                        class="filled-in chk-col-pink"
                                    />
                                    <label for="rememberme">Remember Me</label>
                                </div>
                                <div class="col-xs-4">
                                    <button class="btn btn-block bg-pink waves-effect" @click="login">SIGN IN</button>
                                </div>
                            </div>
                        </form>

                        <div class="row m-t-15 m-b--20">
                            <div class="col-sm-12">
                                <button
                                    @click="socialLogin('github')"
                                    type="button"
                                    class="btn bg-black btn-block btn-sm waves-effect"
                                >
                                    <i class="material-icons">account_box</i>
                                    <span>LOGIN WITH GITHUB</span>
                                </button>

                                <button
                                    @click="socialLogin('google')"
                                    type="button"
                                    class="btn btn-danger btn-block btn-sm waves-effect"
                                >
                                    <i class="material-icons">gmail</i>
                                    <span>LOGIN WITH GOOGLE</span>
                                </button>

                                <button
                                    @click="socialLogin('facebook')"
                                    type="button"
                                    class="btn btn-block btn-sm bg-indigo waves-effect"
                                >
                                    <i class="material-icons">facebook</i>
                                    <span>LOGIN WITH FACEBOOK</span>
                                </button>
                            </div>
                        </div>

                        <div class="row m-t-15 m-b--20">
                            <div class="col-xs-6">
                                <router-link :to="{ name: 'register' }"> Register Now! </router-link>
                            </div>
                            <div class="col-xs-6 align-right">
                                <router-link :to="{ name: 'password.email' }"> Forgot Password? </router-link>
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
    name: "Login",
    data() {
        return {
            formData: {
                email: "admin@test.com",
                password: "password"
            },
            formErrors: {},
            loader: false
        };
    },

    mounted() {
        $("body").removeClass().addClass("login-page");
    },

    methods: {
        login() {
            this.loader = true;

            this.$store
                .dispatch("auth/login", {
                    inputs: this.formData
                })
                .then((res) => {
                    this.loader = false;

                    toast.fire({
                        icon: "success",
                        title: "Login Successful!"
                    });

                    this.$router.push({ name: "admin.home" });
                })
                .catch((err) => {
                    let self = this;

                    setTimeout(function () {
                        self.loader = false;

                        if (err.response.data.errors) {
                            self.formErrors = err.response.data.errors;
                        } else {
                            toast.fire({
                                icon: "error",
                                title: err.response.data.message
                            });
                        }
                    }, 1);
                });
        },

        socialLogin($service) {
            window.location.href = `http://127.0.0.1:8000/api/auth/login/${$service}`;
        }
    }
};
</script>
