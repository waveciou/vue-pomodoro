<template>
    <div class="container">
        <div class="content">
            <h2 class="title">THE MISSION TODAY</h2>
            <div class="countdownList__item">
                <div class="countdownList__title">
                    <i class="material-icons">panorama_fish_eye</i>{{ countdownTimer.name }}</div>
                <div class="countdownList__level">
                    <span v-for="(item, index) in countdownTimer.levelMax" :key="index"
                        :class="{'is-current': index < countdownTimer.level}"></span>
                </div>
            </div>
            <h2 class="title theme-come" v-if="filterValidList.length > 0">UP COMING MISSION</h2>
            <ul class="countdownList theme-come">
                <li v-for="(item, index) in filterValidList" :key="index">
                    <a href="javascript:;" class="countdownList__item" @click='selectCurrentItem(item.id)'>
                        <div class="countdownList__title"><i class="material-icons">panorama_fish_eye</i>{{ item.name }}
                        </div>
                        <div class="countdownList__level">
                            <span v-for="(star, i) in item.levelMax" :key="i"
                                :class="{'is-current': i < item.level}"></span>
                        </div>
                    </a>
                </li>
            </ul>
            <h2 class="title" v-if="filterFinishList.length > 0">DONE</h2>
            <ul class="countdownList theme-finish">
                <li v-for="(item, index) in filterFinishList" :key="index">
                    <div class="countdownList__item">
                        <div class="countdownList__title"><i class="material-icons">lens</i>{{ item.name }}
                        </div>
                        <div class="countdownList__level">
                            <span v-for="(star, i) in item.levelMax" :key="i"
                                :class="{'is-current': i < item.level}"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="input-ctrl">
            <div class="fieldset">
                <i class="material-icons">control_point</i>
                <input type="text" class="input" placeholder="ADD ITEM" v-model.trim="todoItem.name">
            </div>
            <button type="button" class="material-icons" @click="addTodoItem()">add</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todoItem: {
                    name: ''
                }
            }
        },
        name: 'todolist',
        props: ['countdownTimer', 'currentList'],
        created() {
            document.title = this.$route.meta.title;
        },
        methods: {
            selectCurrentItem(key) {
                this.$emit('updateCurrentItem', key);
            },
            addTodoItem() {
                if(this.todoItem.name === '') {
                    return false
                } else {
                    this.$emit('addTodoList', this.todoItem.name);
                    this.todoItem.name = '';
                }
            }
        },
        computed: {
            filterValidList() {
                let newList = this.$store.state.countdownList.filter((item)=>{
                    return item.level < item.levelMax && item.id !== this.currentList;
                });
                return newList
            },
            filterFinishList() {
                let newList = this.$store.state.countdownList.filter((item)=>{
                    return item.level >= item.levelMax && item.id !== this.currentList;
                });
                return newList
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/_utils.scss';

    .countdownList {
        > li {
            margin: 15px 0px;
            &.is-hide {
                display: none;
                visibility: hidden;
            }
        }
    }

    .countdownList__item {
        display: block;

        @at-root .theme-finish & {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
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

        @at-root .theme-finish & {
            color: $color-orange;
            .material-icons {
                color: $color-orange;
            }
        }

        @at-root .theme-green .theme-finish & {
            color: $color-green;
            .material-icons {
                color: $color-green;
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

            @at-root .theme-finish & {
                &.is-current {
                    background-color: $color-orange;
                    border-color: $color-orange;
                }
            }

            @at-root .theme-green .theme-finish & {
                &.is-current {
                    background-color: $color-green;
                    border-color: $color-green;
                }
            }
        }

        @at-root .theme-finish & {
            width: auto;
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

            &:focus {
                box-shadow: 0 0 0 0.2rem rgba($color-orange,0.6);
            }

            @at-root .theme-green & {
                color: $color-green;
                &::placeholder {
                    color: $color-green;
                }

                &:focus {
                    box-shadow: 0 0 0 0.2rem rgba($color-green,0.6);
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
