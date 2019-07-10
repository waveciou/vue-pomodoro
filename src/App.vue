<template>
  <div id="app">
    <div class="wrapper" :class="{'theme-green': this.statusBreak === true}">
      <div class="views-zone">
        <div class="pomodoro">
          <svg id="svg" width="100%" height="100%" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle id="bar" :r="this.circle.radius" cx="330" cy="330" fill="transparent" stroke-dasharray="958.18" stroke-dashoffset="0" :class="{'is-anamate': this.circle.isAnamate === true}"></circle>
          </svg>
          <div class="pomodoro__content">
            <div class="pomodoro__caption">
              <div class="pomodoro__time"><span class="min">25</span>:<span class="sec">00</span></div>
              <div class="pomodoro__ctrlbar">
                <a href="javascript:;" class="pomodoro__playbtn" @click.stop="playCountdown()" :class="{'is-pause': this.activeTimer.isActive === true}">
                  <span v-if="this.activeTimer.isActive === false">START</span>
                  <span v-else>PAUSE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ctrl-zone">
        <div class="wrap">
          <transition name="fade" mode="out-in">
            <router-view />
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

  export default {
    data() {
      return {
        activeTimer: {
          name: '第一件待辦事項是做一個蕃茄鐘',
          level: 0,
          isActive: false,
          time: 60,
          timerContainer: null,
        },
        circle: {
          dom: null,
          radius: 305,
          isAnamate: false
        },
        statusBreak: false,
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
      this.circle.dom = document.querySelector('#bar');
    },
    methods: {
      playCountdown() {
        this.activeTimer.isActive = !this.activeTimer.isActive;
        this.activeCountdown(this.activeTimer.isActive);
      },
      activeCountdown(status) {
        if(status === true) {
          let data = this.getLevelData(this.activeTimer.level);
          let sum = data.totletime;

          this.activeTimer.timerContainer = setInterval(() => {
            this.activeTimer.time --;
            this.circle.isAnamate = true;

            let percent = Math.floor(this.activeTimer.time / sum * 100);
            let c = Math.PI * (this.circle.radius * 2);
            if (percent < 0) percent = 0;
            if (percent > 100) percent = 100;
            let pct = ((100 - percent) / 100 * c)/-2;
            this.circle.dom.style.strokeDashoffset = pct;

            if(this.activeTimer.time <= 0) {
              this.activeTimer.level += 1;
              this.activeTimer.isActive = false;
              this.circle.isAnamate = false;
              this.circle.dom.style.strokeDashoffset = 0;
              
              let data = this.getLevelData(this.activeTimer.level);
              this.activeTimer.time = data.totletime;
              this.statusBreak = data.status;

              clearInterval(this.activeTimer.timerContainer);
              return false
            }
          }, 1000);
        } else {
          this.circle.isAnamate = false;
          clearInterval(this.activeTimer.timerContainer);
        }
      },
      getLevelData(level) {
        let obj = {}
        if(level % 2 === 0) {
          obj.totletime = 60;
          obj.status = false;
        } else {
          obj.totletime = 30;
          obj.status = true;
        }
        return obj;
      }
    },
    computed: {

    },
    watch: {

    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/utils/_utils.scss';
  @import 'assets/scss/main.scss';

</style>
