<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-xs-12 col-sm-3">
                    <div class="card profile-card">
                        <div class="profile-header">&nbsp;</div>
                        <div class="profile-body">
                            <div class="image-area">
                                <img src="/assets/images/user-lg.jpg" alt="AdminBSB - Profile Image"/>
                            </div>
                            <div class="content-area">
                                <h3>Marc K. Hammond</h3>
                                <p>Web Software Developer</p>
                                <p>Administrator</p>
                            </div>
                        </div>
                        <div class="profile-footer">
                            <ul>
                                <li>
                                    <span>Followers</span>
                                    <span>1.234</span>
                                </li>
                                <li>
                                    <span>Following</span>
                                    <span>1.201</span>
                                </li>
                                <li>
                                    <span>Friends</span>
                                    <span>14.252</span>
                                </li>
                            </ul>
                            <button class="btn btn-primary btn-lg waves-effect btn-block">FOLLOW</button>
                        </div>
                    </div>
                </div>
                
                <div class="col-xs-12 col-sm-9">
                    <div class="card">
                        <div class="body">
                            <div>
                                
                                <loader v-if="loader"/>
                                
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#profile_settings"
                                                                              aria-controls="settings" role="tab"
                                                                              data-toggle="tab">Profile Settings</a>
                                    </li>
                                    <li role="presentation"><a href="#profile_image" aria-controls="home" role="tab"
                                                               data-toggle="tab">Profile Image</a></li>
                                    <li role="presentation"><a href="#change_password_settings" aria-controls="settings"
                                                               role="tab" data-toggle="tab">Change Password</a></li>
                                </ul>
                                
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade in active" id="profile_settings">
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
                                                    <input type="checkbox" id="terms_condition_check"
                                                           class="chk-col-red filled-in"/>
                                                    <label for="terms_condition_check">I agree to the <a href="#">terms
                                                        and conditions</a></label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-offset-2 col-sm-10">
                                                    <button type="submit" class="btn btn-danger">SUBMIT</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    
                                    <div role="tabpanel" class="tab-pane fade in" id="profile_image">
                                        <h4>Image upload</h4>
                                    </div>
                                    
                                    <div role="tabpanel" class="tab-pane fade in" id="change_password_settings">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loader from '../../components/ui/loader'
    
    export default {
        name: 'Change-Password',
        components: {
            Loader
        },
        
        data() {
            return {
                showCheckPasswordForm: true,
                formData: {},
                formErrors: {},
                loader: false
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
