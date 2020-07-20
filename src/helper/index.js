import moment from 'moment'
import lodash from 'lodash'
import Vue from "vue";

Vue.prototype.$resetPasswordUrl = process.env.VUE_APP_URL+'/password/reset'
Vue.prototype.$moment = moment;
Vue.prototype.$_ = lodash;

Vue.prototype.$dateFormat = function (date, format= 'DD-MM-YYYY') {
    return moment(parseInt(date)).format(format)
}

Vue.prototype.$successToast = function (title) {
    return toast.fire({
        icon: 'success',
        title: title
    })
}

Vue.prototype.$errorToast = function (title) {
    return toast.fire({
        icon: 'error',
        title: title
    })
}

Vue.prototype.$showConfirmMessage = function () {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
}
