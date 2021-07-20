<template>
    <section class="content">
        <vue-headful title="CREATE ADMIN | VUE-AUTH" />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>CREATE ADMIN</h2>
                        </div>

                        <div class="body">
                            <div class="row">
                                <div class="clearfix">
                                    <div class="col-sm-12">
                                        <form>
                                            <div class="col-sm-6">
                                                <label for="name">Name</label>
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            class="form-control"
                                                            v-model="formData.name"
                                                            @input="formErrors.name = ''"
                                                            placeholder="Enter admin name"
                                                        />
                                                    </div>
                                                    <label v-if="formErrors.name" class="error">
                                                        {{ formErrors.name }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <label for="email">Email Address</label>
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            class="form-control"
                                                            v-model="formData.email"
                                                            @input="formErrors.email = ''"
                                                            placeholder="Enter admin email address"
                                                        />
                                                    </div>
                                                    <label v-if="formErrors.email" class="error">
                                                        {{ formErrors.email }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <label for="address">Address</label>
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            class="form-control"
                                                            v-model="formData.address"
                                                            @input="formErrors.address = ''"
                                                            placeholder="Enter admin full address"
                                                        />
                                                    </div>
                                                    <label v-if="formErrors.address" class="error">
                                                        {{ formErrors.address }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <label for="password">Password</label>
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            class="form-control"
                                                            v-model="formData.password"
                                                            @input="formErrors.password = ''"
                                                            placeholder="Enter admin password"
                                                        />
                                                    </div>
                                                    <label v-if="formErrors.password" class="error">
                                                        {{ formErrors.password }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-sm-12">
                                                <label class="m-b-15">Roles</label>
                                                <div class="form-group">
                                                    <div class="demo-checkbox">
                                                        <template v-for="(role, key) in roleList">
                                                            <input
                                                                v-model="formData.roles"
                                                                :value="role.id"
                                                                :id="`role_${key}`"
                                                                type="checkbox"
                                                                class="filled-in"
                                                            />
                                                            <label :for="`role_${key}`" class="m-b-15 m-r-10">
                                                                {{ $_.upperFirst(role.name) }}
                                                            </label>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <h5 class="m-l-15 m-b-20">Extra Permissions</h5>
                                                    <permission-modules-component
                                                        :disable-permissions="disablePermissions"
                                                        :selected-permissions="formData.permissions"
                                                        @permissionChange="formData.permissions = $event"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="clearfix">
                                    <div class="col-sm-12">
                                        <button
                                            @click="updateForm ? updateAdmin() : createAdmin()"
                                            type="button"
                                            class="btn btn-success waves-effect"
                                        >
                                            {{ updateForm ? "Update" : "Submit" }}
                                        </button>
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
import PermissionModulesComponent from "../PermissionModulesComponent";

export default {
    name: "RoleAddEdit",
    components: { PermissionModulesComponent },

    data() {
        return {
            updateForm: false,
            roleList: {},
            formData: {
                name: "",
                email: "",
                address: "",
                password: "",
                roles: [],
                permissions: []
            },
            formErrors: {}
        };
    },

    computed: {
        disablePermissions: function () {
            if (this.roleList.length) {
                let disablePermissions = this.roleList
                    .filter((role) => this.formData.roles.includes(1) || this.formData.roles.includes(role.id))
                    .map((selectedRole) => selectedRole.permissions.map((permission) => permission.id))
                    .flat();

                return [...new Set(disablePermissions)];
            }

            return [];
        }
    },

    mounted() {
        this.getRoleList();

        // check for updateForm
        if (this.$route.name === "admin.administration.admin.edit") {
            this.updateForm = true;
            this.getAdminInfo();
        }
    },

    methods: {
        getRoleList() {
            axios.get("roles/list").then((res) => {
                this.roleList = res.data.roles;
            });
        },

        createAdmin() {
            axios
                .post("admins", this.formData)
                .then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Admin created Successful!"
                    });

                    this.$router.push({ name: "admin.administration.admin" });
                })
                .catch((err) => {
                    if (err.response.data.errors) {
                        this.formErrors = err.response.data.errors;
                    }
                });
        },

        getAdminInfo() {
            const admin = this.$route.params.admin;

            if (admin) {
                axios
                    .get(`admins/${admin}`)
                    .then((res) => {
                        this.formData.name = res.data.admin.name;
                        this.formData.email = res.data.admin.email;
                        this.formData.address = res.data.admin.address;
                        this.formData.roles = res.data.admin.roles.map((role) => role.id);
                        this.formData.permissions = res.data.admin.permissions.map((permission) => permission.id);
                    })
                    .catch((err) => {
                        // redirect to 404 page
                        console.log(err.response.data);
                    });
            }
        },

        updateAdmin() {
            const admin = this.$route.params.admin;

            axios
                .put(`admins/${admin}`, this.formData)
                .then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Admin updated Successful!"
                    });

                    this.$router.push({ name: "admin.administration.admin" });
                })
                .catch((err) => {
                    if (err.response.data.errors) {
                        this.formErrors = err.response.data.errors;
                    } else {
                        toast.fire({
                            icon: "error",
                            title: err.response.data.message
                        });
                    }
                });
        }
    }
};
</script>

<style scoped>
.card {
    min-height: 310px;
}
</style>
