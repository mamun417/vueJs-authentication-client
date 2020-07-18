<template>
    <div role="tabpanel" class="tab-pane fade in" id="change_password_settings">
        
        <loader v-if="loader"/>
        
        <div v-if="showCheckPasswordForm" class="form-horizontal">
            <div class="form-group">
                <label for="OldPassword" class="col-sm-3 control-label">
                    Old Password
                </label>
                <div class="col-sm-9">
                    <div class="form-line">
                        <input type="password"
                           class="form-control" id="OldPassword"
                           placeholder="Old Password"
                           v-model="formData.old_password"
                           @input="formErrors.old_password = ''"
                        >
                    </div>
                    <label v-if="formErrors.old_password" class="error">
                        {{ formErrors.old_password }}
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                    <button @click="checkPassword" class="btn btn-danger">CHECK</button>
                </div>
            </div>
        </div>
        
        <div v-else class="form-horizontal">
            <div class="form-group">
                <label for="NewPassword" class="col-sm-3 control-label">
                    New Password
                </label>
                <div class="col-sm-9">
                    <div class="form-line">
                        <input type="password"
                           class="form-control" id="NewPassword"
                           placeholder="New Password"
                           v-model="formData.password"
                           @input="formErrors.password = ''"
                        >
                    </div>
                    <label v-if="formErrors.password" class="error">
                        {{ formErrors.password }}
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="NewPasswordConfirm" class="col-sm-3 control-label">
                    Confirm Password
                </label>
                <div class="col-sm-9">
                    <div class="form-line">
                        <input type="password" class="form-control"
                           id="NewPasswordConfirm"
                           placeholder="New Password (Confirm)"
                           v-model="formData.password_confirmation"
                           @input="formErrors.password_confirmation = ''"
                        >
                    </div>
                    <label v-if="formErrors.password_confirmation" class="error">
                        {{ formErrors.password_confirmation }}
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                    <button @click="changePassword" class="btn btn-danger">CHANGE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Loader from '@/components/ui/loader'

    export default {
        name: 'Change-Password',
        components: {
            Loader
        },

        data() {
            return {
                loader: false,
                showCheckPasswordForm: true,
                formData: {},
                formErrors: {}
            }
        },

        methods: {
            checkPassword() {
                this.loader = true

                this.$store.dispatch('user/checkPassword', {
                    inputs: this.formData
                })
                    .then(res => {
                        this.loader = false
                        this.formData = {}
                        this.showCheckPasswordForm = false
                    })
                    .catch(err => {
                        this.handleError(err)
                    })
            },

            changePassword() {
                this.loader = true

                this.$store.dispatch('user/changePassword', {
                    inputs: this.formData
                })
                    .then(res => {
                        this.loader = false

                        toast.fire({
                            icon: 'success',
                            title: 'Password has been changed Successful!'
                        })

                        this.showCheckPasswordForm = true
                    })
                    .catch(err => {
                        this.handleError(err)
                    })
            },

            handleError(err) {
                this.loader = false

                if (err.response.data.errors) {
                    this.formErrors = err.response.data.errors
                } else {
                    toast.fire({
                        icon: 'error',
                        title: err.response.data.message
                    })
                }
            }
        }
    }
</script>
