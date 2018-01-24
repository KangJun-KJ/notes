
import mysql from 'mysql'
import fs from 'fs'
import path from 'path'
import { db, dbName } from '../config/'

const pool = mysql.createPool(db);
export default function query(sql, values) {
	return new Promise((resolve, reject) => {
		pool.query(sql, function(err, rows) {
			if(err) {
				reject(err);
			} else {
				resolve(rows);
			}
		})
	})
}