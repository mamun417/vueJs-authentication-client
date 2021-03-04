<template>
    <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="defaultModalLabel">
                        {{ updateModal ? 'Update ' + formData.name : 'Create' }} product
                    </h4>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="form-group">
                            <div class="form-line">
                                <input type="text" class="form-control"
                                   v-model="formData.name" autofocus
                                   @input="formErrors.name = ''"
                                   placeholder="Name">
                            </div>
                            <label v-if="formErrors.name" class="error">{{ formErrors.name }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <textarea class="form-control" id="InputExperience"
                                    v-model="formData.description"
                                    @input="formErrors.description = ''"
                                    rows="3" placeholder="Description"
                                >
                                </textarea>
                            </div>
                            <label v-if="formErrors.description" class="error">{{ formErrors.description }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input type="text" class="form-control"
                                   v-model="formData.price" autofocus
                                   @input="formErrors.price = ''"
                                   placeholder="Price">
                            </div>
                            <label v-if="formErrors.price" class="error">{{ formErrors.price }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input @change="onLoadProfileImage" type="file" ref="image" class="form-control">
                            </div>
                            <label v-if="formErrors.image" class="error">
                                {{ formErrors.image }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
                    <button @click="updateModal ? updateProduct() : addProduct()" type="button"
                        class="btn btn-success waves-effect">
                        {{ updateModal ? 'Update' : 'Submit' }}
                    </button>
                </div>

                <loader v-if="loader"/>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product-Add-Edit-Modal',
    props: {
        editData: {
            type: Object,
            default: () => ({})
        },
        updateModal: {
            type: Boolean,
            default: false
        },
        countResetModal: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {
            formData: {},
            formErrors: {},
            image: '',
            loader: false
        }
    },

    methods: {
        onLoadProfileImage(e) {
            this.formErrors.image = ''
            this.image = e.target.files[0];
        },

        resetModal() {
            this.formData = {}
            this.formErrors = {}
            this.image = ''

            if (this.$refs.image){
                this.$refs.image.value = ''
            }
        },

        addProduct() {
            this.loader = true

            this.$store.dispatch('product/createProduct', {
                inputs: this.appendImage()
            })
                .then(res => {
                    this.loader = false

                    this.$successToast('Product has been created Successful!')

                    $('#defaultModal').modal('hide')

                    this.$emit('addProduct')

                    this.resetModal()
                })
                .catch(err => {
                    this.handleError(err)
                })
        },

        updateProduct() {

            this.loader = true

            this.$store.dispatch('product/updateProduct', {
                inputs: this.appendImage(false)
            })
                .then(res => {
                    this.loader = false

                    this.$successToast('Product has been updated Successful!')

                    $('#defaultModal').modal('hide')

                    this.$emit('updateProduct', res.data.product)

                    this.resetModal()
                })
                .catch(err => {
                    this.handleError(err)
                })
        },

        appendImage(postMethod = true) {
            let fd = new FormData()

            if (!postMethod) {
                fd.append('_method', 'put')
            }

            fd.append('image', this.image)

            for (let key in this.formData) {
                fd.append(key, this.formData[key]);
            }

            return fd
        },

        handleError(err) {
            this.loader = false

            if (err.response.data.errors) {
                this.formErrors = err.response.data.errors
            } else {
                this.$errorToast(err.response.data.message)
            }
        }
    },

    watch: {
        countResetModal: {
            handler() {
                this.resetModal()

                if (this.updateModal) {
                    let tempData = this.$_.cloneDeep(this.editData)

                    Object.keys(tempData).forEach(key => {
                        if (tempData[key]){
                            this.formData[key] = tempData[key]
                        }
                    })

                    delete this.formData.image

                    // let tempFormData = this.$_.cloneDeep(this.editData)
                    // this.$set(this.formData, 'id', tempFormData.id);
                    // this.$set(this.formData, 'name', tempFormData.name);
                    // this.$set(this.formData, 'description', tempFormData.description);
                    // this.$set(this.formData, 'price', tempFormData.price);
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
