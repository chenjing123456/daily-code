
let map = new BMap.Map("bdmapContent"); 
map.setCurrentCity('杭州');
const doRequest = (options) => {
    if(options.url && options.url[0] !== '/') options.url = window.basePath+options.url;
    return $.ajax(options);
};

const regions = {
'data':[
    {
    "id": "191020",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330100000000,
    "zipCode": 310000,
    "cityCode": "\u0000",
    "name": "杭州市",
    "shortName": "杭州",
    "mergerName": "浙江,杭州",
    "pinYin": "HangZhou",
    "lng": 120.155070,
    "lat": 30.274084,
    "children": [{
        "id": "191022",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "上城区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ShangCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "191083",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "下城区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XiaCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "191166",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "江干区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JiangGan",
        "lng": null,
        "lat": null
    }, {
        "id": "191360",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "拱墅区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "GongShu",
        "lng": null,
        "lat": null
    }, {
        "id": "191479",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "西湖区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XiHu",
        "lng": null,
        "lat": null
    }, {
        "id": "191693",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "滨江区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "BinJiang",
        "lng": null,
        "lat": null
    }, {
        "id": "191756",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "萧山区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XiaoShan",
        "lng": null,
        "lat": null
    }, {
        "id": "192388",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "余杭区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YuHang",
        "lng": null,
        "lat": null
    }, {
        "id": "192753",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "富阳区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "FuYang",
        "lng": null,
        "lat": null
    }, {
        "id": "193085",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "桐庐县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "TongLu",
        "lng": null,
        "lat": null
    }, {
        "id": "193304",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "淳安县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ChunAn",
        "lng": null,
        "lat": null
    }, {
        "id": "193766",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "建德市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JianDe",
        "lng": null,
        "lat": null
    }, {
        "id": "194060",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "临安区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LinAn",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "194395",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330200000000,
    "zipCode": 315000,
    "cityCode": "\u0000",
    "name": "宁波市",
    "shortName": "宁波",
    "mergerName": "浙江,宁波",
    "pinYin": "NingBo",
    "lng": 121.550357,
    "lat": 29.874556,
    "children": [{
        "id": "194397",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "海曙区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "HaiShu",
        "lng": null,
        "lat": null
    }, {
        "id": "194568",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "江北区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JiangBei",
        "lng": null,
        "lat": null
    }, {
        "id": "194747",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "北仑区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "BeiLun",
        "lng": null,
        "lat": null
    }, {
        "id": "195023",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "镇海区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ZhenHai",
        "lng": null,
        "lat": null
    }, {
        "id": "195132",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "鄞州区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YinZhou",
        "lng": null,
        "lat": null
    }, {
        "id": "195703",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "象山县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XiangShan",
        "lng": null,
        "lat": null
    }, {
        "id": "196257",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "宁海县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "NingHai",
        "lng": null,
        "lat": null
    }, {
        "id": "196686",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "余姚市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YuYao",
        "lng": null,
        "lat": null
    }, {
        "id": "197031",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "慈溪市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "CiXi",
        "lng": null,
        "lat": null
    }, {
        "id": "197440",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "奉化区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "FengHua",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "197850",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330300000000,
    "zipCode": 325000,
    "cityCode": "\u0000",
    "name": "温州市",
    "shortName": "温州",
    "mergerName": "浙江,温州",
    "pinYin": "WenZhou",
    "lng": 120.699366,
    "lat": 27.994267,
    "children": [{
        "id": "197852",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "鹿城区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LuCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "198091",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "龙湾区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LongWan",
        "lng": null,
        "lat": null
    }, {
        "id": "198210",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "瓯海区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "OuHai",
        "lng": null,
        "lat": null
    }, {
        "id": "198508",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "洞头区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "DongTou",
        "lng": null,
        "lat": null
    }, {
        "id": "198619",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "永嘉县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YongJia",
        "lng": null,
        "lat": null
    }, {
        "id": "199581",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "平阳县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "PingYang",
        "lng": null,
        "lat": null
    }, {
        "id": "200239",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "苍南县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "CangNan",
        "lng": null,
        "lat": null
    }, {
        "id": "201140",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "文成县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "WenCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "201556",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "泰顺县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "TaiShun",
        "lng": null,
        "lat": null
    }, {
        "id": "201882",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "瑞安市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "RuiAn",
        "lng": null,
        "lat": null
    }, {
        "id": "202864",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "乐清市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YueQing",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "203852",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330400000000,
    "zipCode": 314000,
    "cityCode": "\u0000",
    "name": "嘉兴市",
    "shortName": "嘉兴",
    "mergerName": "浙江,嘉兴",
    "pinYin": "JiaXing",
    "lng": 120.755486,
    "lat": 30.746129,
    "children": [{
        "id": "203854",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "南湖区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "NanHu",
        "lng": null,
        "lat": null
    }, {
        "id": "204008",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "秀洲区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XiuZhou",
        "lng": null,
        "lat": null
    }, {
        "id": "204177",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "嘉善县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JiaShan",
        "lng": null,
        "lat": null
    }, {
        "id": "204341",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "海盐县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "HaiYan",
        "lng": null,
        "lat": null
    }, {
        "id": "204486",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "海宁市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "HaiNing",
        "lng": null,
        "lat": null
    }, {
        "id": "204723",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "平湖市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "PingHu",
        "lng": null,
        "lat": null
    }, {
        "id": "204877",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "桐乡市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "TongXiang",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "205101",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330500000000,
    "zipCode": 313000,
    "cityCode": "\u0000",
    "name": "湖州市",
    "shortName": "湖州",
    "mergerName": "浙江,湖州",
    "pinYin": "HuZhou",
    "lng": 120.086823,
    "lat": 30.894348,
    "children": [{
        "id": "205103",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "吴兴区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "WuXing",
        "lng": null,
        "lat": null
    }, {
        "id": "205449",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "南浔区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "NanXun",
        "lng": null,
        "lat": null
    }, {
        "id": "205717",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "德清县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "DeQing",
        "lng": null,
        "lat": null
    }, {
        "id": "205910",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "长兴县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ChangXing",
        "lng": null,
        "lat": null
    }, {
        "id": "206213",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "安吉县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "AnJi",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "206438",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330600000000,
    "zipCode": 312000,
    "cityCode": "\u0000",
    "name": "绍兴市",
    "shortName": "绍兴",
    "mergerName": "浙江,绍兴",
    "pinYin": "ShaoXing",
    "lng": 120.580232,
    "lat": 30.029752,
    "children": [{
        "id": "206440",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "越城区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YueCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "206875",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "柯桥区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "KeQiao",
        "lng": null,
        "lat": null
    }, {
        "id": "207247",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "上虞区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ShangYu",
        "lng": null,
        "lat": null
    }, {
        "id": "207715",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "新昌县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XinChang",
        "lng": null,
        "lat": null
    }, {
        "id": "208171",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "诸暨市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ZhuJi",
        "lng": null,
        "lat": null
    }, {
        "id": "208733",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "嵊州市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ShengZhou",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "209250",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330700000000,
    "zipCode": 321000,
    "cityCode": "\u0000",
    "name": "金华市",
    "shortName": "金华",
    "mergerName": "浙江,金华",
    "pinYin": "JinHua",
    "lng": 119.647444,
    "lat": 29.079059,
    "children": [{
        "id": "209252",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "婺城区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "WuCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "209949",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "金东区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JinDong",
        "lng": null,
        "lat": null
    }, {
        "id": "210474",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "武义县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "WuYi",
        "lng": null,
        "lat": null
    }, {
        "id": "211047",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "浦江县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "PuJiang",
        "lng": null,
        "lat": null
    }, {
        "id": "211492",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "磐安县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "PanAn",
        "lng": null,
        "lat": null
    }, {
        "id": "211883",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "兰溪市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LanXi",
        "lng": null,
        "lat": null
    }, {
        "id": "212256",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "义乌市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YiWu",
        "lng": null,
        "lat": null
    }, {
        "id": "213076",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "东阳市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "DongYang",
        "lng": null,
        "lat": null
    }, {
        "id": "213485",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "永康市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YongKang",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "214260",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330800000000,
    "zipCode": 324000,
    "cityCode": "\u0000",
    "name": "衢州市",
    "shortName": "衢州",
    "mergerName": "浙江,衢州",
    "pinYin": "QuZhou",
    "lng": 118.859457,
    "lat": 28.970079,
    "children": [{
        "id": "214262",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "柯城区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "KeCheng",
        "lng": null,
        "lat": null
    }, {
        "id": "214536",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "衢江区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "QuJiang",
        "lng": null,
        "lat": null
    }, {
        "id": "214843",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "常山县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ChangShan",
        "lng": null,
        "lat": null
    }, {
        "id": "215051",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "开化县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "KaiHua",
        "lng": null,
        "lat": null
    }, {
        "id": "215332",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "龙游县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LongYou",
        "lng": null,
        "lat": null
    }, {
        "id": "215624",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "江山市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JiangShan",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "215955",
    "parentId": "191019",
    "level": 1,
    "areaCode": 330900000000,
    "zipCode": 316000,
    "cityCode": "\u0000",
    "name": "舟山市",
    "shortName": "舟山",
    "mergerName": "浙江,舟山",
    "pinYin": "ZhouShan",
    "lng": 122.207215,
    "lat": 29.985295,
    "children": [{
        "id": "215957",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "定海区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "DingHai",
        "lng": null,
        "lat": null
    }, {
        "id": "216139",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "普陀区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "PuTuo",
        "lng": null,
        "lat": null
    }, {
        "id": "216290",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "岱山县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "DaiShan",
        "lng": null,
        "lat": null
    }, {
        "id": "216394",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "嵊泗县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "ShengSi",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "216449",
    "parentId": "191019",
    "level": 1,
    "areaCode": 331000000000,
    "zipCode": 318000,
    "cityCode": "\u0000",
    "name": "台州市",
    "shortName": "台州",
    "mergerName": "浙江,台州",
    "pinYin": "TaiZhou",
    "lng": 121.420757,
    "lat": 28.656386,
    "children": [{
        "id": "216451",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "椒江区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JiaoJiang",
        "lng": null,
        "lat": null
    }, {
        "id": "216788",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "黄岩区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "HuangYan",
        "lng": null,
        "lat": null
    }, {
        "id": "217324",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "路桥区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LuQiao",
        "lng": null,
        "lat": null
    }, {
        "id": "217666",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "玉环市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YuHuan",
        "lng": null,
        "lat": null
    }, {
        "id": "217998",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "三门县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "SanMen",
        "lng": null,
        "lat": null
    }, {
        "id": "218534",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "天台县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "TianTai",
        "lng": null,
        "lat": null
    }, {
        "id": "219162",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "仙居县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "XianJu",
        "lng": null,
        "lat": null
    }, {
        "id": "219609",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "温岭市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "WenLing",
        "lng": null,
        "lat": null
    }, {
        "id": "220555",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "临海市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LinHai",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}, {
    "id": "221610",
    "parentId": "191019",
    "level": 1,
    "areaCode": 331100000000,
    "zipCode": 323000,
    "cityCode": "\u0000",
    "name": "丽水市",
    "shortName": "丽水",
    "mergerName": "浙江,丽水",
    "pinYin": "LiShui",
    "lng": 119.922796,
    "lat": 28.467630,
    "children": [{
        "id": "221612",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "莲都区",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LianDu",
        "lng": null,
        "lat": null
    }, {
        "id": "221903",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "青田县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "QingTian",
        "lng": null,
        "lat": null
    }, {
        "id": "222380",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "缙云县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JinYun",
        "lng": null,
        "lat": null
    }, {
        "id": "222658",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "遂昌县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "SuiChang",
        "lng": null,
        "lat": null
    }, {
        "id": "222890",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "松阳县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "SongYang",
        "lng": null,
        "lat": null
    }, {
        "id": "223324",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "云和县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "YunHe",
        "lng": null,
        "lat": null
    }, {
        "id": "223512",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "庆元县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "QingYuan",
        "lng": null,
        "lat": null
    }, {
        "id": "223885",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "景宁畲族自治县",
        "shortName": null,
        "mergerName": null,
        "pinYin": "JingNing",
        "lng": null,
        "lat": null
    }, {
        "id": "224172",
        "parentId": null,
        "level": 0,
        "areaCode": 0,
        "zipCode": 0,
        "cityCode": null,
        "name": "龙泉市",
        "shortName": null,
        "mergerName": null,
        "pinYin": "LongQuan",
        "lng": null,
        "lat": null
    }],
    "listDto": null
}
]
}
const bdStyle = [
    {
        "featureType": "background",
        "elementType": "all",
        "stylers": {
            "color": "#00252cff"
        }
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": {
            "color": "#022528ff"
        }
    },
    {
        "featureType": "poilabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": {
            "color": "#5b88b175"
        }
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "highway",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "manmade",
        "elementType": "labels",
        "stylers": {
            "color": "#5b88b175",
            "visibility": "off"
        }
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": {
            "color": "#02323eff"
        }
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": {
            "color": "#000000ff",
            "visibility": "off"
        }
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": {
            "color": "#ffffff2e"
        }
    } 

]
map.setMapStyle({styleJson:bdStyle});
map.centerAndZoom(new BMap.Point(120.15507,30.274084), 8);
map.disableDoubleClickZoom();
map.enableScrollWheelZoom()
map.enableScrollWheelZoom();
map.addEventListener("load",function(){
    map.setMinZoom(8);
})
let regionArr = JSON.parse(JSON.stringify(regions));
const createPromise=(fun)=>{
    let p = new Promise(function(resolve,reject){
        resolve(fun())

    })
    return p;
};
const centerMap =(bdmap,lng=0,lat=0)=> {
    // console.log(bdmap)
    let overlays = bdmap.getOverlays();
    let _paths = [];
    if(overlays && overlays.length){
        for(let i = 0;i<overlays.length;i++){
            if(overlays[i].getPath){
                _paths = _paths.concat(overlays[i].getPath())
            }
        }
        bdmap.setViewport(_paths);
        let t = true;
        bdmap.addEventListener("tilesloaded",function(){
            if(t){
                t=false;
                let v = bdmap.getViewport();
                bdmap.centerAndZoom(new BMap.Point(v.center.lng - lng, v.center.lat - lat), 8);
            }
        });
    }
}
let currentCity = '浙江省';
_getboundry = (text,val,len,_index,city)=>{
    let that = this;
    let bdary = new BMap.Boundary();
    let plyObjectArr = [];
    let labelObjectArr = [];
    let overArr = [];

    let text1 = text;
    if(text.indexOf('普陀')>-1){
        text1 = "舟山市普陀区";
    }
    if(text.indexOf('西湖')>-1){
        text1 = "杭州市西湖区";
    }
    bdary.get(text1,function(rs){
        let count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
            that.nocountNum++;
            if(len && len == (promiseArr.length+that.nocountNum)){
                Promise.all(promiseArr).then(res=>{
                    // centerMap(map,3.3,0);
                    console.log(1)
                })
            }
            return ;
        }
        // centerMap(map,3.3,0);
        for(let i = 0; i < count; i++){
            let ply = new BMap.Polygon(rs.boundaries[i], {
                strokeWeight: 1,
                strokeColor:"#0cfeff",
                strokeOpacity:'.5',
                fillColor:'#0CFEFF',
                fillOpacity:"0.1"}); //建立多边形覆盖物
            ply.val = val;
            ply.objIndex = _index;
            ply.cityName = text;
            plogonLen = i;
            promiseArr.push(ply)
            map.addOverlay(ply);
            let areaGeo = new BMap.Geocoder();
            areaGeo.getPoint(text1,function(point){
                const label = new BMap.Label(text,{position:point})
                if(text.indexOf("杭州")>-1){
                    label.setOffset(new BMap.Size(-80, 30))
                }
                if(text.indexOf("舟山")>-1){
                    label.setOffset(new BMap.Size(0, -30))
                }
                if(text.indexOf("湖州")>-1){
                    label.setOffset(new BMap.Size(-50, 0))
                }
                if(text.indexOf("柯桥")>-1){
                    label.setOffset(new BMap.Size(-50, 0))
                }
                label.setStyle({
                    color:'#fff',
                    border:'none',
                    background:"none",
                    cursor:'pointer'
                })
                map.addOverlay(label);
                ply.addEventListener("click",function(e){
                    if(val && val.children){
                        map.clearOverlays();
                        map.setZoom(9);
                        currentCity = text;
                        // that.leftReq((text =="" ? 1 :2),text)
                        _initZjHotAndRegion(text);

                    }
                    return false;
                })
                ply.addEventListener('mouseover',function(e){
                    label.setStyle({color:'#000'});
                    ply.setFillColor('yellow')
                    ply.setFillOpacity('1')
                })
                ply.addEventListener('mouseout',function(e){
                    label.setStyle({color:'#fff'});
                    ply.setFillColor('0cfeff')
                    ply.setFillOpacity('0.1')
                })
            })

        }
        
    })
}
_initZjHotAndRegion = (text)=>{
    let that = this;

        that.nocountNum = 0;
        that.promiseArr = [];
        let temp = regionArr.data;
        
        if(text!="浙江省"){
            temp =  temp.filter((item)=>{
                if(text == item.name){
                    return item ;
                }
            })
            temp = temp[0].children
        }
        console.log(temp)
        for(let i=0;i<temp.length;i++){
            that._getboundry(temp[i].name,temp[i],temp.length,i,text)
        }
    

}
_initZjHotAndRegion("浙江省");

