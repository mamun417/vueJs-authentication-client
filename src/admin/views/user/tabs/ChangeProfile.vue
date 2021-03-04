<template>
    <div role="tabpanel" class="tab-pane fade in active" id="profile_settings">

        <loader v-if="loader"/>

        <div class="form-horizontal">
            <div class="form-group">
                <label for="NameSurname" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="NameSurname"
                               name="NameSurname" placeholder="Name Surname"
                               v-model="formData.name"
                               @input="formErrors.name = ''"
                        >
                    </div>
                    <label v-if="formErrors.name" class="error">
                        {{ formErrors.name }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="Email" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="Email"
                               placeholder="Email"
                               v-model="formData.email"
                               @input="formErrors.email = ''"
                        >
                    </div>
                    <label v-if="formErrors.email" class="error">
                        {{ formErrors.email }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="InputExperience" class="col-sm-2 control-label">Address</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <textarea class="form-control" id="InputExperience"
                                  rows="3" placeholder="Address"
                                  v-model="formData.address"
                                  @input="formErrors.address = ''"
                        >
                        </textarea>
                    </div>
                    <label v-if="formErrors.address" class="error">
                        {{ formErrors.address }}
                    </label>
                </div>
            </div>

            <v-select
                :loading="skillLoader"
                multiple
                v-model="formData.skills"
                :options="skillList"
                @search="getSkillsList"
            >
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                        No results found for <em>{{ search }}</em>.
                    </template>
                    <em style="opacity: 0.5;" v-else>Start typing to search for a skill.</em>
                </template>
            </v-select>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button @click="changeProfile" class="btn btn-success">SUBMIT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Change-Profile',
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            skillList: [],
            loader: false,
            skillLoader: false,
            formData: {
                name: '',
                email: '',
                address: '',
                skills: []
            },
            formErrors: {}
        }
    },

    methods: {
        getSkillsList(val) {
            this.skillLoader = true

            this.$store.dispatch('user/getSkillList', {
                inputs: {keyword: val}
            })
                .then(res => {
                    let tempSkillList = res.data

                    this.formData.skills.filter(skill => {
                        tempSkillList.forEach((item, key) => {
                            if (skill.code === item.code) {
                                tempSkillList.splice(key, 1);
                            }
                        })
                    })

                    let self = this

                    setTimeout(function (){
                        self.skillList = tempSkillList
                        self.skillLoader = false
                    }, 200)
                })
                .catch(err => {
                    //
                })
        },

        changeProfile() {
            this.loader = true

            this.$store.dispatch('user/changeProfile', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('Profile has been changed Successful!')
                })
                .catch(err => {
                    this.loader = false

                    if (err.response.data.errors) {
                        this.formErrors = err.response.data.errors
                    } else {
                        this.$errorToast(err.response.data.message)
                    }
                })
        }
    },

    watch: {
        userInfo: {
            handler() {
                Object.keys(this.formData).forEach(field => {
                    this.formData[field] = this.userInfo[field]
                })
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
