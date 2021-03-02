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
                    <button @click="checkPassword" class="btn btn-success">CHECK</button>
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
                    <button @click="changePassword" class="btn btn-success">CHANGE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Change-Password',
        props: {
            showCheckPasswordForm: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                loader: false,
                formData: {},
                formErrors: {}
            }
        },

        methods: {
            checkPassword() {
                this.loader = true

                this.$store.dispatch('profile/checkPassword', {
                    inputs: this.formData
                })
                    .then(res => {
                        this.loader = false
                        this.formData = {}
                        this.$emit('update:showCheckPasswordForm', false)
                    })
                    .catch(err => {
                        this.handleError(err)
                    })
            },

            changePassword() {
                this.loader = true

                this.$store.dispatch('profile/changePassword', {
                    inputs: this.formData
                })
                    .then(res => {
                        this.loader = false
                        this.$successToast('Password has been changed Successful!')
                        this.$emit('update:showCheckPasswordForm', true)
                        this.formData = {}
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
                  this.$errorToast(err.response.data.message)
                }
            }
        }
    }
</script>
