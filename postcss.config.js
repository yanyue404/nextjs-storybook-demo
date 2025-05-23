module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        if (file.indexOf('sprite') !== -1) {
          return 100;
        }
        return file.indexOf('antd-mobile') !== -1 ? 50 : 100;
      },
      selectorBlackList: [], // 忽略转换正则匹配项
      propList: ['*'],
    },
  },
};
