// 环境变量，通过webpack修改js内容，更新env的值
const env = 'dev';
 
// 各环境配置
const envConfig = {
  dev: {
    baseUrl: 'http://dev.base.com',
    ossUrl: 'http://dev.oss.com'
  },
  test: {
    baseUrl: 'http://test.base.com',
    ossUrl: 'http://test.oss.com'
  },
  pd: {
    baseUrl: 'http://pd.base.com',
    ossUrl: 'http://pd.oss.com'
  }
};
 
// 导出对应环境的配置项
export default envConfig[env];