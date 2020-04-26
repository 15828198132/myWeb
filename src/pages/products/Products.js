
import React, { Component } from 'react';
import styles from './Products.css';
import Link from 'umi/link'
import Header from '../header/Header'
import SearchBox from '../firstPage/search/SearchBox'
import Nav from '../firstPage/commodity/nav/Nav'
import { connect } from 'dva'
import axios from 'axios'
import { Descriptions, Carousel, Button, Tooltip, List, Avatar, Icon, Form, Input, Comment, message } from 'antd'
const { TextArea } = Input;
@connect(
  state => ({
    bookInfo: state.products
  })
)

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      submitting: false,
      value: '',
    }
  }
  //点赞、踩回调函数
  like() {
    console.log(1111)
  }
  dislike() {
    console.log(2222)
  }

  handleSubmit() {
    if(!localStorage.info){
      message.info("请登录~~")
      return
    }
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    console.log("提交")
    console.log(this.state.value,new Date())
    axios({
      method:'post',
      url:'http://localhost:7001/products/comment',
      data:{
        date:new Date(),
        username:JSON.parse(localStorage.info).username,
        content:this.state.value,
        name:this.props.match.params.name,
        img:JSON.parse(localStorage.info).headerImg
      }
    }).then(res=>{
      console.log(res)
      this.props.dispatch({ type: 'products/bookInfo', payload: { name: this.props.match.params.name } })
      this.setState({
        submitting:false,
        value:""
      })
    }).catch(err=>{
      console.log(err)
    })
  };

  handleChange(e) {
    console.log(e.target.value)
    this.setState({
      value: e.target.value,
    });
  };

  //获取书籍信息
  componentDidMount() {
    this.props.dispatch({ type: 'products/bookInfo', payload: { name: this.props.match.params.name } })
  }
  //加入购物车
  joinCart(){
    if(!localStorage.info){
      message.info("请登录~~")
      return
    }
    this.props.dispatch({type:'products/joinCarts',payload:{account:JSON.parse(localStorage.info).account,name:this.props.match.params.name,price:this.props.bookInfo.price}})
  }
  render() {
    const { comments, submitting, value } = this.state;
    const imgList = [
      'http://img3m5.ddimg.cn/56/4/23761145-2_u_3.jpg',
      'http://img3m5.ddimg.cn/56/4/23761145-2_u_3.jpg',
      'http://img3m5.ddimg.cn/56/4/23761145-2_u_3.jpg',
      'http://img3m5.ddimg.cn/56/4/23761145-2_u_3.jpg',
      'http://img3m5.ddimg.cn/56/4/23761145-2_u_3.jpg',
    ]
    let bookInfo = this.props.bookInfo
    if (bookInfo.comment == undefined) {
      bookInfo = {
        comment: []
      }
    }
    //文本域，自定义JSX组件
    return (
      <div>
        <Header />
        <div className={styles.normal}>
          <SearchBox />
          <Nav />
          <div className={styles.infoBox}>
            <Carousel autoplay className={styles.boxImg}>
              {
                imgList.map((item, index) => {
                  return (<img className={styles.img} key={item + index} src={item} />)
                })
              }
            </Carousel>
            <div className={styles.boxInfo}>
              <Descriptions bordered title="Custom Size" size='small' >
                <Descriptions.Item label="书名">{bookInfo.name}</Descriptions.Item>
                <Descriptions.Item label="作者">{bookInfo.author}</Descriptions.Item>
                <Descriptions.Item label="语种">{bookInfo.language}</Descriptions.Item>
                <Descriptions.Item label="价格">{bookInfo.price}</Descriptions.Item>
                <Descriptions.Item label="出版社">{bookInfo.press}</Descriptions.Item>
                <Descriptions.Item label="出版时间">{bookInfo.pubtime}</Descriptions.Item>
                <Descriptions.Item label="介绍">
                  {
                    bookInfo.info
                  }
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className={styles.btnBox}>
              <Button type="primary" className={styles.btn}>购买</Button>
              <Button type="danger" onClick={this.joinCart.bind(this)}>加入购物车</Button>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.commentTitle}>
              <h1 className={styles.title} style={{ "marginLeft": "20px" }}>评论 · </h1>
              <p className={styles.num}><i>{bookInfo.comment.length}</i></p>
              <h1 className={styles.title}>条</h1>
            </div>
            <div className={styles.commentContexty}>
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={bookInfo.comment}
                renderItem={item => {
                  let isliked = false;
                  let isdisliked = false;
                  //判断当前登录人是否点赞
                  if (localStorage.info&&!item.likename.every(el => {
                    return el != JSON.parse(localStorage.info).username
                  })) {
                    isliked = true
                  }
                  //判断当前登录人是否踩
                  if (localStorage.info&&!item.dislikename.every(el => {
                    return el != JSON.parse(localStorage.info).username
                  })) {
                    isdisliked = true
                  }
                  return (
                    <List.Item
                      key={item.title}
                      actions={
                        [
                          <span key="comment-basic-like">
                            <Tooltip title="赞">
                              <Icon
                                type="like"
                                theme={isliked ? 'filled' : 'outlined'}
                                onClick={this.like.bind(this)}
                              />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.like}</span>
                          </span>,
                          <span key=' key="comment-basic-dislike"'>
                            <Tooltip title="踩">
                              <Icon
                                type="dislike"
                                theme={isdisliked ? 'filled' : 'outlined'}
                                onClick={this.dislike.bind(this)}
                              />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.dislike}</span>
                          </span>,
                          <span key=' key="comment-basic-dislike"'>
                            <Tooltip title="Dislike">
                              <Icon
                                type="message"
                              />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.reply.length}</span>
                          </span>,
                        ]
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={'http://localhost:7001/public/comfiles/' + item.img} />}
                        title={<a href={item.href}>{item.username}</a>}
                        description=""
                      />
                      {item.content}
                    </List.Item>
                  )
                }}
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5
                }}
              />
              <Comment
                avatar={
                  <Avatar
                    src={localStorage.userImg}
                  />
                }
                content={
                  <div>
                    <Form.Item>
                      {localStorage.info?<TextArea rows={4} onChange={this.handleChange.bind(this)} value={value} />:<Link to="../login">未登录...</Link>}
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" loading={submitting} onClick={this.handleSubmit.bind(this)} type="primary">
                        发表
                     </Button>
                    </Form.Item>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Products