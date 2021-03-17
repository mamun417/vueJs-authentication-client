<template>
    <div>
        <loader v-if="loader"/>

        <div v-if="!users.length" class="body table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>NAME</th>
                    <th style="width: 20%;" class="text-center">DESCRIPTION</th>
                    <th class="text-center">PRICE</th>
                    <th class="text-center">CREATED AT</th>
                    <th class="text-center">ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(product, key) in users">
                    <td>Oda Crond</td>

                    <td class="text-center">fsdifds</td>

                    <td class="text-center">4878954389543</td>

                    <td class="text-center">4878954389543</td>

                    <td class="text-center">
                        <button @click="handleEditButtonClick(product)"
                            data-toggle="modal" data-target="#defaultModal"
                            type="button" class="btn btn-xs btn-primary waves-effect m-r-5">
                            <i class="material-icons">edit</i><span>EDIT</span>
                        </button>
                        <button @click="deleteProduct(23)" type="button"
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
</template>

<script>
export default {
    name: 'UserList',
    props: {
        pipeline: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            loader: false,
            users: 12,
            descriptionLength: 26,
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
        getProducts() {
            this.loader = true

            this.$store.dispatch('product/getProducts', {
                paginationMeta: this.paginationMeta,
                pipeline: this.pipeline
            })
                .then(res => {
                    this.loader = false
                    this.users = res.data.users.data
                    delete res.data.users.data
                    this.paginationMeta = res.data.users
                })
                .catch(err => {
                    this.loader = false
                })
        },

        handleProductUpdate(updatedData) {
            this.users.map(product => {
                if (product.id === updatedData.id) {
                    Object.keys(product).forEach(key => {
                        product[key] = updatedData[key]
                    })
                }
            })
        },

        deleteProduct(ids) {
            this.$showConfirmMessage().then(result => {
                if (result.value) {
                    this.$store.dispatch('product/deleteProduct', {
                        ids: ids
                    })
                        .then(res => {
                            this.getProducts()
                            this.$successToast('User has been deleted Successful!');
                            this.checkAllProducts()
                        })
                        .catch(err => {
                            //
                        })
                }
            })
        },

        handleEditButtonClick(data) {
            this.$emit('editButtonClick', data)
        },

        handlePagination(page) {
            this.paginationMeta.current_page = page
            this.getProducts()
        }
    }
}
</script>
