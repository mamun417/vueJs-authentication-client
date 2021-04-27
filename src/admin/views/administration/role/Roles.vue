<template>
    <section class="content">
        <vue-headful title="USERS | VUE-AUTH" />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <!--                        <div class="header">-->
                        <!--                            <button @click="handleCreateButtonClick" type="button"-->
                        <!--                                    data-toggle="modal" data-target="#defaultModal"-->
                        <!--                                    class="btn btn-sm btn-success waves-effect pull-right"-->
                        <!--                                    style="top: -8px">-->
                        <!--                                <i class="material-icons">add</i><span>CREATE</span>-->
                        <!--                            </button>-->
                        <!--                            <h2>Users</h2>-->
                        <!--                        </div>-->

                        <!--                        <div class="header m-b&#45;&#45;20" style="border-bottom: none!important;">-->
                        <!--                            <div class="row clearfix">-->
                        <!--                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">-->
                        <!--                                    <div class="form-group form-float">-->
                        <!--                                        <div class="form-line">-->
                        <!--                                            <select @change="handlePipeline({per_page:$event.target.value})"-->
                        <!--                                                    class="form-control show-tick">-->
                        <!--                                                <option :value="n" v-for="n in [2, 5, 10, 20]">{{ n }}</option>-->
                        <!--                                            </select>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->

                        <!--                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">-->
                        <!--                                    <div class="form-group form-float">-->
                        <!--                                        <div class="form-line">-->
                        <!--                                            <input @input="handlePipeline({search:$event.target.value})" type="text"-->
                        <!--                                                   class="form-control" placeholder="Type here...">-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->

                        <!--                                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">-->
                        <!--                                    <button type="button" class="btn btn-info btn-lg m-l-15 waves-effect">-->
                        <!--                                        SEARCH-->
                        <!--                                    </button>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </div>-->

                        <!--                        <user-list-->
                        <!--                            ref="userList"-->
                        <!--                            :pipeline="pipeline"-->
                        <!--                            @editButtonClick="handleEditButtonClick"-->
                        <!--                        />-->

                        <!--                        <user-add-edit-modal-->
                        <!--                            :count-reset-modal="countResetModal"-->
                        <!--                            :edit-data="selectedForEdit"-->
                        <!--                            :update-modal="updateModal"-->
                        <!--                            @addProduct="handleAddProduct"-->
                        <!--                            @updateProduct="handleProductUpdate"-->
                        <!--                        />-->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Roles",
    mounted() {
        console.log("okkk");
    }
};
</script>

<style scoped></style>
