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
                        <div class="body table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th style="width: 35%">DESCRIPTION</th>
                                        <th class="text-center">PRICE</th>
                                        <th class="text-center">IMAGE</th>
                                        <th class="text-center">CREATED AT</th>
                                        <th class="text-center">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, key) in products">
                                        <td>{{ product.name }}</td>
                                        <td>
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
                                        
                                        <td class="text-center">{{ product.price }} TK</td>
                                        
                                        <td class="text-center">
                                            <img v-if="product.image" :src="product.image_url" height="60px" width="60px" alt="image not found">
                                        </td>
                                        <td class="text-center">{{ $dateFormat(product.created_at) }}</td>
                                        
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
                        </div>
                    </div>
                </div>
                
                <product-add-edit-modal
                    :count-reset-modal.sync="countResetModal"
                    :edit-data="selectedForEdit"
                    :update-modal="updateModal"
                    @modalClose="getProducts"
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
                descriptionLength: 80
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
            
            getProducts(){
                this.loader = true
                
                this.$store.dispatch('product/getProducts')
                    .then(res => {
                        this.loader = false
                        this.products = res.data.products
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
                                this.$successToast('Product has been deleted Successful!');
                            })
                            .catch(err => {
                                //
                            })
                    }
                })
            }
        }
    }
</script>
