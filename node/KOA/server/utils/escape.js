
import mysql from 'mysql'

export default function escape(template, ...subs) {
	console.log(template);
	console.log(...subs);
    let result = ''
    for (let i = 0; i < subs.length; i++) {
        result += template[i]
        result += mysql.escape(subs[i])
    }
    result += template[template.length - 1]
    return result
}