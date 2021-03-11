<template>
    <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="defaultModalLabel">
                        {{ updateModal ? 'Update ' : 'Create' }} task
                    </h4>
                </div>
                <div class="modal-body">
                    <div v-if="userInfo.role_id === 1">
                        <div>
                            <div class="form-group">
                                <div class="form-line">
                                    <select class="form-control show-tick"
                                            v-model="formData.user_id"
                                            @change="formErrors.user_id = ''">
                                        <option v-for="user in users" :value="user.id">{{ user.name}}</option>
                                    </select>
                                </div>
                                <label v-if="formErrors.user_id" class="error">{{ formErrors.user_id }}</label>
                            </div>

                            <div class="form-group">
                                <div class="form-line">
                                    <input type="text" class="form-control"
                                           v-model="formData.title" autofocus
                                           @input="formErrors.title = ''"
                                           placeholder="Title">
                                </div>
                                <label v-if="formErrors.title" class="error">{{ formErrors.title }}</label>
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
                                    <input type="date"
                                           class="form-control" id="DueDate"
                                           v-model="formData.due_date"
                                           @input="formErrors.due_date = ''"
                                           placeholder="Due Date"
                                    >
                                </div>
                                <span v-if="updateModal">
                                 {{ $dateFormat(formData.due_date, 'MM/DD/YYYY') }}
                            </span>
                                <label v-if="formErrors.due_date" class="error">{{ formErrors.due_date }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="form-line">
                            <select class="form-control show-tick"
                                    v-model="formData.status"
                                    @change="formErrors.status = ''">
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <label v-if="formErrors.user_id" class="error">{{ formErrors.user_id }}</label>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
                    <button @click="updateModal ? updateTask() : addTask()" type="button"
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
import {mapGetters} from "vuex";

export default {
    name: 'User-Add-Edit-Modal',
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

    computed: {
        ...mapGetters({
            userInfo : 'profile/userInfo'
        })
    },

    data() {
        return {
            users: {},
            formData: {},
            formErrors: {},
            loader: false
        }
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        resetModal() {
            this.formData = {}
            this.formErrors = {}
        },

        addTask() {
            this.loader = true

            this.$store.dispatch('task/addTask', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('Task has been created Successful!')
                    $('#defaultModal').modal('hide')
                    this.$emit('addTask')
                })
                .catch(err => {
                    this.handleError(err)
                })
        },

        updateTask() {
            this.loader = true

            this.$store.dispatch('task/updateTask', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('Task has been updated Successful!')
                    $('#defaultModal').modal('hide')
                    this.$emit('updateTask')
                })
                .catch(err => {
                    this.handleError(err)
                })
        },

        handleError(err) {
            this.loader = false

            if (err.response.data.errors) {
                this.formErrors = err.response.data.errors
            } else {
                this.$errorToast(err.response.data.message)
            }
        },

        getUsers() {
            this.loader = true

            this.$store.dispatch('task/getUsers')
                .then(res => {
                    this.loader = false
                    console.log(res.data)
                    this.users = res.data.users
                })
                .catch(err => {
                    console.error(err)
                    this.loader = false
                })
        },
    },

    watch: {
        countResetModal: {
            handler() {
                this.resetModal()

                if (this.updateModal) {
                    let tempData = this.$_.cloneDeep(this.editData)

                    console.log(this.editData)

                    Object.keys(tempData).forEach(key => {
                        if (tempData[key]) {
                            this.formData[key] = tempData[key]
                        }
                    })
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
