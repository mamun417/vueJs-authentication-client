<template>
    <div>
        <div
            v-for="(permissionModule, index) in permissionModules"
            :key="permissionModule.id"
            class="col-lg-3 col-md-3 col-sm-6 col-xs-12"
        >
            <div class="card">
                <div class="header">
                    <input
                        type="checkbox"
                        :id="permissionModule.id"
                        class="filled-in"
                        @click="toggleModulePermissions(permissionModule)"
                        :checked="isModuleAllPermissionChecked(permissionModule)"
                        :disabled="isModuleAllPermissionDisabled(permissionModule)"
                    />

                    <label :for="permissionModule.id" class="m-b--5">
                        <h2>
                            {{ $upperFirst(permissionModule.name) }}
                        </h2>
                    </label>
                </div>

                <div class="body">
                    <div class="demo-checkbox">
                        <div v-for="(permission, key) in permissionModule.permissions" :key="permission.id">
                            <input
                                type="checkbox"
                                :id="`basic_checkbox_${permissionModule.name}_${permission.name}`"
                                class="filled-in"
                                v-model="permissions"
                                :value="permission.id"
                                :disabled="disablePermissions.includes(permission.id)"
                            />
                            <label :for="`basic_checkbox_${permissionModule.name}_${permission.name}`">
                                {{ $upperFirst(permission.name) }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PermissionModulesComponent",
    props: {
        selectedPermissions: {
            type: Array,
            default: []
        },
        // need for admin manage
        disablePermissions: {
            type: Array,
            default: []
        }
    },

    data() {
        return {
            permissionModules: {},
            permissions: []
        };
    },

    mounted() {
        this.getPermissionModules();
    },

    methods: {
        getPermissionModules() {
            axios.get("permission/modules").then((res) => {
                this.permissionModules = res.data.permission_modules;
            });
        },

        toggleModulePermissions(permissionModule) {
            const permissionIds = this.getPermissionIdsFromModule(permissionModule);

            // if already checked all permission of the permissionsModule, remove all the permissions (toggle)
            if (this.isModuleAllPermissionChecked(permissionModule)) {
                this.permissions = this.permissions.filter((id) => !permissionIds.includes(id));
            } else {
                this.permissions.push(...permissionIds);
            }

            // remove duplicate ids
            this.permissions = [...new Set(this.permissions)];
        },

        isModuleAllPermissionChecked(permissionModule) {
            const modulePermissionIds = this.getPermissionIdsFromModule(permissionModule);

            const checkedPermissions = modulePermissionIds.filter((id) => this.permissions.includes(id));

            return checkedPermissions.length === modulePermissionIds.length;
        },

        // need for admin manage
        isModuleAllPermissionDisabled(permissionModule) {
            const modulePermissionIds = this.getPermissionIdsFromModule(permissionModule);

            const disabledPermissions = modulePermissionIds.filter((id) => this.disablePermissions.includes(id));

            return disabledPermissions.length === modulePermissionIds.length;
        },

        getPermissionIdsFromModule(permissionModule) {
            return permissionModule.permissions.map((permission) => permission.id);
        }
    },

    watch: {
        permissions: {
            handler() {
                this.$emit("permissionChange", this.permissions);
            },
            deep: true,
            immediate: true
        },
        selectedPermissions: {
            handler() {
                this.permissions = this.selectedPermissions;
            },
            deep: true,
            immediate: true
        },
        // need for admin manage
        disablePermissions: {
            handler() {
                // remove those extra permissions which already connected with role
                this.permissions = this.permissions.filter((id) => !this.disablePermissions.includes(id));
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style scoped>
.card {
    min-height: 310px;
}
</style>
