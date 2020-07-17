import moment from 'moment'
import lodash from 'lodash'
import Vue from "vue";

Vue.prototype.$resetPasswordUrl = process.env.VUE_APP_URL+'/password/reset'
Vue.prototype.$moment = moment;
Vue.prototype.$_ = lodash;

Vue.prototype.$dateFormat = function (date, format= 'DD-MM-YYYY') {
    return moment(parseInt(date)).format(format)
}
