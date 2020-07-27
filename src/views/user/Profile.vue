<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-xs-12 col-sm-3">
                    <div class="card profile-card">
                        <div class="profile-header">&nbsp;</div>
                        <div class="profile-body">
                            <div class="image-area">
                                <img :src="userInfo.image_url || '/assets/images/user-lg.jpg'" height="128px" width="128px" alt="AdminBSB - Profile Image"/>
                            </div>
                            <div class="content-area">
                                <h4>{{ userInfo.name }}</h4>
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
                                
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active">
                                        <a href="#profile_settings" aria-controls="settings" role="tab" data-toggle="tab">
                                            Profile Settings
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#profile_image" aria-controls="home" role="tab" data-toggle="tab">
                                            Profile Image
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a @click="showCheckPasswordForm=true" href="#change_password_settings" aria-controls="settings" role="tab" data-toggle="tab">
                                            Change Password
                                        </a>
                                    </li>
                                </ul>
                                
                                <div class="tab-content">
                                    <change-profile/>
                                    
                                    <change-image/>
                                    
                                    <change-password
                                        :show-check-password-form.sync="showCheckPasswordForm"
                                    />
                                    
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
    import {mapGetters} from "vuex";
    import ChangePassword from "./tabs/ChangePassword";
    import ChangeProfile from "./tabs/ChangeProfile";
    import ChangeImage from "./tabs/ChangeImage";
    
    export default {
        name: 'Profile',
        data() {
            return {
                showCheckPasswordForm: true
            }
        },
        
        components: {
            ChangeImage,
            ChangePassword,
            ChangeProfile
        },

        computed: {
            ...mapGetters({
                userInfo: 'user/userInfo'
            })
        },
    }
</script>
