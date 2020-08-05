<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <loader v-if="loader"/>

                    <div class="card">
                        <div class="header">
                            <button @click="handleCreateButtonClick" type="button"
                                data-toggle="modal" data-target="#defaultModal"
                                class="btn btn-sm btn-success waves-effect pull-right"
                                style="top: -8px">
                                <i class="material-icons">add</i><span>CREATE</span>
                            </button>
                            <h2>Products</h2>
                        </div>

                        <div class="header m-b--20" style="border-bottom: none!important;">
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" class="form-control">
                                            <label class="form-label">Type here...</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                                <select @change="handlePipeline" class="form-control show-tick">
                                                    <option value="">All</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <button type="button" class="btn btn-info btn-lg m-l-15 waves-effect">SEARCH</button>
                                </div>
                            </div>
                        </div>

                        <div v-if="products.length" class="body table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th style="width: 25%">DESCRIPTION</th>
                                        <th class="text-center">PRICE</th>
                                        <th class="text-center">IMAGE</th>
                                        <th class="text-center">CREATED AT</th>
                                        <th class="text-center" style="width: 10%">STATUS</th>
                                        <th class="text-center">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, key) in products">
                                        <td>{{ product.name }}</td>
                                        <td v-if="product.description">
                                            {{ $_.upperFirst(product.description).substring(0, descriptionLength) }}

                                            <div class="collapse" :id="'collapseExample'+key">
                                                {{ product.description.substring(descriptionLength) }}
                                            </div>

                                            <button data-parent="#accordion_1"
                                                v-if="product.description.length > descriptionLength"
                                                class="btn btn-info waves-effect" type="button"
                                                data-toggle="collapse"
                                                :data-target="'#collapseExample'+key"
                                                aria-expanded="false"
                                                aria-controls="collapseExample"
                                                style="padding: 0 6px"
                                            >
                                                MORE
                                            </button>
                                        </td>
                                        <td v-else></td>

                                        <td class="text-center">{{ product.price }} TK</td>

                                        <td class="text-center">
                                            <img v-if="product.image" :src="product.image_url" height="60px" width="60px" alt="image not found">
                                        </td>

                                        <td class="text-center">{{ $dateFormat(product.created_at) }}</td>

                                        <td class="text-center">
                                            <div class="demo-switch">
                                                <div class="switch" style="min-width: auto">
                                                    <label><input @change="changeStatus(product)" type="checkbox" :checked="product.status"><span class="lever"></span></label>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="text-center">
                                            <button @click="handleEditButtonClick(product)"
                                                data-toggle="modal" data-target="#defaultModal"
                                                type="button" class="btn btn-xs btn-primary waves-effect m-r-5">
                                                <i class="material-icons">edit</i><span>EDIT</span>
                                            </button>
                                            <button @click="deleteProduct(product)" type="button" class="btn btn-xs btn-danger waves-effect">
                                                <i class="material-icons">delete</i><span>DELETE</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style="display: flex;align-items: center">
                                <div class="m-r-30">
                                    Showing {{ paginationMeta.from }} to {{ paginationMeta.to }} of {{ paginationMeta.total }} entries
                                </div>
                                <paginate
                                    v-model="paginationMeta.current_page"
                                    :click-handler="handlePagination"
                                    :page-count="paginationMeta.last_page"
                                    :prev-text="'Prev'"
                                    :next-text="'Next'"
                                    :container-class="'pagination'"
                                    style="margin: 0"
                                />
                            </div>

                        </div>

                        <div v-else class="body">
                            <div class="alert alert-warning">
                                <strong>Warning!</strong> No products found.
                            </div>
                        </div>
                    </div>
                </div>

                <product-add-edit-modal
                    :count-reset-modal.sync="countResetModal"
                    :edit-data="selectedForEdit"
                    :update-modal="updateModal"
                    @addProduct="getProducts"
                    @updateProduct="handleProductUpdate"
                />
            </div>
        </div>
    </section>
</template>

<script>
import ProductAddEditModal from "../../components/modals/ProductAddEditModal";

export default {
        name: 'Product',
        components: {
            ProductAddEditModal
        },
        data(){
            return {
                products: {},
                selectedForEdit: {},
                updateModal: false,
                countResetModal: 1,
                loader: false,
                descriptionLength: 80,
                pipeline: {
                    search: '',
                    filter: ''
                },
                paginationMeta: {
                    last_page: 1,
                    current_page: 1
                }
            }
        },

        mounted() {
            this.getProducts();
        },

        methods: {
            handleResetModal() {
                this.countResetModal++
            },

            handleCreateButtonClick() {
                this.updateModal = false
                this.handleResetModal()
            },

            handleEditButtonClick(data) {
                this.selectedForEdit = data
                this.updateModal = true
                this.handleResetModal()
            },

            handleProductUpdate(updatedData) {
                this.products.map(product => {
                    if (product.id === updatedData.id) {
                        Object.keys(product).forEach(key => {
                            product[key] = updatedData[key]
                        })
                    }
                })
            },

            getProducts(){
                this.loader = true

                this.$store.dispatch('product/getProducts', {
                    paginationMeta: this.paginationMeta,
                    pipeline: this.pipeline
                })
                    .then(res => {
                        this.loader = false
                        this.products = res.data.products.data
                        delete res.data.products.data
                        this.paginationMeta = res.data.products
                    })
                    .catch(err => {
                        this.loader = false
                    })
            },

            deleteProduct(product) {
                this.$showConfirmMessage().then(result => {
                    if (result.value) {
                        this.$store.dispatch('product/deleteProduct', {
                            id: product.id
                        })
                            .then(res => {
                                this.getProducts()
                                // this.products.splice(this.products.indexOf(product), 1)
                                this.$successToast('Product has been deleted Successful!');
                            })
                            .catch(err => {
                                //
                            })
                    }
                })
            },

            changeStatus(product) {
                this.$store.dispatch('product/changeStatus', {
                    inputs: product
                })
                    .then(res => {
                        this.$successToast('Product status has been changed Successful!')
                    })
                    .catch(err => {
                        this.$errorToast(err.response.data.message)
                    })
            },

            handlePipeline(e) {
                this.pipeline.filter = e.target.value
                this.getProducts()
            },

            handlePagination(page) {
                this.paginationMeta.current_page = page
                this.getProducts()
            }
        }
    }
</script>
