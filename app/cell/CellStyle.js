//cell显示样式
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

import ColumnCell from '../cell/ColumnCell';
import NewsCell from '../cell/NewsCell';
import TitleCell from '../cell/TitleCell';
import VideoCell from '../cell/VideoCell';
import AdvertCell from '../cell/AdvertCell';
import CarouselCell from '../cell/CarouselCell';
import HorizontalCell from '../cell/HorizontalCell';
import WaterfallCell from '../cell/WaterfallCell';
import ArticleCell from '../cell/ArticleCell';
import AdvertSmallCell from '../cell/AdvertSmallCell';

export default class CellStyle extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    return (
      this.renderItems(data)
    );
  }
  //不同样式items
  renderItems(data){
     if (data.styleid == '0') {
         return (
             <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
               <VideoCell data={data}/>
             </TouchableOpacity>
         );
    }
    else if (data.styleid =='1') {
         return (
           <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
              <ColumnCell data={data}/>
           </TouchableOpacity>
         )
    }
    else if (data.styleid =='2') {
         return (
           <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
              <NewsCell data={data}/>
           </TouchableOpacity>
         )
     }
     else if (data.styleid == '3') {
       return (
         <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
            <AdvertCell data={data}/>
         </TouchableOpacity>
       );
     }
     else if (data.styleid == '4') {
       return (
         <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
            <TitleCell data={data} type={true}/>
         </TouchableOpacity>
       );
     }
     else if (data.styleid == '5') {
       return (
         <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
            <TitleCell data={data} type={false}/>
         </TouchableOpacity>
       );
     }
     else if (data.styleid=='6') {
       return (
         <CarouselCell data={[]}
          viewPagerCheck={(data)=>{this.props.onPressFeedItem(data)}}
         />
       );
     }
     else if (data.styleid=='7') {
       return (
         <WaterfallCell data={[]}
          clickWaterfallAction={(data)=>{this.props.onPressFeedItem(data)}}
         />
       );
     }
     else if (data.styleid == '8') {
       return (
         <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
            <ArticleCell data={data} />
         </TouchableOpacity>
       );
     }
     else if (data.styleid == '9') {
       return (
         <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
            <AdvertSmallCell data={data} />
         </TouchableOpacity>
       );
     }
     else if (data.styleid =='10') {
       return (
          <HorizontalCell data={[]}
           clickVideoAction = {(data)=>this.props.onPressFeedItem(data)}
          />
        );
     }
     else {
       return (
         <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}>
            <NewsCell data={data}/>
         </TouchableOpacity>
       )
     }

  }
}
