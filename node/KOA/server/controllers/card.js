import Card from '../models/card.js'

class CardControllers {
	//获取当前所有的card列表
    async getCardList(ctx) {
       const result=await Card.getAllCards(ctx.request.body.fields)
       console.log(result);
        ctx.body = result;
    }
    
    //添加了一组新的卡牌
	async setCarList(ctx){
		const card=ctx.request.body.fields;
		const result=await Card.addCard(card);
		if(result.affectedRows===1){
			ctx.body={
				success:true
			}
		}else{
			ctx.body={
				success:false,
				detail:"插入失败"
			}
		}
	}
	
	//编辑卡牌根据id和userId
	async editCard(ctx){
		const card=ctx.request.body.fields;
		const result=await Card.updateCard(card);
		if(result.affectedRows===1){
			ctx.body={
				success:true
			}
		}else{
			ctx.body={
				success:false,
				detail:"更新失败"
			}
		}
	}
	//点赞，如果在表中已经存在数据则表示已经点过赞了。
	async likeCard(ctx){
		const card=ctx.request.body.fields;
		const result=await Card.findLikeCard(card);
		
		console.log("输出用户的之前是否点过赞")
		const total=result[0]['count(*)'];
		console.log(total);
		if(total>=1){
			ctx.body={
				success:false,
				detail:"你已经点过赞了"
			}
			return ;
		}
		
		const result2=await Card.likeCard(card);
		console.log(typeof(result[0]));
		console.log(result2[0].affectedRows)
		console.log(result2[1].affectedRows)
		if(result2[0].affectedRows==1&&result2[1].affectedRows==1){
			ctx.body={
				success:true
			}
		}else{
			ctx.body={
				success:false,
				detail:"点赞失败"
			}
		}
		
	}
}

export default new CardControllers()