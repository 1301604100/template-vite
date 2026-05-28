<template>
  <div class="tab-page">
    <div class="tab-header">问答</div>
    <div class="tab-body">
      <div class="placeholder-icon">💡</div>
      <div class="placeholder-title">问答模块</div>
      <div class="placeholder-desc">复刻 App 问答 Tab 入口，业务内容后续填充</div>
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

.placeholder-icon {
  font-size: 80px;
}

.placeholder-title {
  margin-top: 32px;
  font-size: 36px;
  font-weight: 600;
  color: #323233;
}

.placeholder-desc {
  margin-top: 16px;
  font-size: 26px;
  color: #969799;
  line-height: 40px;
}
</style>
