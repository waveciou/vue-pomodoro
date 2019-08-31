import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        countdownList: [
            {
                name: '第一件待辦事項是做一個蕃茄鐘',
                id: 0,
                level: 0,
                levelMax: 5,
            },
            // {
            //     name: '第二件待辦事項再做一個蕃茄鐘',
            //     id: 1,
            //     level: 1,
            //     levelMax: 5,
            // },
            // {
            //     name: '第三件待辦事項再做一個蕃茄鐘',
            //     id: 2,
            //     level: 2,
            //     levelMax: 5,
            // },
            // {
            //     name: '第四件待辦事項再做一個蕃茄鐘',
            //     id: 3,
            //     level: 4,
            //     levelMax: 5,
            // },
            // {
            //     name: '第五件待辦事項再做一個蕃茄鐘',
            //     id: 4,
            //     level: 5,
            //     levelMax: 5,
            // },
        ],
        ringtoneList: [
            {
                name: 'Defult',
                url: ''
            },
            {
                name: 'Sea',
                url: ''
            },
            {
                name: 'Flute',
                url: ''
            },
            {
                name: 'Digital',
                url: ''
            },
            {
                name: 'Bird',
                url: ''
            },
            {
                name: 'Ring',
                url: ''
            },
            {
                name: 'Horn',
                url: ''
            },
            {
                name: 'Shout',
                url: ''
            },
            {
                name: 'Dog',
                url: ''
            },
            {
                name: 'Bell',
                url: ''
            },
            {
                name: 'Drum',
                url: ''
            },
            {
                name: 'Music',
                url: ''
            },
            {
                name: 'Duck',
                url: ''
            },
            {
                name: 'Alarm',
                url: ''
            },
            {
                name: 'Knock',
                url: ''
            },
            {
                name: 'Swing',
                url: ''
            },
        ]
    },
    actions: {
        pushCountdownTimer(context, item) {
            context.commit('PUSHITEM', item);
        }
    },
    mutations: {
        PUSHITEM(state, item) {
            state.countdownList.push(item);
        }
    }
});