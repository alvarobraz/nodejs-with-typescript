import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid'
import createConnection from '../index'
// import { getConnection } from 'typeorm';


create().then(() => console.log('User admin, created!!'))
async function create() {
  const connection = await createConnection('localhost');

  const id = uuid()
  const password = await hash('admin', 8)

  await connection.query(`
  INSERT INTO USERS(id, name, email,password, "isAdmin", created_at)
  values('${id}','admin','admin@rentx.com','${password}','true','now()')
`)
  await connection.close()
}