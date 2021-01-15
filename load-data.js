const clientData = require('./data.json')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

const types = {
  'A': [1, false],
  'B': [2, false],
  'C': [3, false],
  'D': [4, false]
}
const countries = {}
const owners = {}

const migrateData = async function (data) {
  await sequelize.query(`INSERT INTO email_type VALUES(0, '-')`)
  for (let i =0; i < data.length; i++) {
    if (!owners[data[i].owner]) {
      let ownerId = await sequelize.query(`INSERT INTO owner VALUES(null, '${data[i].owner}')`)
      owners[data[i].owner] = ownerId[0]
    }
    if (!countries[data[i].country]) {
      let countryId = await sequelize.query(`INSERT INTO country VALUES(null, '${data[i].country}')`)
      countries[data[i].country] = countryId[0]
    }
    if (data[i].emailType !== null && !types[data[i].emailType][1]) {
      await sequelize.query(`INSERT INTO email_type VALUES(${types[data[i].emailType][0]}, '${data[i].emailType}')`)
      types[data[i].emailType][1] = true
    }
    await sequelize.query(`INSERT INTO client VALUES(null,
                                                      '${data[i].name.split(' ')[0]}',
                                                      '${data[i].name.split(' ')[1]}',
                                                      '${data[i].email}',
                                                      '${data[i].firstContact}',
                                                      ${data[i].sold ? 1 : 0},
                                                      ${owners[data[i].owner]},
                                                      ${countries[data[i].country]},
                                                      ${data[i].emailType ? types[data[i].emailType][0] : 0})`)
  }
}

// migrateData(clientData)