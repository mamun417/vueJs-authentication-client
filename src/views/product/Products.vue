<template>
    <section class="content">
        <vue-headful
            title="USERS | VUE-AUTH"
        />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <button @click="handleCreateButtonClick" type="button"
                                    data-toggle="modal" data-target="#defaultModal"
                                    class="btn btn-sm btn-success waves-effect pull-right"
                                    style="top: -8px">
                                <i class="material-icons">add</i><span>CREATE</span>
                            </button>
                            <h2>Users</h2>
                        </div>

                        <product-list
                            ref="userList"
                            @editButtonClick="handleEditButtonClick"
                        />

                        <product-add-edit-modal
                            :count-reset-modal="countResetModal"
                            :edit-data="selectedForEdit"
                            :update-modal="updateModal"
                            @addProduct="handleAddProduct"
                            @updateProduct="handleProductUpdate"
                        />

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductList from "@/views/product/ProductList";
import ProductAddEditModal from "@/components/modals/ProductAddEditModal";

export default {
    name: 'Product',
    components: {
        ProductAddEditModal,
        ProductList
    },

    data() {
        return {
            countResetModal: 1,
            updateModal: false,
            selectedForEdit: {},
        }
    },

    methods: {
        handleResetModal() {
            this.countResetModal++
        },

        handleCreateButtonClick() {
            this.updateModal = false
            this.handleResetModal()
        },

        handleAddProduct() {
            this.$refs.productList.getProducts();
        },

        handleEditButtonClick(data) {
            this.updateModal = true
            this.handleResetModal()
            this.selectedForEdit = data
        },

        handleProductUpdate(updatedData) {
            this.$refs.productList.handleProductUpdate(updatedData)
        }
    }
}
</script>
