<template>
    <div class="container">
        <div class="content">
            <h2 class="title">THE MISSION TODAY</h2>
            <div class="countdownList__item">
                <div class="countdownList__title"><i
                        class="material-icons">panorama_fish_eye</i>{{ countdownList[0].name }}</div>
                <div class="countdownList__level">
                    <span v-for="(item, index) in countdownList[0].levelMax" :key="index"
                        :class="{'is-current': index < countdownList[0].level}"></span>
                </div>
            </div>
            <h2 class="title theme-come">UP COMING MISSION</h2>
            <ul class="countdownList theme-come">
                <li v-for="(item, index) in countdownList" :key="index">
                    <a href="javascript:;" class="countdownList__item" @click='sendCurrentIndex(index)'>
                        <div class="countdownList__title"><i class="material-icons">panorama_fish_eye</i>{{ item.name }}
                        </div>
                        <div class="countdownList__level">
                            <span v-for="(star, i) in item.levelMax" :key="i"
                                :class="{'is-current': i < item.level}"></span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="input-ctrl">
            <div class="fieldset">
                <i class="material-icons">control_point</i>
                <input type="text" class="input" placeholder="ADD ITEM" v-model.trim="todoTiem.name">
            </div>
            <button type="button" class="material-icons" @click="addTodoItem()">add</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todoTiem: {
                    name: ''
                }
            }
        },
        name: 'todolist',
        props: ['countdownList'],
        created() {
            document.title = this.$route.meta.title;
        },
        mounted() {

        },
        methods: {
            sendCurrentIndex(index) {
                this.$emit('getCurrentIndex', index);
            },
            addTodoItem() {
                if(this.todoTiem.name === '') {
                    return false
                } else {
                    this.$emit('addTodoList', this.todoTiem.name);
                    this.todoTiem.name = '';
                }
            }
        },
        computed: {
            getMissionList() {
                let newList = []
                newList.push(this.countdownList[0]);
                return newList;
            },
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/_utils.scss';

    .countdownList {
        > li {
            margin: 15px 0px;
        }

        &.theme-come {
            > li:first-child {
                display: none;
                visibility: hidden;
            }
        }
    }

    .countdownList__item {
        display: block;
    }

    .countdownList__title {
        margin: 10px 0px;
        line-height: 24px;
        position: relative;

        .material-icons {
            display: inline-block;
            vertical-align: top;
            margin-right: 5px;
        }

        @at-root .theme-come & {
            color: $color-gray;
            .material-icons {
                color: $color-gray;
            }
        }

        @at-root .theme-come .countdownList__item:hover & {
            color: $color-black;
            .material-icons {
                color: $color-black;
            }
        }
    }

    .countdownList__level {
        width: 100%;
        display: flex;
        padding-left: 30px;

        > span {
            width: 12px;
            height: 12px;
            display: block;
            margin-right: 7.5px;
            background-color: $color-white;
            border: {
                width: 1px;
                color: $color-black;
                style: solid;
                radius: 100%
            }

            &.is-current {
                background-color: $color-black;
            }

            @at-root .theme-come & {
                border-color: $color-gray;
                &.is-current {
                    background-color: $color-gray;
                }
            }

            @at-root .theme-come .countdownList__item:hover & {
                border-color: $color-black;
                &.is-current {
                    background-color: $color-black;
                }
            }
        }
    }

    .input-ctrl {
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        padding-bottom: 15px;
        color: $color-orange;

        .material-icons {
            color: $color-orange;
            margin-right: 5px;
        }

        button {
            margin: 0px;
            padding: 0px;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
        }

        @at-root .theme-green & {
            color: $color-green;
            .material-icons {
                color: $color-green;
            }
        }
    }

    .fieldset {
        flex-grow: 1;
        .input {
            width: 150px;
            height: 24px;
            display: inline-block;
            vertical-align: top;
            line-height: 24px;
            margin: 0px;
            padding: 0px;
            border: none;
            outline: none;
            font-size: 18px;
            color: $color-orange;

            &::placeholder {
                color: $color-orange;
            }

            @at-root .theme-green & {
                color: $color-green;
                &::placeholder {
                    color: $color-green;
                }
            }
        }
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .content {
        flex-grow: 1;
    }
</style>
