import styles from './Special.css';
import React, {
  useEffect
} from "react"
import Link from 'umi/link'
import {
  connect
} from "dva"

const mapStateToProps = (state) => {
  return {
    specialList: state["special"]
  }
}


function Special(props) {
  useEffect(() => {
    props.dispatch({
      type: "special/special"
    }).then(() => {
      console.log(props.specialList)
    })
  })

  const products = [{
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
  ]

  return ( <
    div className = {
      styles.normal
    } >
    <
    div className = {
      styles.title
    } >
    <
    h3 id = "special" > 特价商品 < /h3> < /
    div > <
    div className = {
      styles.specialPro
    } > {
      products.map(el => {
        return ( <
          div className = {
            styles.bookBox
          } >
          <
          Link to = {
            `/products/` + el.name
          }
          className = {
            styles.boxImg
          } >
          <
          img src = {
            el.img
          }
          /> <
          p > {
            el.name
          } < /p> < /
          Link > <
          p > {
            el.info
          } < /p> <
          div className = {
            styles.price
          } > {
            "特价 ￥：" + el.price
          } < /div> < /
          div >
        )
      })
    } <
    /div> < /
    div >
  );
}


export default connect(mapStateToProps)(Special)
