//
//  ViewController.m
//  ReactDemo
//
//  Created by 樊登 on 2017/7/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ViewController.h"
#import "NextViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UILabel *contentLabel;

@end

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.title = @"原生界面";
  _contentLabel.text = _content;
  UIBarButtonItem * leftItem = [[UIBarButtonItem alloc] initWithImage:[[UIImage imageNamed:@"ocback"]imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]  style:UIBarButtonItemStylePlain target:self action:@selector(clickBackButtonAction)];
  self.navigationItem.leftBarButtonItem = leftItem;
}

- (void)clickBackButtonAction{
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)onClickBackRNAction:(UIButton *)sender {
  NextViewController * next = [NextViewController new];
  [self.navigationController pushViewController:next animated:YES];
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
