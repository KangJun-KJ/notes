import query from '../utils/query'
import escape from '../utils/escape'
class Cards {
	
    async getAllCards({userId,pageNow=1,pageSize=10}) {
        return await query(escape`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} GROUP BY a.id,a.userid limit ${(pageNow-1)*pageSize},${pageSize}`);
    }
    
    async getAllcardsByLikes({userId,pageNow=1,pageSize=10}){
    	return await query(escape`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} GROUP BY a.id,a.userid ORDER BY a.peoplelike DESC limit ${(pageNow-1)*pageSize},${pageSize}`);
    }
    
    //获取用户自己的卡组。
    async getAllCardOfMySelf({userId}){
    	return await query(escape`SELECT * FROM card WHERE userid=${userId}`)	
    }
    
    async getAllCardsByCardMode({userId,pageNow=1,pageSize=10,cardmode}){
    	if(cardmode==0){
    		return await query(escape`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND b.userid = ${userId} GROUP BY a.id,a.userid ORDER BY a.peoplelike DESC limit ${(pageNow-1)*pageSize},${pageSize}`);
    	}
    	else if(cardmode==1){
    		return await query(escape`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND b.userid = ${userId} GROUP BY a.id,a.userid ORDER BY a.createtime DESC limit ${(pageNow-1)*pageSize},${pageSize}`);
    	}
    	return await query(escape`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} WHERE a.cardmode =${cardmode} GROUP BY a.id,a.userid ORDER BY a.createtime DESC limit ${(pageNow-1)*pageSize},${pageSize}`);
    }
	async addCard({name,userId,cardgroup,introduction,mode}){
		return 	await query(escape`INSERT INTO card SET name=${name},userid=${userId},cardgroup=${cardgroup},introduction=${introduction},cardmode=${mode},peoplelike=0`);
	}
	async updateCard({id,name,userid,createtime,cardgroup,introduction,mode}){
		return 	await query(escape`UPDATE card SET name=${name},cardgroup=${cardgroup},introduction=${introduction},cardmode=${mode} WHERE id=${id} and userid=${userid}`);	
	}
	
	async likeCard({id,userId}){
		return await query(escape`UPDATE card SET peoplelike=peoplelike+1 where id=${id};INSERT INTO userLikeCards SET cardId=${id},userId=${userId}`);
	}
	
	async findLikeCard({id,userId}){
		return await query(escape`select count(*) from userLikeCards Where cardId=${id} AND userId=${userId}`);
	}
	
	async cancelLike({id,userId}){
		return await query(escape`DELETE FROM userlikecards where cardId=${id} AND userId=${userId};UPDATE card SET peoplelike=peoplelike-1 where id=${id};`);
	}
	
	async getAllCardModes(){
		return await query(escape`select * from mode`);
	}
}

export default new Cards()