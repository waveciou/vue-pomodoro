<template>
    <div class="content">
        <h2 class="title">THE MISSION TODAY</h2>
        <ul class="countdownList">
            <li>
                <div class="countdownList__item">
                    <div class="countdownList__title">{{ countdownList[0].name }}</div>
                    <div class="countdownList__level">
                        <span v-for="(item, index) in countdownList[0].levelMax" :key="index" :class="{'is-current': index < countdownList[0].level}"></span>
                    </div>
                </div>
            </li>
        </ul>
        <h2 class="title theme-come">UP COMING MISSION</h2>
        <ul class="countdownList theme-come">
            <li v-for="(item, index) in countdownList" :key="index" >
                <a href="javascript:;" class="countdownList__item" @click='sendCurrentIndex(index)'>
                    <div class="countdownList__title">{{ item.name }}</div>
                    <div class="countdownList__level">
                        <span v-for="(star, i) in item.levelMax" :key="i" :class="{'is-current': i < item.level}"></span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
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
        padding-left: 30px;
        line-height: 21px;
        position: relative;

        &::before {
            content: '';
            width: 17px;
            height: 17px;
            display: block;
            border: {
                width: 2px;
                color: $color-black;
                style: solid;
                radius: 100%
            }
            position: absolute;
            left: 0px;
        }

        @at-root .theme-come & {
            color: $color-gray;
            &::before {
                border-color: $color-gray;
            }
        }

        @at-root .theme-come .countdownList__item:hover & {
            color: $color-black;
            &::before {
                border-color: $color-black;
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
</style>
