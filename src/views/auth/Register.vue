<template>
    <div class="signup-box">
        <div class="logo">
            <a href="javascript:void(0);">Admin<b>BSB</b></a>
            <small>Admin BootStrap Based - Material Design</small>
        </div>
        <div class="card">
            <div class="body">
                <div id="sign_up">
                    <div class="msg">Register a new membership</div>
                    
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control"
                               placeholder="Name Surname" autofocus
                               v-model="formData.name"
                               @input="formErrors.name=''"
                            >
                        </div>
                        <label v-if="formErrors.name" class="error">{{ formErrors.name }}</label>
                    </div>
                    
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-line">
                            <input type="email" class="form-control"
                                placeholder="Email Address"
                                v-model="formData.email"
                                @input="formErrors.email = ''"
                            >
                        </div>
                        <label v-if="formErrors.email" class="error">{{ formErrors.email }}</label>
                    </div>
    
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control"
                                placeholder="Full Address" autofocus
                                v-model="formData.address"
                                @input="formErrors.address=''"
                            >
                        </div>
                        <label v-if="formErrors.address" class="error">{{ formErrors.address }}</label>
                    </div>
                    
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control"
                               v-model="formData.password"
                               placeholder="Password"
                            >
                        </div>
                        <label v-if="formErrors.password" class="error">{{ formErrors.password }}</label>
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
                        <label v-if="formErrors.password_confirmation" class="error">{{ formErrors.password_confirmation }}</label>
                    </div>
                    
                    <div class="form-group">
                        <input @click="formData.agree = !formData.agree"
                           type="checkbox" name="terms"
                           id="terms" class="filled-in chk-col-pink"
                        >
                        <label for="terms">
                            I read and agree to the
                            <a href="javascript:void(0);">terms of usage</a>.
                        </label>
                    </div>
                    
                    <button @click="register" :disabled="!formData.agree" class="btn btn-block btn-lg bg-pink waves-effect">SIGN UP</button>
                    
                    <div class="m-t-25 m-b--5 align-center">
                        <router-link :to="{name: 'login'}">You already have a membership?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: 'Register',
        data() {
            return {
                formData: {
                    name: '',
                    email: '',
                    address: '',
                    password: '',
                    password_confirmation: '',
                    agree: false
                },
                formErrors: {}
            }
        },

        components: {},

        mounted() {
            $('body').removeClass().addClass('signup-page');
        },

        methods: {
            register() {
                this.$store.dispatch('auth/register', {
                    inputs: this.formData
                })
                    .then(res => {
                        
                        toast.fire({
                            icon: 'success',
                            title: 'Registration Successful!'
                        });

                        this.$router.push({name: 'home'})
                    })
                    .catch(err => {
                        if (err.response.data.errors){
                            this.formErrors = err.response.data.errors
                        }else {
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
