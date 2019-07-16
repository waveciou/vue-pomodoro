<template>
    <div class="container">
        <h2 class="title">RINGTONE</h2>
        <ul class="ringtoneList">
            <li v-for="(item, index) in ringtoneList" :key="index">
                <div class="radio-item">
                    <input :id="'ringtone-'+index" type="radio" v-model="ringtoneSelected" name="ringtone" :value="item.name" @change="checkedRingTone">
                    <label :for="'ringtone-'+index">
                        <i class="material-icons side-checked" v-if="item.name === ringtoneSelected">lens</i>
                        <i class="material-icons" v-else>panorama_fish_eye</i>{{item.name}}</label>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ringtoneSelected: 'Defult',
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
            }
        },
        name: 'ringtone',
        mounted() {
            this.checkedRingTone();
        },
        methods: {
            checkedRingTone() {
                let data = this.ringtoneList.filter((item)=>{
                    return item.name === this.ringtoneSelected
                });
                this.$emit('setRingtone', data[0]);
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/_utils.scss';

    .ringtoneList {
        display: flex;
        flex-wrap: wrap;
        > li {
            min-width: 25%;
        }
    }

    .radio-item {
        padding: 10px 0px;

        input[type="radio"] {
            width: 0px;
            height: 0px;
            position: absolute;
            z-index: -9999;
            opacity: 0;
        }

        label {
            display: block;
            line-height: 24px;

            .material-icons {
                display: inline-block;
                vertical-align: top;
                margin-right: 5px;
            }

            .side-checked {
                color: $color-orange;
                @at-root .theme-green & {
                    color: $color-green;
                }
            }
        }
    }
</style>