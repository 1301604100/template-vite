<template>
  <div class="tab-page">
    <div class="tab-header">首页</div>
    <div class="tab-body">
      <div class="welcome-icon">✨</div>
      <div class="welcome-title">欢迎来到准准</div>
      <div class="welcome-desc">您已进入 App 主框架，首页内容后续填充</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-page {
  min-height: calc(100vh - 100px);
  background: #f7f8fa;
}

.tab-header {
  padding: 24px 32px;
  font-size: 34px;
  font-weight: 600;
  color: #323233;
  background: #fff;
}

.tab-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 48px;
  text-align: center;
}

.welcome-icon {
  font-size: 80px;
}

.welcome-title {
  margin-top: 32px;
  font-size: 36px;
  font-weight: 600;
  color: #323233;
}

.welcome-desc {
  margin-top: 16px;
  font-size: 26px;
  color: #969799;
  line-height: 40px;
}
</style>
