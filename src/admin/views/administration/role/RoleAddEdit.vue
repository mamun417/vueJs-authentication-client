<template>
    <section class="content">
        <vue-headful title="CREATE ROLES | VUE-AUTH" />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>CREATE ROLES</h2>
                        </div>

                        <div class="body">
                            <div class="row">
                                <div class="clearfix">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input
                                                    v-model="formData.name"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Enter role name Ex. (manager, customer)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    v-for="(permissionModule, index) in permissionModules"
                                    :key="permissionModule.id"
                                    class="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                                >
                                    <div class="card">
                                        <div class="header">
                                            <h2>
                                                {{ $upperFirst(permissionModule.name) }}
                                            </h2>
                                        </div>
                                        <div class="body">
                                            <div class="demo-checkbox">
                                                <div
                                                    v-for="(permission, key) in permissionModule.permissions"
                                                    :key="permission.id"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        :id="`basic_checkbox_${permissionModule.name}_${permission.name}`"
                                                        class="filled-in"
                                                        v-model="formData.permissions"
                                                        :value="permission.id"
                                                    />
                                                    <label
                                                        :for="`basic_checkbox_${permissionModule.name}_${permission.name}`">
                                                        {{ $upperFirst(permission.name) }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="clearfix">
                                    <div class="col-sm-12">
                                        <button
                                            @click="createRole"
                                            type="button"
                                            class="btn btn-success waves-effect"
                                        >
                                            Submit
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
export default {
    name: "RoleAddEdit",
    data() {
        return {
            updateForm: false,
            permissionModules: {},
            formData: {
                name: "",
                permissions: []
            }
        };
    },

    mounted() {
        this.getPermissionModules();

        // check for updateForm
        if (this.$route.name === "admin.administration.role.show") {
            this.updateForm = true;
            this.getRoleInfo();
        }
    },

    methods: {
        getPermissionModules() {
            axios.get("permission/modules").then(res => {
                this.permissionModules = res.data.permission_modules;
            });
        },

        createRole() {
            axios.post("roles", this.formData)
                .then(res => {
                    toast.fire({
                        icon: "success",
                        title: "Role created Successful!"
                    });

                    this.$router.push({ name: "admin.administration.role" });
                })
                .catch(err => {
                    console.log(err.response.data);
                });
        },

        getRoleInfo() {
            const role = this.$route.params.role;

            if (role) {
                axios.get(`roles/${role}`)
                    .then(res => {
                        this.formData.name = res.data.role.name;
                        this.formData.permissions = res.data.role.permissions.map(permission => permission.id);
                    })
                    .catch(err => {
                        console.log(err.response.data);
                    });
            }

        },

        // not done
        updateRole() {
            const role = this.$route.params.role;

            axios.post(`roles/${role}`, this.formData)
                .then(res => {
                    toast.fire({
                        icon: "success",
                        title: "Role updated Successful!"
                    });

                    this.$router.push({ name: "admin.administration.role" });
                })
                .catch(err => {
                    console.log(err.response.data);
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
