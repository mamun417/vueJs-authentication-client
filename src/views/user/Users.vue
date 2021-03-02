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

                        <user-list
                            ref="userList"
                            @editButtonClick="handleEditButtonClick"
                        />

                        <user-add-edit-modal
                            :count-reset-modal="countResetModal"
                            :edit-data="selectedForEdit"
                            :update-modal="updateModal"
                            @addUser="loadUsers"
                            @updateUser="loadUsers"
                        />

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import UserList from "@/views/user/UserList";
import UserAddEditModal from "@/components/modals/UserAddEditModal";

export default {
    name: 'User',
    components: {
        UserAddEditModal,
        UserList
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

        loadUsers() {
            this.$refs.userList.getUsers();
        },

        handleEditButtonClick(data) {
            this.updateModal = true
            this.handleResetModal()
            this.selectedForEdit = data
        }
    }
}
</script>
