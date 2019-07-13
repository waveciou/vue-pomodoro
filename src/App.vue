<template>
  <div id="app">
    <div class="wrapper" :class="{'theme-green': this.statusBreak === true}">
      <div class="views-zone">
        <div class="pomodoro">

          <!-- <svg id="svg" width="100%" height="100%" viewPort="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
                <stop offset="0%" stop-color="#FF7352" />
                <stop offset="35%" stop-color="#FF7352" />
                <stop offset="65%" stop-color="#42C67C" />
                <stop offset="100%" stop-color="#42C67C" />
              </linearGradient>
            <circle id="bar" :r="this.circle.radius" cx="330" cy="330" fill="transparent" style="stroke:url(#gradient)" stroke-dasharray="958.18" stroke-dashoffset="0" @transitionend="circleTransitionEnd()" :class="{'is-animate': this.circle.isAnimate === true}"></circle>
          </svg> -->

          <div class="pomodoro__circleBox">
            <div class="pomodoro__circle" @transitionend="circleTransitionEnd()"></div>
          </div>

          <div class="pomodoro__content">
            <div class="pomodoro__caption">
              <div class="pomodoro__time"><span class="min">{{getMinuteText}}</span>:<span class="sec">{{getSecondText}}</span></div>
              <div class="pomodoro__controlBar">
                <a href="javascript:;" class="pomodoro__mainButton" @click.stop="playCountdownTimer()" :class="{'is-pause': this.countdownTimer.isActive === true}">
                  <span v-if="this.countdownTimer.isActive === false">START</span>
                  <span v-else>PAUSE</span>
                </a>
                <a href="javascript:;" class="pomodoro__clearButton" @click.stop="clearCountdownTimer()">
                  <i class="material-icons">close</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="control-zone">
        <div class="wrap">
          <transition name="fade" mode="out-in">
            <router-view :countdownList="countdownList" @getCurrentIndex="repleaceCountdownTimer" @addTodoList="pushCountdownTimer" />
          </transition>
        </div>
      </div>
      <div class="footer-zone">
        <div class="wrap-full">
          <div class="logo">POMODORO</div>
          <div id="menu">
            <router-link to="/ringtone" class="menu-btn">
              <i class="material-icons">audiotrack</i>
            </router-link>
            <router-link to="/analytics" class="menu-btn">
              <i class="material-icons">bar_chart</i>
            </router-link>
            <router-link to="/" class="menu-btn">
              <i class="material-icons">list_alt</i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import todolist from './views/todolist.vue';
  import analytics from './views/analytics.vue';
  import ringtone from './views/ringtone.vue';
  import { setTimeout } from 'timers';

  export default {
    data() {
      return {
        countdownTimer: {
          name: '',
          level: 0,
          levelMax: 0,
          isActive: false,
          time: 0,
          timer: null,
        },
        countdownList: [
          {
            name: '第一件待辦事項是做一個蕃茄鐘',
            level: 0,
            levelMax: 5,
          },
          {
            name: '第二件待辦事項再做一個蕃茄鐘',
            level: 3,
            levelMax: 5,
          },
          {
            name: '第三件待辦事項再做一個蕃茄鐘',
            level: 1,
            levelMax: 5,
          },
        ],
        circle: {
          dom: null,
          box: null,
          radius: 305,
        },
        statusBreak: false,
        isFinish: true,
      }
    },
    components: {
      'todolist': todolist,
      'analytics': analytics,
      'ringtone': ringtone
    },
    created() {

    },
    mounted() {
      this.circle.dom = document.querySelector('.pomodoro__circle');
      this.circle.box = document.querySelector('.pomodoro__circleBox');

      this.updateCountdownTimer();
    },
    methods: {
      circleTransitionEnd() {
        if(this.isFinish === true) {
          this.countdownTimer.level += 1;
          if(this.countdownTimer.level >= this.countdownTimer.levelMax) {
            this.countdownTimer.level = this.countdownTimer.levelMax;
          }
          this.countdownList[0].level = this.countdownTimer.level;
          this.clearCountdownTimer();
          this.isFinish = false;
        }
      },
      getLevelData(level) {
        let obj = {};

        if(level % 2 === 0) {
          obj.totleTime = 60;
          obj.status = false;
        } else {
          obj.totleTime = 30;
          obj.status = true;
        }

        return obj;
      },
      playCountdownTimer() {
        this.countdownTimer.isActive = !this.countdownTimer.isActive;
        this.setCountdownTimer();
      },
      setCountdownTimer() {
        if(this.countdownTimer.isActive === true) {
          let data = this.getLevelData(this.countdownTimer.level);
          let sum = data.totleTime;
          this.isFinish = false;

          this.circle.box.style.opacity = 1;

          this.countdownTimer.timer = setInterval(() => {
            this.countdownTimer.time --;
            
            let percent = Math.floor(this.countdownTimer.time / sum * 100);
            if (percent < 0) percent = 0;
            if (percent > 100) percent = 100;

            // let c = Math.PI * (this.circle.radius * 2);
            // let pct = ((100 - percent) / 100 * c)/-2;

            // this.circle.dom.style.strokeDashoffset = pct;

            let deg = (100 - percent) * 1.8;
            this.circle.dom.style.transform = `rotateZ(${deg}deg)`;

            if(this.countdownTimer.time <= 0) {
              this.isFinish = true;
            }

          }, 1000);

        } else {
          this.countdownTimer.isActive = false;
          clearInterval(this.countdownTimer.timer);
          return false
        }
      },
      clearCountdownTimer() {
        this.isFinish = false;
        this.countdownTimer.isActive = false;

        clearInterval(this.countdownTimer.timer);

        let data = this.getLevelData(this.countdownTimer.level);
        this.statusBreak = data.status;
        this.countdownTimer.time = data.totleTime;

        this.circle.dom.style.opacity = 0;
        this.circle.box.style.opacity = 0;

        // this.circle.dom.style.strokeDashoffset = 0;
        this.circle.dom.style.transform = `rotateZ(0deg)`;

        setTimeout(()=> {
          this.circle.dom.style.opacity = 1;
        }, 1000);
      },
      repleaceCountdownTimer(val) {
        this.clearCountdownTimer();
        let targetCountdown = this.countdownList[val];
        this.countdownList.splice(val, 1);
        let oldList = [...this.countdownList];
        let newList = [targetCountdown].concat(oldList);
        this.countdownList = newList;
        this.updateCountdownTimer();
      },
      updateCountdownTimer() {
        this.countdownTimer.name = this.countdownList[0].name;
        this.countdownTimer.level = this.countdownList[0].level;
        this.countdownTimer.levelMax = this.countdownList[0].levelMax;
        let data = this.getLevelData(this.countdownTimer.level);
        this.countdownTimer.time = data.totleTime;
        this.statusBreak = data.status;
      },
      pushCountdownTimer(name) {
        let obj = {
          name: name,
          level: 0,
          levelMax: 5,
        }
        this.countdownList.push(obj);
        let index = this.countdownList.length - 1;
        this.repleaceCountdownTimer(index);
      }
    },
    computed: {
      getMinuteText() {
        let text = '';
        let val = Math.floor(this.countdownTimer.time / 60);
        val < 10 ? text = `0${val}` : text = `${val}`;
        return text;
      },
      getSecondText() {
        let text = '';
        let val = this.countdownTimer.time % 60;
        val < 10 ? text = `0${val}` : text = `${val}`;
        return text;
      }
    },
    watch: {

    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/_utils.scss';
  @import 'assets/scss/main.scss';

</style>
