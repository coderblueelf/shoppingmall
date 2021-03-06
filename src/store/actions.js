export default {
    addToCart(context, payload) {
        return new Promise((resolve, reject) => {
          //查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  
        //判断oldProduct是否存在
        if(oldProduct){
          context.commit('addCounter', oldProduct)
          resolve('当前的商品数量+1')
        }else {
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('添加了新的商品')
        }
        })
      }
}