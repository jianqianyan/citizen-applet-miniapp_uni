<template>
    <view class="container">
        <!-- 背景占位 -->
        <view class="background-holder"></view>
        <!-- 背景占位 END -->
        <view class="profile-cotent-wrapper">
            <view class="profile-info shadow-wrapper">
                <view class="title">{{ drugKnowledgeDetailList.title }}</view>
                <image class="img" src="/static/images/title-style.png"></image>
                <!-- <template is="wxParse" :data="wxParseData:article.nodes"/> -->
                <mp-html :content="article"></mp-html>
            </view>
            <view class="other-wrapper">
                <text class="time">{{ drugKnowledgeDetailList.createTime }}</text>
                <text class="read-num">阅读{{ drugKnowledgeDetailList.reading }}</text>
            </view>
        </view>
    </view>
</template>

<script>
// pages/drug-knowledge/index.js
import Api from "../../apis/apis"
export default {
    data() {
        return {
            str: '',
            article: '',
            drugKnowledgeDetailList: {
                title: '',
                createTime: '',
                reading: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        // this.handleDemo()
        this.getDrugKnowledgReading(options.id);
        this.getDrugKnowledgeDetail(options.id);
    },
    methods: {
        handleDemo() {
            var article = `<p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      原标题：世界之最的高速磁浮交通系统问世 时速600公里到底意味着什么？
    </p>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      来源：光明网
    </p>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      光明网讯（记者 李汶键）高速磁浮一直被称为“贴地飞行”神器，《交通强国建设纲要》明确提出，要合理统筹安排时速600公里级高速磁悬浮系统等技术储备的研发。7月20日，中国中车官方传来好消息：世界首套时速600公里高速磁浮交通系统在青岛成功下线。
    </p>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      <span style="font-size:21.08px;font-weight:700;">地表最快：高速磁浮列车弥补陆空速度空白</span>
    </p>
    <a><img class="art_img_mini_img j_fullppt_cover finpic" src="https://n.sinaimg.cn/default/crawl/561/w550h811/20210722/9e03-c0190b32c95e9f350ca70a55550ee970.jpg" alt="" />
    <h2 class="art_img_tit" style="font-size:0.34rem;font-weight:400;color:#888888 !important;text-align:justify;">
    </h2>
    </a><span style="color:#1A1A1A;font-family:&quot;font-size:16px;background-color:#F0F0F0;"></span>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      作为国际尖端技术，高速磁浮是世界轨道交通领域的一大“制高点”，是全球交通科技竞争的战略高地。
    </p>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      德国的磁浮技术最高试验时速达到505公里。而在我国，目前处于运营状态的3条磁悬浮线路中，于2003年1月开通的上海磁悬浮线时速最高，为430公里。如今，时速600公里高速磁浮交通系统问世，是当前速度最快的地面交通工具，同时可填补高铁和航空运输之间的速度空白，助推我国立体交通网络的构建。
    </p>
    <div class="j_native_rst210726 box" style="margin:20px 0px;padding:0px;border:0px;color:#1A1A1A;font-family:&quot;font-size:16px;background-color:#F0F0F0;">
    </div>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      <span style="font-size:21.08px;font-weight:700;">历时5年：攻克关键核心技术</span>
    </p>
    <a><img class="art_img_mini_img j_fullppt_cover finpic" src="https://n.sinaimg.cn/default/crawl/561/w550h811/20210722/d690-bd90bb92a2d79a44bb900a3c3e263819.png" alt="" />
    <h2 class="art_img_tit" style="font-size:0.34rem;font-weight:400;color:#888888 !important;text-align:justify;">
    </h2>
    </a><span style="color:#1A1A1A;font-family:&quot;font-size:16px;background-color:#F0F0F0;"></span>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      五年前，时速600公里高速磁浮系统及工程化应用在我国尚属空白。为掌握高速磁浮关键技术，在科技部“十三五”国家重点研发计划先进轨道交通重点专项课题支持下，由中国中车组织，中车四方股份公司牵头，汇集包括中国铁设在内的国内磁浮、高铁领域30多家高校、科研院所和企业“产学研用”联合开展了时速600公里高速磁浮交通系统的研制。如今，这套系统的顺利下线标志着我国掌握了高速磁浮成套技术和工程化能力。
    </p>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      <span style="font-size:21.08px;font-weight:700;">超级高铁：续写轨道交通时代华章</span>
    </p>
    <a><img class="art_img_mini_img j_fullppt_cover finpic" src="https://n.sinaimg.cn/default/crawl/616/w550h866/20210722/df45-4ccaf078d185d5e064090f54a8e94c04.png" alt="" />
    <h2 class="art_img_tit" style="font-size:0.34rem;font-weight:400;color:#888888 !important;text-align:justify;">
    </h2>
    </a><span style="color:#1A1A1A;font-family:&quot;font-size:16px;background-color:#F0F0F0;"></span>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      目前,中国已经拥有世界上最大的高速铁路网络。中国高铁自2017年重回“350公里”时代以来，高铁运营里程稳步递增，截至2020年底，已达3.8万公里，稳居世界第一。同时，动车组已成为铁路旅客运输的主力军，高铁动车组旅客发送量约占铁路旅客发送量的70%。
    </p>
    <p class="art_p" style="text-align:justify;font-size:0.34rem;color:#1A1A1A;font-family:&quot;background-color:#F0F0F0;">
      成熟的轨道交通网络可以带动城市和区域经济发展。国务院2月发布《国家综合立体交通网规划纲要》，首次在国家层面对非轮轨技术轨道交通应用做出规划，提出研究推进超大城市间高速磁悬浮通道布局和试验线路建设。高速磁悬浮可以满足城市一体化的快捷通勤交通需求，大城市的同城化交通需求，东西城市间的跨区域走廊化交通需求。未来，高速磁浮必将成为我国经济发展的新动能。
    </p>`;
            var that = this;
            this.setData({
                article
            });
            // WxParse.wxParse('article', 'html', this.data.article, that, 5);
        },

        /* ------------------ 接口请求封装区 ---------------------------*/
        // 获取详情
        async getDrugKnowledgeDetail(id) {
            const res = await Api.getDrugKnowledgeDetail(id);
            if (res.data.code !== 200) {
                return Toast({
                    title: '获取详情数据失败'
                });
            }
            let { content: article, ...drugKnowledgeDetailList } = res.data.data;
            let that = this;
            this.setData(
                {
                    article,
                    drugKnowledgeDetailList
                },
                () => {
                    that.article = that.escape2Html(that.data.article);
                }
            );
        },

        // 阅读量
        async getDrugKnowledgReading(id) {
            let res = await Api.getDrugKnowledgReading(id);
            if (res.data.code !== 200) {
                return Toast({
                    title: '阅读量调用失败'
                });
            }
            uni.$emitter.emit('READING', id);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
