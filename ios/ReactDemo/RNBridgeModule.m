//
//  RNBridgeModule.m
//  hunheDemo
//
//  Created by 江清清 on 16/6/5.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import "RNBridgeModule.h"

#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import "ViewController.h"

@implementation RNBridgeModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNBridgeModule)

/**
 *  RN传参数调用原生OC,并且返回数据给RN  通过CallBack回调
 *  @param jsonString 传值
 *  @return 返回 成功或失败
 */
RCT_EXPORT_METHOD(rnInvokeOCCallBack:(NSString *)jsonString callback:(RCTResponseSenderBlock)callback){
  NSDictionary * dic = [self dictionaryWithJsonString:jsonString];
  if (dic) {
    callback(@[[NSNull null], @"CallBack回调成功"]);
  } else {
    callback(@[[NSNull null], @"CallBack回调失败"]);
  }
}
//RN传参数调用原生OC,并且返回数据给RN  通过Promise异步的
RCT_EXPORT_METHOD(RNInvokeOCPromise:(NSDictionary *)dictionary resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSLog(@"接收到RN传过来的数据为:%@",dictionary);
  NSString *value=[dictionary objectForKey:@"id"];
  if(value.length > 0){
    resolve(@"回调成功啦,Promise...");
  }else{
    NSError *error=[NSError errorWithDomain:@"传入的name不符合要求,回调失败啦,Promise..." code:100 userInfo:nil];
    reject(@"100",@"传入的name不符合要求,回调失败啦,Promise...",error);
  }
  
}

//RN跳转原生界面
RCT_EXPORT_METHOD(rnInvokeChatView:(NSString *)jsonString){
  
  dispatch_sync(dispatch_get_main_queue(), ^{
    NSDictionary * dic = [self dictionaryWithJsonString:jsonString];
    UIViewController * controller  = [UIApplication sharedApplication].keyWindow.rootViewController;
    ViewController * chatVC = [ViewController new];
    chatVC.content = dic[@"content"];
    UINavigationController * NC = [[UINavigationController alloc] initWithRootViewController:chatVC];
    [NC.navigationBar setBarTintColor:[UIColor whiteColor]];
    [controller presentViewController:NC animated:YES completion:nil];
  });
}

//OC调用RN
RCT_EXPORT_METHOD(rnInvokeMessageNotification){
  NSError *parseError = nil;
  NSDictionary * dic = @{@"content":@"oc调用RN"};
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&parseError];
  NSString * json =  [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  [self.bridge.eventDispatcher sendAppEventWithName:@"rnInvokeMessageNotification" body:json];

}

//json字符串转字典
- (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString {
  if (jsonString == nil) {
    return nil;
  }
  NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  NSError *err;
  NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                      options:NSJSONReadingMutableContainers
                                                        error:&err];
  if(err) {
    NSLog(@"json解析失败error:[%@] andString:[%@]",err,jsonString);
    return nil;
  }
  NSLog(@"server call back:[%@]",dic);
  return dic;
}


@end
