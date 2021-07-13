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
                                                    @input="formErrors.name = ''"
                                                />
                                            </div>
                                            <label v-if="formErrors.name" class="error">
                                                {{ formErrors.name }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <permission-modules-component
                                    :selectedPermissions="formData.permissions"
                                    @permissionChange="formData.permissions = $event"
                                />
                            </div>

                            <div class="row">
                                <div class="clearfix">
                                    <div class="col-sm-12">
                                        <span v-if="formErrors.permissions" class="font-12" style="color: #f44336">
                                            {{ formErrors.permissions }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="clearfix">
                                    <div class="col-sm-12">
                                        <button
                                            @click="updateForm ? updateRole() : createRole()"
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
            formData: {
                name: "",
                permissions: []
            },
            formErrors: {}
        };
    },

    mounted() {
        // check for updateForm
        if (this.$route.name === "admin.administration.role.edit") {
            this.updateForm = true;
            this.getRoleInfo();
        }
    },

    methods: {
        createRole() {
            axios
                .post("roles", this.formData)
                .then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Role created Successful!"
                    });

                    this.$router.push({ name: "admin.administration.role" });
                })
                .catch((err) => {
                    if (err.response.data.errors) {
                        this.formErrors = err.response.data.errors;
                    }
                });
        },

        getRoleInfo() {
            const role = this.$route.params.role;

            if (role) {
                axios
                    .get(`roles/${role}`)
                    .then((res) => {
                        this.formData.name = res.data.role.name;
                        this.formData.permissions = res.data.role.permissions.map((permission) => permission.id);
                    })
                    .catch((err) => {
                        // redirect to 404 page
                        console.log(err.response.data);
                    });
            }
        },

        updateRole() {
            const role = this.$route.params.role;

            axios
                .put(`roles/${role}`, this.formData)
                .then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Role updated Successful!"
                    });

                    this.$router.push({ name: "admin.administration.role" });
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
