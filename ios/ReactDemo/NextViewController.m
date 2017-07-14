//
//  NextViewController.m
//  ReactDemo
//
//  Created by 樊登 on 2017/7/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NextViewController.h"

@interface NextViewController ()

@property (weak, nonatomic) IBOutlet UIImageView *imgView;

@end

@implementation NextViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title=@"二级界面";
  UIBarButtonItem * leftItem = [[UIBarButtonItem alloc] initWithImage:[[UIImage imageNamed:@"ocback"]imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]  style:UIBarButtonItemStylePlain target:self action:@selector(clickBackButtonAction)];
  self.navigationItem.leftBarButtonItem = leftItem;
  
  self.imgView.image = [UIImage imageNamed:@"12.jpg"];
  
}

- (void)clickBackButtonAction{
  
  UIAlertController * alertController = [UIAlertController alertControllerWithTitle:@"温馨提示" message:@"要返回哪个界面？" preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction * backRNAction = [UIAlertAction actionWithTitle:@"返回RN" style:UIAlertActionStyleDestructive handler:^(UIAlertAction * _Nonnull action) {
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
  UIAlertAction * backOCAction = [UIAlertAction actionWithTitle:@"返回上级界面" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    [self.navigationController popViewControllerAnimated:YES];
  }];
  UIAlertAction * cancalAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
  [alertController addAction:backRNAction];
  [alertController addAction:backOCAction];
  [alertController addAction:cancalAction];
  [self presentViewController:alertController animated:YES completion:nil];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
