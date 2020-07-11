import moment from 'moment'
import Vue from "vue";

Vue.prototype.$moment = moment;

Vue.prototype.$dateFormat = function (date, format= 'DD-MM-YYYY') {
    return moment(parseInt(date)).format(format)
}
