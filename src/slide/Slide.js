import PropTypes from 'prop-types';
import React, { Component } from 'react';
import pic1 from './1.jpg';
import pic2 from './2.jpg';
import pic3 from './3.jpg';
import './Slide.css';
const  $  =  window.$ ;
class Slide extends Component {
    state = {
      selectedIndex: 0
    }
    selectedIndex = 0;
    locked = false;
    timer = null;
    pagesNum = 3;

    componentDidMount() {
        this.$Silder = $(this.refs['sliderPage']);
        this.timer = setTimeout(this.autoMove, 1500);
        this.pageWidth = this.props.width;
    }

    moveToIndex = (index) => {
        const $Silder = this.$Silder;
        const newLeft = - (index + 1) * this.pageWidth;
        this.selectedIndex = index;
        $Silder.animate({left: newLeft + 'px'}, () => {
            if (index === -1){
                const changeLeft = -this.pagesNum * this.pageWidth;
                $Silder.css({left: changeLeft + 'px'});
                this.selectedIndex = this.pagesNum - 1;
            }
            if (index === this.pagesNum){
                const changeLeft = -this.pageWidth;
                $Silder.css({left: changeLeft + 'px'});
                this.selectedIndex = 0;
            }
            this.changeIndex();
            this.locked = false;
            this.timer = setTimeout(this.autoMove, 1500);
        });
    }

    autoMove = () => {
        const newIndex = this.selectedIndex + 1;
        if (this.locked) {
            return;
        }
        this.locked = true;
        clearTimeout(this.timer);
        this.moveToIndex(newIndex)
    }

    changeIndex () {
        const index = this.selectedIndex;
        this.setState({
          selectedIndex: index
        })
    }

    clickDot = (index, e) => {
        if (this.locked) {
          return;
        }
        this.locked = true;
        clearTimeout(this.timer);
        this.moveToIndex(index)
        e.stopPropagation();
    }


    touchStart = (e) => {
        if (this.locked) {
          return;
        }
        clearTimeout(this.timer);
        this.locked = true;

        this.startX= e.changedTouches[0].pageX;
        this.startY= e.changedTouches[0].pageY;
        this.silderLeft = this.$Silder.position().left;
      }
    touchMove = (e) => {
        this.endX= e.changedTouches[0].pageX;
        this.endY= e.changedTouches[0].pageY;
        let disX = this.endX - this.startX;
        let disY = this.endY - this.startY;
        
        if(Math.abs(disX) > Math.abs(disY)) {
            this.$Silder.css({left: this.silderLeft + disX + 'px'});
        }
        e.preventDefault();
      }
    touchEnd = (e) => {
        this.endX= e.changedTouches[0].pageX;
        this.endY= e.changedTouches[0].pageY;
        let disX = this.endX - this.startX;
        let disY = this.endY - this.startY;
        if(Math.abs(disX) > Math.abs(disY) && Math.abs(disX) > 30) {
          // 有效的滑动
          if (disX > 0) {
            // 向右滑
            this.moveToIndex(this.selectedIndex - 1)
          } else {
            this.moveToIndex(this.selectedIndex + 1)
          }
        } else {
          // 无效的滑动，图片需要滚回原位置
          this.$Silder.animate({left: this.silderLeft + 'px'});  
          this.locked = false;
          this.timer = setTimeout(this.autoMove, 1500);    
        }
    }

    render() {

        const {width, height} = this.props;
        const pagesNum = this.pagesNum;
        const indexArr = [...(new Array(pagesNum)).keys()];;
        const selectedIndex = this.state.selectedIndex;
        return (
        <div>
            <div className='slide' style={{ width : width+'px', height: height+'px'}} 
              onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                <ul className='slidePage'  style={{ width : (pagesNum + 2) * width+'px', height: height+'px', left: -width}} ref={ "sliderPage" }>
                  <li className='page' style={{width : width+'px', height: height+'px'}}>
                    <img src={pic3} alt=""/>
                  </li>
                  <li className='page' style={{width : width+'px', height: height+'px'}}>
                    <img src={pic2} alt=""/>
                  </li>
                  <li className='page' style={{width : width+'px', height: height+'px'}}>
                    <img src={pic1} alt=""/>
                  </li>
                  <li className='page' style={{width : width+'px', height: height+'px'}}>
                    <img src={pic3} alt=""/>
                  </li>
                  <li className='page' style={{width : width+'px', height: height+'px'}}>
                    <img src={pic2} alt=""/>
                  </li>
                </ul>
                <div className='indexWrapper'>
                  {indexArr.map((number, index) =>
                    <span key={number.toString()} className={selectedIndex === number ? 'active' : ''}  onClick={(e) =>{this.clickDot(index, e)}}></span>
                  )}
                </div>
            </div>
        </div>
        );
    }
}

Slide.propTypes = {};

export default Slide;