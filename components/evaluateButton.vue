<template>
  <div class="evaluate-button" @click="trunEvalute()">
    <uni-icons type="chat" size="25" color="#fff"></uni-icons>
    <span>评价</span>
  </div>
</template>
<script>
  import { organCode, evaluateAbilityCode, appCode, appName, regionCode, regionName } from '../common/config';
  export default {
    methods: {
      trunEvalute () {
        hw.jumpToEvaluate({
          abilityCode: evaluateAbilityCode,
          organCode,
          appCode,
          appName,
          regionCode,
          regionName,
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.evaluate-button {
  width: 3rem;
  height: 3rem;
  background-color: #148FEB;
  position: fixed;
  bottom: 8rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  color: #fff;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 999;

  span {
    font-size: 0.625rem;
  }
}
</style>