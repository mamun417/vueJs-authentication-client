<template>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <div class="image">
                <img :src="userInfo.image_url || '/assets/images/user-lg.jpg'" width="48" height="48" alt="User" />
            </div>
            <div class="info-container">
                <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ userInfo.name }}
                </div>
                <div class="email">{{ userInfo.email }}</div>
                <div class="btn-group user-helper-dropdown">
                    <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                        >keyboard_arrow_down</i
                    >
                    <ul class="dropdown-menu pull-right">
                        <li>
                            <router-link :to="{ name: 'profile' }"
                                ><i class="material-icons">person</i>Profile
                            </router-link>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li>
                            <a><i class="material-icons">shopping_cart</i>Change Password</a>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li>
                            <a href="javascript:void(0);"><i class="material-icons">input</i>Sign Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- #User Info -->
        <!-- Menu -->
        <div class="menu">
            <div @click="test" v-if="$can('read')">
                <a>Add Post</a>
            </div>

            <div v-if="$can('view')">
                <a>View Post</a>
            </div>

            <ul class="list">
                <li class="header" id="mamun">MAIN NAVIGATION</li>

                <li>
                    <router-link :to="{ name: 'admin.home' }">
                        <i class="material-icons">home</i>
                        <span>Home</span>
                    </router-link>
                </li>

                <li v-if="$can('manage')">
                    <a href="javascript:void(0);" class="menu-toggle waves-effect waves-block">
                        <i class="material-icons">admin_panel_settings</i>
                        <span>Administrator</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <router-link
                                :to="{ name: 'admin.administration.admin' }"
                                :class="
                                    $checkIsRouter('admin.administration.admin.create')
                                        ? 'router-link-exact-active'
                                        : ''
                                "
                            >
                                <i class="material-icons" style="margin-top: 1px">people</i>
                                <span>Admins</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link
                                :to="{ name: 'admin.administration.role' }"
                                :class="
                                    $checkIsRouter('admin.administration.role.create') ? 'router-link-exact-active' : ''
                                "
                            >
                                <i class="material-icons" style="margin-top: 1px">manage_accounts</i>
                                <span>Manage Role</span>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <router-link :to="{ name: 'product' }">
                        <i class="material-icons">donut_large</i>
                        <span>Products</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'skills' }">
                        <i class="material-icons">list</i>
                        <span>Skills</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'cart' }">
                        <i class="material-icons">shop</i>
                        <span>Ecommerce</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'pdf' }">
                        <i class="material-icons">book</i>
                        <span>PDF</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'login' }">
                        <i class="material-icons">donut_large</i>
                        <span>Login</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/" target="_blank">
                        <i class="material-icons">donut_large</i>
                        <span>Go to main site</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- #Menu -->
    </aside>
    <!-- #END# Left Sidebar -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "LeftSideBar",
    mounted() {
        this.getProfileInfo();
        this.multilevelMenuHandle();
    },

    computed: {
        ...mapGetters({
            userInfo: "user/userInfo"
        })
    },

    methods: {
        test() {
            if (this.$can("read")) {
                alert("ok");
            }
        },

        getProfileInfo() {
            this.$store.dispatch("user/getProfile");
        },

        multilevelMenuHandle() {
            setTimeout(() => {
                $(".menu-toggle").on("click", function (e) {
                    var $this = $(this);
                    var $content = $this.next();

                    if ($($this.parents("ul")[0]).hasClass("list")) {
                        var $not = $(e.target).hasClass("menu-toggle") ? e.target : $(e.target).parents(".menu-toggle");

                        $.each($(".menu-toggle.toggled").not($not).next(), function (i, val) {
                            if ($(val).is(":visible")) {
                                $(val).prev().toggleClass("toggled");
                                $(val).slideUp();
                            }
                        });
                    }

                    $this.toggleClass("toggled");
                    $content.slideToggle(320);
                });
            }, 1000);
        }
    }
};
</script>
