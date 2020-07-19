<template>
    <div role="tabpanel" class="tab-pane fade in active" id="profile_settings">
        
        <loader v-if="loader"/>
        
        <form class="form-horizontal">
            <div class="form-group">
                <label for="NameSurname" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="NameSurname"
                               name="NameSurname" placeholder="Name Surname"
                               value="Marc K. Hammond">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="Email" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="email" class="form-control" id="Email" name="Email"
                               placeholder="Email" value="example@example.com" required>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="InputExperience"
                       class="col-sm-2 control-label">Experience</label>
                
                <div class="col-sm-10">
                    <div class="form-line">
                                                        <textarea class="form-control" id="InputExperience"
                                                                  name="InputExperience" rows="3"
                                                                  placeholder="Experience"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="InputSkills" class="col-sm-2 control-label">Skills</label>
                
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="InputSkills"
                               name="InputSkills" placeholder="Skills">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <input type="checkbox" id="terms_condition_check" class="chk-col-red filled-in"/>
                    <label for="terms_condition_check" @click="formData.agree = !formData.agree">
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button @click="changeProfile" class="btn btn-danger" :disabled="!formData.agree">SUBMIT</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    export default {
        name: 'Change-Profile',
        data() {
            return {
                loader: false,
                formData: {
                    agree: false
                },
                formErrors: {}
            }
        },

        methods: {
            changeProfile() {
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
