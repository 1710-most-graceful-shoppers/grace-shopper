/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {Product, Category} = require('../server/db/models')

// const prod = [
//   {title: 'Small Sword', price: 10, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Big Sword', price: 20, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Demon Blade', price: 80, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Crystal Blade', price: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Broadsword', price: 70, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Katana', price: 70, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Cursed Blase', price: 120, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
//   {title: 'Master Sword', price: 400, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', categories: ['Sword']},
// ]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const categories = await Promise.all([
    Category.create({name: 'Sword'}),
    Category.create({name: 'Weapon'}),
    Category.create({name: 'Armor'}),
    Category.create({name: 'Spear'}),
    Category.create({name: 'Shield'})
  ])

  const products = await Promise.all([
    Product.create({title: 'Small Sword', price: 10, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Big Sword', price: 20, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Demon Blade', price: 80, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Crystal Blade', price: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Broadsword', price: 70, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Katana', price: 70, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Cursed Blade', price: 120, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Master Sword', price: 400, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Wooden Shield', price: 10, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Iron Shield', price: 80, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg'}).then(product => product.addCategory(categories[0])),
    Product.create({title: 'Blessed Shield', price: 400, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg'}).then(product => product.addCategory(categories[0]))
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${products.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
