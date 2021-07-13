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
                        :checked="isAllPermissionChecked(permissionModule)"
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
            if (this.isAllPermissionChecked(permissionModule)) {
                this.permissions = this.permissions.filter((id) => !permissionIds.includes(id));
            } else {
                this.permissions.push(...permissionIds);
            }

            // remove duplicate ids
            this.permissions = [...new Set(this.permissions)];
        },

        isAllPermissionChecked(permissionModule) {
            const permissionIds = this.getPermissionIdsFromModule(permissionModule);
            let checkedPermissions = [];

            // get checked permissions
            permissionIds.forEach((id) => this.permissions.includes(id) && checkedPermissions.push(id));

            return checkedPermissions.length === permissionIds.length;
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
        }
    }
};
</script>

<style scoped>
.card {
    min-height: 310px;
}
</style>
