<template>
    <div>
        <loader v-if="loader"/>

        <div v-if="users.length" class="body table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>CREATED AT</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user, key) in users">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td class="text-center">{{ $dateFormat(user.created_at) }}</td>

                    <td class="text-center">
                        <button @click="handleEditButtonClick(user)"
                                data-toggle="modal" data-target="#defaultModal"
                                type="button" class="btn btn-xs btn-primary waves-effect m-r-5">
                            <i class="material-icons">edit</i><span>EDIT</span>
                        </button>
                        <button @click="deleteUser(user.id)" type="button"
                                class="btn btn-xs btn-danger waves-effect">
                            <i class="material-icons">delete</i><span>DELETE</span>
                        </button>
                    </td>

                </tr>
                </tbody>
            </table>

            <div style="display: flex;align-items: center">
                <div class="m-r-30">
                    <!--Showing {{ paginationMeta.from }} to {{ paginationMeta.to }} of {{ paginationMeta.total }} entries-->
                </div>

                <pagination
                    :pagination-meta="paginationMeta"
                    @handlePagination="handlePagination"
                />
            </div>
        </div>

        <div v-else class="text-center p-b-25 m-t-20">No users found</div>
    </div>
</template>

<script>
export default {
    name: 'UserList',
    props: {
        //
    },

    data() {
        return {
            loader: false,
            users: {},
            paginationMeta: {
                last_page: 1,
                current_page: 1
            }
        }
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        getUsers() {
            this.loader = true

            this.$store.dispatch('user/getUsers', {
                paginationMeta: this.paginationMeta
            })
                .then(res => {
                    this.loader = false
                    this.users = res.data.users.data
                    delete res.data.users.data
                    this.paginationMeta = res.data.users
                })
                .catch(err => {
                    console.error(err)
                    this.loader = false
                })
        },

        deleteUser(id) {
            this.$showConfirmMessage().then(result => {
                if (result.value) {
                    this.$store.dispatch('user/deleteUser', {
                        id: id
                    })
                        .then(res => {
                            this.getUsers()
                            this.$successToast('User has been deleted Successful!');
                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
            })
        },

        handleEditButtonClick(data) {
            this.$emit('editButtonClick', data)
        },

        handlePagination(page) {
            this.paginationMeta.current_page = page
            this.getUsers()
        }
    }
}
</script>
