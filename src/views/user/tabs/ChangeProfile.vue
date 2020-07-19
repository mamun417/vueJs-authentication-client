<template>
    <div role="tabpanel" class="tab-pane fade in active" id="profile_settings">
        
        <loader v-if="loader"/>
        
        <div class="form-horizontal">
            <div class="form-group">
                <label for="NameSurname" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="NameSurname"
                           name="NameSurname" placeholder="Name Surname"
                           v-model="formData.name"
                           @input="formErrors.name = ''"
                        >
                    </div>
                    <label v-if="formErrors.name" class="error">
                        {{ formErrors.name }}
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="Email" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="Email"
                           placeholder="Email"
                           v-model="formData.email"
                           @input="formErrors.email = ''"
                        >
                    </div>
                    <label v-if="formErrors.email" class="error">
                        {{ formErrors.email }}
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="InputExperience" class="col-sm-2 control-label">Address</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <textarea class="form-control" id="InputExperience"
                            rows="3" placeholder="Address"
                            v-model="formData.address"
                            @input="formErrors.address = ''"
                        >
                        </textarea>
                    </div>
                    <label v-if="formErrors.address" class="error">
                        {{ formErrors.address }}
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="InputSkills" class="col-sm-2 control-label">Skills</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="InputSkills"
                           name="InputSkills" placeholder="Skills" autocomplete="off">
                    </div>
                   <!-- <label v-if="formErrors.skills" class="error">
                        {{ formErrors.skills }}
                    </label>-->
                </div>
            </div>
            
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button @click="changeProfile" class="btn btn-danger">SUBMIT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Change-Profile',
        data() {
            return {
                loader: false,
                formData: {
                    name: '',
                    email: '',
                    address: '',
                    //agree: false
                },
                formErrors: {}
            }
        },

        mounted() {
            this.getProfileInfo()
        },

        computed: {
            ...mapGetters({
                userInfo: 'user/userInfo'
            })
        },
        
        methods: {
            getProfileInfo() {
                this.$store.dispatch('user/getProfile')
                    .then(res => {
                        this.setProfileInfo()
                    })
            },
            
            setProfileInfo() {
                Object.keys(this.formData).forEach(field => {
                    this.formData[field] = this.userInfo[field]
                })
                
                //this.formData.agree = false
            },
            
            changeProfile() {
                this.loader = true

                this.$store.dispatch('user/changeProfile', {
                    inputs: this.formData
                })
                    .then(res => {
                        this.loader = false

                        toast.fire({
                            icon: 'success',
                            title: 'Profile has been changed Successful!'
                        })
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
