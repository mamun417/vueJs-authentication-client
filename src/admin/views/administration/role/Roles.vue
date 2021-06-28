<template>
    <section class="content">
        <vue-headful
            title="ROLES | VUE-AUTH"
        />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <router-link :to="{name: 'admin.administration.role.create'}">
                                <button type="button"
                                        data-toggle="modal" data-target="#defaultModal"
                                        class="btn btn-sm btn-success waves-effect pull-right"
                                        style="top: -8px">
                                    <i class="material-icons">add</i><span>CREATE</span>
                                </button>
                            </router-link>
                            <h2>Roles</h2>
                        </div>

                        <div class="header m-b--20" style="border-bottom: none!important;">
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select @change="handlePipeline({per_page:$event.target.value})"
                                                    class="form-control show-tick">
                                                <option :value="n" v-for="n in [2, 5, 10, 20]">{{ n }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input @input="handlePipeline({search:$event.target.value})" type="text"
                                                   class="form-control" placeholder="Type here...">
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

                            <div v-if="!users.length" class="body table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th class="text-center">PERMISSIONS</th>
                                        <th class="text-center">CREATED AT</th>
                                        <th class="text-center">ACTION</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(role, key) in roles">
                                        <td>{{ $_.upperFirst(role.name) }}</td>

                                        <td class="text-center" style="width: 50%">
                                            <div v-if="role.name === 'admin'">
                                                <span class="badge bg-teal m-r-10 m-b-5"
                                                      style="border-radius: 20px">All </span>
                                            </div>
                                            <div v-else>
                                                  <span v-for="permission in role.permissions"
                                                        class="badge bg-teal m-r-10 m-b-5"
                                                        style="border-radius: 20px">
                                                    {{ permission.name }}
                                                </span>
                                            </div>

                                        </td>

                                        <td class="text-center">{{ $dateFormat(role.created_at) }}</td>

                                        <td class="text-center" style="width: 18%">
                                            <router-link v-if="role.name !== 'admin'"
                                                         :to="{name: 'admin.administration.role.show', params:{role: role.id}}">
                                                <button
                                                    type="button" class="btn btn-xs btn-primary waves-effect m-r-5">
                                                    <i class="material-icons">edit</i><span>EDIT</span>
                                                </button>
                                            </router-link>

                                            <button @click="deleteRole(role.id)" v-if="role.name !== 'admin'"
                                                    type="button"
                                                    class="btn btn-xs btn-danger waves-effect">
                                                <i class="material-icons">delete</i><span>DELETE</span>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <!--<div style="display: flex;align-items: center">
                                    <div class="m-r-30">
                                        Showing {{ paginationMeta.from }} to {{ paginationMeta.to }} of {{ paginationMeta.total }} entries
                                    </div>

                                    <pagination
                                        :pagination-meta="paginationMeta"
                                        @handlePagination="handlePagination"
                                    />
                                </div>-->
                            </div>

                            <div v-else class="text-center p-b-25">No users found.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getRoles } from "../../../store/role/actions";

export default {
    name: "Roles",
    components: {},

    data() {
        return {
            roles: {},
            pipeline: {
                per_page: "",
                search: ""
            },
            loader: false,
            users: 12,
            descriptionLength: 26,
            paginationMeta: {
                last_page: 1,
                current_page: 1
            }
        };
    },

    mounted() {
        this.getRoles();
    },

    methods: {
        getRoles() {
            this.loader = true;

            this.$store.dispatch("role/getRoles", {
                paginationMeta: this.paginationMeta,
                pipeline: this.pipeline
            })
                .then(res => {
                    this.loader = false;
                    this.roles = res.data.roles.data;
                    delete res.data.roles.data;
                    this.paginationMeta = res.data.roles;
                })
                .catch(err => {
                    this.loader = false;
                });
        },

        handlePipeline(pipeline) {
            Object.keys(this.pipeline).forEach(key => {
                if (pipeline.hasOwnProperty(key)) {
                    this.pipeline[key] = pipeline[key];
                }
            });

            // get list
        },


        handleProductUpdate(updatedData) {
            this.users.map(product => {
                if (product.id === updatedData.id) {
                    Object.keys(product).forEach(key => {
                        product[key] = updatedData[key];
                    });
                }
            });
        },

        deleteRole(role) {
            this.$showConfirmMessage().then(result => {
                if (result.value) {
                    axios.delete(`roles/${role}`)
                        .then(res => {
                            this.getRoles()
                            this.$successToast('Role has been deleted Successful!');
                        })
                        .catch(err => {
                            //
                        })
                }
            })
        },

        handleEditButtonClick(data) {
            this.$emit("editButtonClick", data);
        },

        handlePagination(page) {
            this.paginationMeta.current_page = page;
            this.getProducts();
        }
    }
};
</script>
