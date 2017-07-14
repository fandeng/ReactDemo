'use strict';
import REQUEST_JSON from './Request.json';
var React = require('react-native');
import Response from '../Data/Response.json';


var API_BASE_URL = '请求';
var API_BASE_UPLOAD_URL = "上传t";

var isDemo= true;

function parseDateFromYYYYMMdd(str) {
  if (!str) return new Date();
  return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
}

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

function DataRepository() { // Singleton pattern
  if (typeof DataRepository.instance === 'object') {
    return DataRepository.instance;
  }

  DataRepository.instance = this;
}

DataRepository.prototype._safeFetchDemo = function(code: string) {
  return new Promise((resolve, reject) => {
    resolve(Response[code]);
  });
};

DataRepository.prototype._safeFetchPost = function(reqUrl: string,data: string) {
  console.log('reqUrl', reqUrl);
  return new Promise((resolve, reject) => {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'text/html;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:'data='+data+''//这里我参数只有一个data,大家可以还有更多的参数
    };

    fetch(reqUrl, fetchOptions)
        .then((response) => response.json())
        .then((responseJson) => {

          var retinfo = responseJson.response_head.retinfo;

          if(retinfo){
            reject(retinfo);
          }

          if(retinfo.retcode){
             reject(retinfo);
          } else if (0 == retinfo.retcode){
              resolve(responseJson);
          } else if (1001 == retinfo.retcode || 1002 == retinfo.retcode || 1003 == retinfo.retcode || 1004 == retinfo.retcode){
            reject(retinfo);
          } else {
            reject(retinfo);
          }
        })
        .catch((error) => {
          console.error(error);
          resolve(null);
        });
  });
};

DataRepository.prototype._safeFetchUpload = function(data: string) {
  return new Promise((resolve, reject) => {
    let uri = data;
    let formData = new FormData();
    let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};

    formData.append("images",file);

    let url = API_BASE_UPLOAD_URL;
    fetch(url,{
      method:'POST',
      headers:{
        'Accept': 'text/html;charset=UTF-8',
        'Content-Type':'multipart/form-data',
        'fileName':'image.png',
        'phonetype':'IOS',
        'fileType':'9001'
      },
      body:formData,
    }) .then(
        (response) => {
          resolve(response.headers.map.attchurl);
        }
        )
        .catch((error)=>{console.error('error',error)});
  });
};

DataRepository.prototype.launchRequest = function(code: string, data: Object,
    callback?: ?(error: ?Error, result: ?Object) => void
) {

  if(isDemo){
    return this._safeFetchDemo(code);
  } else {
    var reqUrl = API_BASE_URL;
    var requestData = REQUEST_JSON.BASE_REQUEST;
    requestData.request_head.app_version = '2.0';
    requestData.request_head.appid='bl';
    requestData.request_head.process_code=code;
    var date = new Date();
    requestData.request_head.req_time=date.getTime();
    requestData.request_head.token='';
    requestData.request_head.uid='DeviceInfo.getUniqueID()';
    requestData.request_body = data;
    var networking = this._safeFetchPost(reqUrl , JSON.stringify(requestData));
    return networking;
  }

};

DataRepository.prototype.uploadImage = function(file: string, callback?: ?(error: ?Error, result: ?Object) => void
) {
    var networking = this._safeFetchUpload(file);
    return networking;

};

module.exports = DataRepository;
