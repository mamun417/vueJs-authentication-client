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
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Enter role name Ex. (manager, customer)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    v-for="(module, index) in modules"
                                    :key="index"
                                    class="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                                >
                                    <div class="card">
                                        <div class="header">
                                            <h2>
                                                {{ $upperFirst(Object.keys(module)[0]) }}
                                            </h2>
                                        </div>
                                        <div class="body">
                                            <div class="demo-checkbox">
                                                <div
                                                    v-for="(permission, key) in module[Object.keys(module)[0]]
                                                        .permissions"
                                                    :key="key"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        :id="`basic_checkbox_${module}_${permission}`"
                                                        class="filled-in"
                                                        :checked="key % 2"
                                                    />
                                                    <label :for="`basic_checkbox_${module}_${permission}`">
                                                        {{ $upperFirst(permission) }}
                                                    </label>
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
export default {
    name: "Roles",
    data() {
        return {
            modules: [
                {
                    product: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    ecommerce: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    product: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    ecommerce: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    product: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    ecommerce: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    product: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                },
                {
                    ecommerce: {
                        permissions: ["Create", "Edit", "Update", "Delete"]
                    }
                }
            ]
        };
    },

    mounted() {
        console.log("okkk");
    }
};
</script>

<style scoped></style>
