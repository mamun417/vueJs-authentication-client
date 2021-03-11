<template>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <div class="image">
                <img :src="userInfo.image_url || '/assets/images/user-lg.jpg'" width="48" height="48" alt="User" />
            </div>
            <div class="info-container">
                <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ userInfo.name }}</div>
                <div class="email">{{ userInfo.email }}</div>
                <div class="btn-group user-helper-dropdown">
                    <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                    <ul class="dropdown-menu pull-right">
                        <li><router-link :to="{name: 'profile'}"><i class="material-icons">person</i>Profile</router-link></li>
                        <li role="separator" class="divider"></li>
                        <li><a><i class="material-icons">shopping_cart</i>Change Password</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="javascript:void(0);"><i class="material-icons">input</i>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- #User Info -->
        <!-- Menu -->
        <div class="menu">
            <ul class="list">
                <li class="header">MAIN NAVIGATION</li>
                <li>
                    <router-link :to="{name: 'home'}">
                        <i class="material-icons">home</i>
                        <span>Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'user'}" v-if="userInfo.role_id === 1">
                        <i class="material-icons">donut_large</i>
                        <span>Users</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'task'}">
                        <i class="material-icons">donut_large</i>
                        <span>Tasks</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- #Menu -->
    </aside>
    <!-- #END# Left Sidebar -->
</template>


<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'LeftSideBar',
        mounted() {
            this.getProfileInfo()
        },

        computed: {
            ...mapGetters({
                userInfo : 'profile/userInfo'
            })
        },

        methods: {
            getProfileInfo() {
                this.$store.dispatch('profile/getProfile')
            }
        }
    }
</script>
