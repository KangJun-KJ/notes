import query from '../utils/query'
import escape from '../utils/escape'
class Cards {
	
    async getAllCards({userId,pageNow=1,pageSize=5}) {
        return await query(escape`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} GROUP BY a.id,a.userid limit ${(pageNow-1)*pageSize},${pageNow*pageSize}`);
    }
	async addCard({name,userid,createtime,cardgroup,introdution,mode}){
		return 	await query(escape`INSERT INTO card SET name=${name},userid=${userid},createtime=${createtime},cardgroup=${cardgroup},introdution=${introdution},cardmode=${mode},peoplelike=0`);
	}
	async updateCard({id,name,userid,createtime,cardgroup,introdution,mode}){
		return 	await query(escape`UPDATE card SET name=${name},createtime=${createtime},cardgroup=${cardgroup},introdution=${introdution},cardmode=${mode} WHERE id=${id} and userid=${userid}`);	
	}
	
	async likeCard({id,userId}){
		return await query(escape`UPDATE card SET peoplelike=peoplelike+1 where id=${id};INSERT INTO userLikeCards SET cardId=${id},userId=${userId}`);
	}
	
	async findLikeCard({id,userId}){
		return await query(escape`select count(*) from userLikeCards Where cardId=${id} AND userId=${userId}`);
	}
	
	async cancelLike({id,userId}){
		
	}
}

export default new Cards()