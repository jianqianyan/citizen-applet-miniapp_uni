import { myRequest } from '../../common/config'
import { gftRequest } from "../../common/gftRequest"
/**
 *
 * @method get
 * @method post
 * @method put
 * @method delete
 *
 *
 * @param { string } url 接口地址
 * @param { object } data 数据源
 * @param { boolean } isAuth 是否需要权限
 * @param { object } header 请求头信息
 *
 */

/**
 * @description 购药登记
 * @param { number } age  年龄
 * @param { string } citizenUserId  市民用户id
 * @param { number } contactWithFebrilePersonnel  是否与疫区返回人员或发热症状人员接触 1是 2否
 * @param { string } contactinformation  联系方式
 * @param { string } drugTradeName  药品商品名称
 * @param { string } drugstoreId  销售药店id
 * @param { string } emergencyContact  紧急联系人
 * @param { number } epidemicAreaReturns 是否疫区返回 1是 2否
 * @param { string } epidemicSituationDrugCategory  新冠疫情药品类别
 * @param { string } epidemicSituationDrugCategoryName  新冠疫情药品类别名称
 * @param { string } idNumber  身份证号
 * @param { string } name  姓名
 * @param { number } purchaseQuantity  购买数量
 * @param { number } temperature 体温
 * @param { string } address 住址
 * @param { string } symptom 症状
 * @param { string } regionCode 区域码
 */
export const addRegister = (data) =>
  myRequest.post(`/API/api/drug-anti-epidemic-drug-sales/add-register`, data, true, {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  });

/**
 * @description 字典获取新冠抗疫药品分类
 */
export const getCOVID_19DrugTypeList = (data) => myRequest.get(`/API/dictItems/itemlist-new/dictCode`, data, true, {
  'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
});

/**
 * @description 根据用户id查询用户新冠购药登记最新的输入身份信息
 * @param { string } citizenUserId
 */
export const getLastRegInfo = (data) => myRequest.get(`/API/api/drug-anti-epidemic-drug-sales/get-user-newest-register/citizen-user-id`, data, true, {
  'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
});

/**
 * @description 获取区域信息
 * @param { string } regionCode
 */
export const getRegion = (data) => myRequest.get('/API/area/getDirectlyLowerRegion', data, true, {
  'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
});

/**
 * @description 根据企业Id获取企业、药店信息
 * @param { string  } enterpriseId
 */
export const getInfoByEnterprise = (data) => myRequest.get('/API/api/drug-store/getInfoByEnterpriseId', data, true, {
  'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
});

/**
 * @description 补充药店region信息
 */
export const updateTownship = (data) => myRequest.post('/API/api/drug-store/updateTownship', data, true, {
  'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
});

/**
 * @description 首页根据条件查询药店列表
 * @param { string } featureLabelCode 特色标签代码
 * @param { string } featureServiceCode 特色服务代码
 * @param { string } handyServiceCode 便民服务代码
 * @param { string } latitude 纬度
 * @param { string } longitude 经度
 * @param { string } level 区域等级
 * @param { string } name 企业名称(药店名称)
 * @param { number } pageNum
 * @param { number } pageSize
 * @param { string } regionCode 区域码
 *
 */
export const getDrugStoreList = (data) => myRequest.get('/API/api/drug-store/wx/get-page', data);

/**
 * @description 获取首页轮播
 */
export const getBanner = () => myRequest.get('/API/api/banner/getBannerList');

/**
 * @description 药店获取特色标签字典
 */
export const getDrugFeatureLabel = () =>
  myRequest.get(`/API/dictItems/itemlistWx/FEATURE_LABEL`, {
    dictCode: 'FEATURE_LABEL'
  });

/**
 * @description 药店获取特色服务字典
 */
export const getDrugFeatureService = () =>
  myRequest.get(`/API/dictItems/itemlistWx/FEATURE_SERVICE`, {
    dictCode: 'FEATURE_SERVICE'
  });

/**
 * @description 药店获取便民服务标签字典
 */
export const getDurgHandyService = () =>
  myRequest.get(`/API/dictItems/itemlistWx/HANDY_SERVICE`, {
    dictCode: 'HANDY_SERVICE'
  });

/**
 * @description 药品知识获取顶部导航标签字典
 */
export const getDrugKnowledgeService = () =>
  myRequest.get(`/API/dictItems/itemlistWx/DRUG_KNOWLEDGE_SERVICE_TYPE`, {
    dictCode: 'DRUG_KNOWLEDGE_SERVICE_TYPE'
  });

/**
 * @description 药品知识的列表
 */
export const getDrugKnowledgeList = (data) => myRequest.get(`/API/api/drug-knowledge-serve/wx/getWxPage`, data);

/**
 * @description 药品知识的详情
 */
export const getDrugKnowledgeDetail = (data) => myRequest.get(`/API/api/drug-knowledge-serve/wx/get-by-id-new/id`, data);

/**
 * @description 药品知识阅读量
 */
export const getDrugKnowledgReading = (data) => myRequest.get(`/API/api/drug-knowledge-serve/wx/increaseRead-new/id`, data);

/**
 * @description 获取个人中心购药记录
 * @param { string } citizenUserId
 */
export const getDrugPurchaseRecord = (citizenUserId) => myRequest.get(`/API/api/drug-anti-epidemic-drug-sales/get-applet-sales-record-page`, citizenUserId, true,
  {
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  });

/**
 * @description 获取药店详情
 * @param { string } id
 */
export const getDrugStoreDetails = (id) => myRequest.get(`/API/api/drug-store/wx/get-info-new/id`, id);

/**
 * @description 药品列表查询
 * @param { number } pageSize
 * @param { number } pageNum
 * @param { string } keyword
 *
 */
export const getDrugList = (data) => myRequest.get('/API/api/drug-medicine/wx/getWxPage', data);

/**
 * @description 获取药品详情
 * @param { stirng } id
 */
export const getDrugDel = (id) => myRequest.get(`/API/api/drug-medicine/wx/get-by-id-new/id`, id);

/**
 * @description 获取许可证资质信息
 * @param { string } enterpriseId
 */
export const getlicenceMessage = (enterpriseId) => myRequest.get(`/API/api/certificate-info/getWxList`, enterpriseId);

/**
 * @description 获取药店详情执业药师信息
 * @param { string } enterpriseId
 */
export const getLicensedPharmacist = (enterpriseId) => myRequest.get(`/API/api/drug-pharmacist/getWxPage`, enterpriseId);

/**
 * @description 获取药店商品
 * @param { number } pageSize
 * @param { number } pageNum
 * @param { string } enterpriseId
 */
export const getDrugstoreGoods = (data) => myRequest.get(`/API/api/drug-medicine/wx/getOnSaleMedicineByEnterprise`, data);
/*
 * @description 获取药品关联的在售药店列表
 *
 */
export const getOnsaleDrugstoreList = (data) => myRequest.get('/API/api/drug-store/wx/get-onsale-page', data);

/**
 * @description 获取热门药品
 *
 */
export const getHotMedicine = () => myRequest.get('/API/api/drug-medicine/wx/getHotMedicine');

/**
 * @description 获取附近药店信息列表
 *
 */
export const getNearbyDrugstoreList = (data) => myRequest.get('/API/api/drug-store/wx/get-nearby-page', data);

/**
 * @description 根据药品追溯码查询药品追溯详情
 *
 */
export const getProInfoByDtc = (tcCode) => myRequest.get('/API/api/ali-review/getInfoByDtc', tcCode);

/**
 * @description 根据商品码以及生产批号查询药品追溯详情
 *
 */
export const getProInfoByCommodityCode = (data) => myRequest.get('/API/api/ali-review/getProInfoByCommodityCode', data);

/**
 * @description 根据扫码结果获取药品名称
 *
 */
export const getDrugName = (code) =>
  myRequest.get(
    `/API/api/drug-medicine/get-by-code-new/code`,
    {
      code
    },
    true, {
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  }
  );

/**
 * @description 获取市区乡镇信息
 *
 */
export const getMultilevelRegion = (proRegionId) =>
  myRequest.get(`/API/area/areaLevelWx`, {
    proRegionId
  });

/**
 * @description 新建药师咨询
 * @param { String } citizenId 市民Id
 * @param { String } citizenName 市民名称
 * @param { String } enterpriseId 药店Id
 * @param { String } enterpriseName	药店名称
 * @param { String } pharmacistId	执业药师id
 * @param { String } pharmacistName	执业药师名称
 * @param { Number } pharmacistUserId	执业药师userid
 * @param { String } uscid	统一社会信用代码
 *
 */
export const createConsult = (data) =>
  myRequest.post(`/API/api/drug-consult/add-consult`, data, true, {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  });

/**
 * @description 获取已咨询的信息列表
 * @param { String } citizenId
 * @param { Number } pageNum
 * @param { Number } pageSize
 */
export const getConsultedList = ({ citizenId, pageNum, pageSize }) =>
  myRequest.get(
    `/API/api/drug-consult/page-new/citizen-id`,
    {
      citizenId,
      pageNum,
      pageSize
    },
    true, {
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  }
  );

/**
 * @description 咨询(发送留言)
 * @param { String } citizenId 市民id
 * @param { String } citizenName 市民名称
 * @param { String } donsultId 咨询ID
 * @param { Number } informationType 信息类型 0文字 1 图片
 * @param { Number } launchType 发起类型（1市民发起类型 2执业药师回复）
 * @param { Number } pharmacistId 职业药师id
 * @param { String } pharmacistName 执业药师名称
 * @param { String } picture 图片内容
 * @param { String } userId 发起人id
 * @param { String } userName 发起人名称
 * @param { String } writtenWords 文字内容
 */
export const sendMessageOfConsult = (data) =>
  myRequest.post(`/API/api/drug-leaving-message/add-message`, data, true, {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  });

/**
 * @description 获取咨询聊天记录
 * @param { String } donsultId 咨询ID
 * @param { Numebr } pageNum
 * @param { Numebr } pageSize
 *
 */
export const getChattingRecordsOfCosult = ({ donsultId, pageNum, pageSize }) =>
  myRequest.get(
    `/API/api/drug-leaving-message/page-new/donsult-id`,
    {
      donsultId,
      pageNum,
      pageSize
    },
    true, {
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  }
  );

/**
 * @description 获取咨询详情
 * @param { String } id
 */
export const getDonsultDel = (id) =>
  myRequest.get(
    `/API/api/drug-consult/get-consult-new/id`,
    {
      id
    },
    true, {
    'Authorization': 'Bearer ' + uni.getStorageSync('access_token')
  }
  );

/**
* @description 腾讯地图api
* @param { String } coord_type
* @param { String } get_poi
* @param { String } output
* @param { String } key
* @param { String } location
*/
export const txmapapi = (data) => gftRequest('txmapapi', data)

// 根据药店ID获取在售药品
export const getDrugPage = (data) =>
  myRequest.post(
    `/API/api/drug-stock-info-wx/get-drug-page-wx`,
    data,
    false, {
      'content-type': 'application/json',
  }
  );

// 根据药品名称获取零售该药品的药店信息
export const getStorePage = (data) =>
  myRequest.post(
    `/API/api/drug-stock-info-wx/get-store-page-wx`,
    data,
    true, {
    'content-type': 'application/json',
  }
  );

/**
 *
 * @description 登录
 */
export const Login = (data) => myRequest.post('/API/oauth/token', data, true);

/**
 *
 * @description 注册
 */
export const register = (data) => myRequest.post('/API/api/user/third/register', data, true);

/**
 * @description 解密
 */
export const dc = (data) => myRequest.post('/API/api/user/third/dc', data, true);

/**
 * @description 获取用户信息
 *
 */
export const getUserProfile = (userId) =>
  myRequest.get(
    '/API/user/getUserInfo',
    {
      userId
    },
    true
  );

/**
* @description 获取可以语音播报的信息
* @param { number } pageSize
* @param { number } pageNum
* @param { string } keyword
*
*/
export const getDrugToDescList = (data) => myRequest.get('/API/api/drug-medicine/wx/getWxInsPage', data);

/**
 * 获取药品说明
 * @param {*} data
 */
export const getDruDesc = (data) => myRequest.get('/API/api/drug-medicine/wx/getinsdesc-by-id', data)

// 获取语音播报接口
export const getVoiceSrc = (data) => myRequest.post('/Voice/run/predict', data, false, {
  'content-type': 'application/json',
})