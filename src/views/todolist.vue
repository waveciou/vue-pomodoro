<template>
    <div class="content">
        <h2>THE MISSION TODAY</h2>
        <ul class="countdownList">
            <li v-for="(item, index) in countdownList" :key="index">
                <a href="javascript:;" class="countdownList__item">
                    <div class="countdownList__title">{{ item.name }}</div>
                    <div class="countdownList__level">
                        <span v-for="(star, i) in item.level" :key="i" ></span>
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

        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/_utils.scss';

    .countdownList {
        > li {
            margin: 15px 0px;
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
            border: 2px $color-black solid;
            border-radius: 100%;
            position: absolute;
            left: 0px;
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
            border-radius: 100%;
            background-color: $color-black;
        }
    }
</style>
