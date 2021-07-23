<template>
    <section class="content">
        <vue-headful title="ADMINS | VUE-AUTH" />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <router-link :to="{ name: 'admin.administration.admin.create' }">
                                <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#defaultModal"
                                    class="btn btn-sm btn-success waves-effect pull-right"
                                    style="top: -8px"
                                >
                                    <i class="material-icons">add</i><span>CREATE</span>
                                </button>
                            </router-link>
                            <h2>Admins</h2>
                        </div>

                        <div class="header m-b--20" style="border-bottom: none !important">
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select
                                                @change="handlePipeline({ per_page: $event.target.value })"
                                                class="form-control show-tick"
                                            >
                                                <option
                                                    :value="n"
                                                    v-for="n in [2, 5, 10, 20]"
                                                    :selected="pipeline.per_page === n"
                                                >
                                                    {{ n }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input
                                                @input="handlePipeline({ search: $event.target.value })"
                                                type="text"
                                                class="form-control"
                                                placeholder="Type here..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <button type="button" class="btn btn-info btn-lg m-l-15 waves-effect">
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <loader v-if="loader" />

                            <div v-if="admins.length" class="body table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th>Email</th>
                                            <th class="text-center">ROLES</th>
                                            <th class="text-center">EXTRA PERMISSIONS</th>
                                            <th class="text-center" width="10%">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(admin, key) in admins">
                                            <td>{{ $_.upperFirst(admin.name) }}</td>
                                            <td>{{ admin.email }}</td>

                                            <td class="text-center">
                                                <span
                                                    v-for="role in admin.roles"
                                                    class="badge bg-teal m-r-10 m-b-5"
                                                    style="border-radius: 20px"
                                                >
                                                    {{ role.name }}
                                                </span>
                                            </td>

                                            <td class="text-center">
                                                <span
                                                    v-for="permission in admin.permissions"
                                                    class="badge bg-teal m-r-10 m-b-5"
                                                    style="border-radius: 20px"
                                                >
                                                    {{ permission.name }}
                                                </span>
                                            </td>

                                            <td class="text-center">
                                                <router-link
                                                    :to="{
                                                        name: 'admin.administration.admin.edit',
                                                        params: { admin: admin.id }
                                                    }"
                                                >
                                                    <button
                                                        type="button"
                                                        class="btn btn-xs btn-primary waves-effect m-r-5"
                                                    >
                                                        <i class="material-icons">edit</i>
                                                    </button>
                                                </router-link>

                                                <button
                                                    @click="deleteAdmin(admin.id)"
                                                    type="button"
                                                    class="btn btn-xs btn-danger waves-effect"
                                                >
                                                    <i class="material-icons">delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div style="display: flex; align-items: center">
                                    <div class="m-r-30">
                                        Showing {{ paginationMeta.from }} to {{ paginationMeta.to }} of
                                        {{ paginationMeta.total }} entries
                                    </div>

                                    <pagination
                                        :pagination-meta="paginationMeta"
                                        @handlePagination="handlePagination"
                                    />
                                </div>
                            </div>

                            <div v-else class="text-center p-b-25">No roles found.</div>
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
    components: {},

    data() {
        return {
            admins: {},
            pipeline: {
                per_page: "",
                search: ""
            },
            loader: false,
            paginationMeta: {
                last_page: 1,
                current_page: 1
            }
        };
    },

    mounted() {
        this.getAdmins();
    },

    methods: {
        getAdmins() {
            this.loader = true;

            this.$store
                .dispatch("admin/getAdmins", {
                    paginationMeta: this.paginationMeta,
                    pipeline: this.pipeline
                })
                .then((res) => {
                    this.loader = false;
                    this.admins = res.data.admins.data;
                    delete res.data.admins.data;
                    this.paginationMeta = res.data.admins;

                    Object.keys(this.pipeline).forEach((key) => {
                        this.pipeline[key] = res.data.admins[key];
                    });
                })
                .catch((err) => {
                    this.loader = false;
                });
        },

        handlePipeline(pipeline) {
            Object.keys(this.pipeline).forEach((key) => {
                if (pipeline.hasOwnProperty(key)) {
                    this.pipeline[key] = pipeline[key];
                }
            });

            this.getAdmins();
        },

        handleProductUpdate(updatedData) {
            this.roles.map((product) => {
                if (product.id === updatedData.id) {
                    Object.keys(product).forEach((key) => {
                        product[key] = updatedData[key];
                    });
                }
            });
        },

        deleteAdmin(admin) {
            this.$showConfirmMessage().then((result) => {
                if (result.value) {
                    axios
                        .delete(`admins/${admin}`)
                        .then((res) => {
                            this.getAdmins();
                            this.$successToast("Admin has been deleted Successful!");
                        })
                        .catch((err) => {
                            //
                        });
                }
            });
        },

        handlePagination(page) {
            this.paginationMeta.current_page = page;
            this.getAdmins();
        }
    }
};
</script>
