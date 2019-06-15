require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

function searchByItemName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log('SEARCH TERM', { searchTerm })
      console.log(result)
    })
}

searchByItemName('urger')

function paginateItems(page) {
  const limit = 6
  const offset = limit * (page - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(limit)
    .offset(offset)
    .then(result => {
      console.log('PAGINATE ITEMS', { page })
      console.log(result)
    })
}

paginateItems(2)

function productsAddedDaysAgo(daysAgo) { 
    knexInstance .select('id', 'name', 'price', 'date_added', 'checked', 'category') 
    .from('shopping_list') 
    .where( 'date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo) ) 
    .then(results => { 
        console.log(results) 
    }) 
}

productsAddedDaysAgo(30)

function totalCategoryCosts() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price AS total')
        .then(result => {
            console.log(result)
        })
}

totalCategoryCosts()
  
