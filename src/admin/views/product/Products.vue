<template>
    <section class="content">
        <vue-headful title="PRODUCTS | VUE-AUTH" />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <button
                                v-if="$can('create-product')"
                                @click="handleCreateButtonClick"
                                type="button"
                                data-toggle="modal"
                                data-target="#defaultModal"
                                class="btn btn-sm btn-success waves-effect pull-right"
                                style="top: -8px"
                            >
                                <i class="material-icons">add</i><span>CREATE</span>
                            </button>
                            <h2>Products</h2>
                        </div>

                        <div class="header m-b--20" style="border-bottom: none !important">
                            <div class="row clearfix">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select
                                                @change="
                                                    handlePipeline({
                                                        per_page: $event.target.value
                                                    })
                                                "
                                                class="form-control show-tick"
                                            >
                                                <option :value="n" v-for="n in [2, 5, 10, 20]">{{ n }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input
                                                @input="
                                                    handlePipeline({
                                                        search: $event.target.value
                                                    })
                                                "
                                                type="text"
                                                class="form-control"
                                                placeholder="Type here..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select
                                                @change="
                                                    handlePipeline({
                                                        filter: $event.target.value
                                                    })
                                                "
                                                class="form-control show-tick"
                                            >
                                                <option :selected="handleFilterSelect('')" value="">All</option>
                                                <option :selected="handleFilterSelect('active')" value="active">
                                                    Active
                                                </option>
                                                <option :selected="handleFilterSelect('inactive')" value="inactive">
                                                    Inactive
                                                </option>
                                            </select>
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

                        <product-list ref="productList" :pipeline="pipeline" @editButtonClick="handleEditButtonClick" />

                        <!--<pre>{{ profileInfo }}</pre>
                        <pre>{{ productCountInfo }}</pre>-->

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
import ProductList from "@/admin/views/product/ProductList";
import ProductAddEditModal from "../../components/modals/UserAddEditModal";

export default {
    name: "Product",
    components: {
        ProductAddEditModal,
        ProductList
    },

    data() {
        return {
            countResetModal: 1,
            updateModal: false,
            selectedForEdit: {},
            pipeline: {
                per_page: "",
                search: "",
                filter: ""
            },

            profileInfo: {},
            productCountInfo: {}
        };
    },

    mounted() {
        // this.$store.dispatch("user/getProfile").then((res) => {
        //     this.profileInfo = res.data.user;
        // });
        //
        // this.$store.dispatch("product/getProductsCountInfo").then((res) => {
        //     this.productCountInfo = res.data.count_info;
        // });

        if (this.$route.params.pipeline) {
            this.handlePipeline(this.$route.params.pipeline);
        }
    },

    methods: {
        handleResetModal() {
            this.countResetModal++;
        },

        handleCreateButtonClick() {
            this.updateModal = false;
            this.handleResetModal();
        },

        handleAddProduct() {
            this.$refs.productList.getProducts();
        },

        handleEditButtonClick(data) {
            this.updateModal = true;
            this.handleResetModal();
            this.selectedForEdit = data;
        },

        handleProductUpdate(updatedData) {
            this.$refs.productList.handleProductUpdate(updatedData);
        },

        handlePipeline(pipeline) {
            Object.keys(this.pipeline).forEach((key) => {
                if (pipeline.hasOwnProperty(key)) {
                    this.pipeline[key] = pipeline[key];
                }
            });

            this.$refs.productList.getProducts();
        },

        handleFilterSelect(value) {
            return this.pipeline.filter === value;
        }
    }
};
</script>
