const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

router.get('/clients', async function(req, res) {
  let [clientData] = await sequelize.query(`SELECT client.id, first_name, last_name, email, first_contact, sold, email_type.type, country.name AS country, owner.name AS owner
                                            FROM client
                                            JOIN email_type ON email_type.id = client.email_type_id
                                            JOIN country ON country.id = client.country_id
                                            JOIN owner ON owner.id = client.owner_id
                                            ORDER BY client.id DESC`)
  let [countryData] = await sequelize.query(`SELECT id, name
                                              FROM country
                                              ORDER BY id ASC`)
  let [ownerData] = await sequelize.query(`SELECT id, name
                                              FROM owner
                                              ORDER BY id ASC`)
  res.send({ clientData, countryData, ownerData })
})

router.put('/client', async function(req, res) {
  let client = {...req.body}
  if (client.newCountry) {
    let countryId = await sequelize.query(`INSERT INTO country VALUES(null, '${client.newCountry}')`)
    client.country_id = countryId[0]
  }
  await sequelize.query(`UPDATE client
                          SET first_name = '${client.first_name}',
                              last_name = '${client.last_name}',
                              email = '${client.email}',
                              first_contact = '${client.first_contact}',
                              sold = ${client.sold},
                              owner_id = ${client.owner_id},
                              country_id = ${client.country_id},
                              email_type_id = ${client.email_type_id}
                          WHERE id = ${client.id}`)
  res.send('done')
})

router.post('/client', async function(req, res) {
  let client = {...req.body}
  if (client.newCountry) {
    let countryId = await sequelize.query(`INSERT INTO country VALUES(null, '${client.newCountry}')`)
    client.country_id = countryId[0]
  }
  await sequelize.query(`INSERT INTO client
                          VALUES(null,
                              '${client.first_name}',
                              '${client.last_name}',
                              '${client.email}',
                              '${client.first_contact}',
                              0,
                              ${client.owner_id},
                              ${client.country_id},
                              0)`)
  res.send('done')
})

router.get('/topEmployees', async function(req, res) {
  let [topEmployees] = await sequelize.query(`SELECT owner.name AS name ,COUNT(*) as sales 
                                            FROM client
                                            JOIN owner ON client.owner_id = owner.id
                                            WHERE client.sold = 1
                                            GROUP BY client.owner_id
                                            ORDER BY sales DESC`)
  res.send(topEmployees.splice(0, 3))
})

router.get('/salesByCountry', async function(req, res) {
  let [salesByCountry] = await sequelize.query(`SELECT country.name AS name ,COUNT(*) as sales 
                                                FROM client
                                                JOIN country ON client.country_id = country.id
                                                WHERE client.sold = 1
                                                GROUP BY client.country_id`)
  res.send(salesByCountry)
})

module.exports = router