import query from '../utils/query'
import escape from '../utils/escape'
class Cards {
	
    async getAllCards({userId}) {
    	console.log(escape`SELECT c.*,d.* FROM (select name,createTime,cardgroup,introdution,cardMode,peoplelike from card) c,(select count(*) from userLikeCards WHERE cardId=c.id AND userId=${userId}) d`);
        return await query(escape`SELECT c.*,d.* FROM (select name,createTime,cardgroup,introdution,cardMode,peoplelike from card) c,(select count(*) from userLikeCards WHERE cardId=c.id AND userId=${userId}) d`)
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
	
//  async addBook({name, author, score}) {
//      return await query(escape`INSERT INTO RD_LIST SET name=${name},author=${author},score=${score}`)
//  }
//
//  async updateBook(id, {name, author, score}) {
//      return await query(escape`UPDATE RD_LIST SET name=${name},author=${author},score=${score} WHERE id=${id}`)
//  }
//
//  async deleteBook(id) {
//      return await query(escape`DELETE FROM RD_LIST WHERE id=${id}`)
//  }
}

export default new Cards()