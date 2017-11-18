<template>
    <div>
    <div class="bannerbox" id="bannerall">
        <div class="banner bd" >
            <ul>
                <li v-for="listImg in listImgs"><img :src='listImg.url'/></li>
            </ul>
        </div>
        <div class="st-num hd">
            <ul></ul>
        </div>
    </div>
    <div class="st-nav">
        <ul class="st-navList">
            <router-link :to="{ path: '/indexAct'}">
            <li class="activity">
                <h1>最新活动</h1>
                <p>热门活动，及时发现</p>
            </li>
            </router-link>
            <router-link :to="{ path: '/myCode'}">
            <li class="st-code">
                <h1>二维码</h1>
                <p>会员身份，快速入口</p>
            </li>
            </router-link>
        </ul>
    </div>
    <div class="st-mainbox">
        <div class="st-main">
            <div class="st-maintltle">
                <h3>好课推荐</h3>
                <router-link :to="{ path: '/courseList'}">
                <a>更多></a>
                </router-link>
            </div>
            <ul class="st-mainlist">
                <li v-for="item in goodCourses">
                    <router-link :to="{ path: '/courseDetails', query: { id: item.id}}">
                    <div>
                        <img :src="imgHost+item.picture" alt="">
                    </div>
                    <h3>{{item.name}}</h3>
                    <span>￥{{item.price}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <foot curNav="index"></foot>
    </div>

</template>

<script>
import foot from '../../../components/foot'
import TouchSlide from '../../../assets/js/TouchSlide'
import banner1 from '../../../assets/images/indexbanner1.jpg'
import banner2 from '../../../assets/images/indexbanner2.jpg'
import banner3 from '../../../assets/images/indexbanner3.jpg'
import banner4 from '../../../assets/images/indexbanner4.jpg'
import banner5 from '../../../assets/images/indexbanner5.jpg'
import api from '../../../fetch/api'
import { mapGetters } from 'vuex'
import store from '../../../store/'
import layer from '../../../assets/js/layer/layer'
export default {
    name: 'index',
    components:{foot},
    props: [],
    data() {
        return {
            listImgs: [{
                url: banner1
            }, {
                url: banner2
            }, {
                url: banner3
            }, {
                url: banner4
            }, {
                url: banner5
            }],
            goodCourses:[]
        }
    },
    computed: {
        ...mapGetters([
            'token','openId','nickName','acatar','imgHost'
        ])
    },
    mounted(){
        TouchSlide({slideCell:"#bannerall",
            titCell:".hd ul ",
            mainCell:".bd ul",
            effect:"left",
            autoPlay:true,
            autoPage:true,
            delayTime:1000,
            interTimeP:8000
        });
        this.initData();
    },
    methods:{
        initData(){
            const me = this;
            api.rcoursesMsgApi()
            .then(res=>{
                me.goodCourses = res.result;
            });
            if(!this.token&&!this.openId){
                const loginSta = this.$route.query.loginSta;
                api.loginStaApi(loginSta)
                .then((res)=>{
                    if(res){
                        if(res.result.hasOwnProperty('token'))store.dispatch('setToken',res.result.token);
                        if(res.result.hasOwnProperty('openId'))store.dispatch('setOpenId',res.result.openId);
                        if(res.result.hasOwnProperty('nickName'))store.dispatch('setNickName',res.result.nickName);
                        if(res.result.hasOwnProperty('avatar')){store.dispatch('setAcatar',res.result.avatar)};
                        if(res.result.hasOwnProperty('phoneNum')){store.dispatch('setTel',res.result.phoneNum)};
                    }
                    else{
                        layer.open({
                          content: '登录失败，请重新登录',
                          btn: '确定'
                      });
                    }
                })
            }
        }
    }
}
</script>

