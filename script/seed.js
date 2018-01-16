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
const {Product, Category, User, Review} = require('../server/db/models')

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
    Category.create({name: 'Weapon'}),
    Category.create({name: 'Sword'}),
    Category.create({name: 'Axe'}),
    Category.create({name: 'Armor'}),
    Category.create({name: 'Shield'}),
    Category.create({name: 'Helmet'})
  ])

  const users = await Promise.all([
    User.create({email: 'ben@fsa.com', password: 'password'}),
    User.create({email: 'mark@fsa.com', password: 'password'}),
    User.create({email: 'sara@fsa.com', password: 'password'})
  ])


  const products = await Promise.all([
    Product.create({title: 'Small Sword', price: 10, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Big Sword', price: 20, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Demon Blade', price: 80, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Crystal Blade', price: 100, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Broadsword', price: 70, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Katana', price: 70, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Cursed Blade', price: 120, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Master Sword', price: 400, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[1]])),
    Product.create({title: 'Battle Axe', price: 200, inventory: 100, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO75E8gQnxvd0DD92OuXcsgPCfH1Kpra6oXOmezeuO8lBm_G69', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[0], categories[2]])),
    Product.create({title: 'Wooden Shield', price: 10, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[3], categories[4]])),
    Product.create({title: 'Iron Shield', price: 80, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[3], categories[4]])),
    Product.create({title: 'Blessed Shield', price: 400, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[3], categories[4]])),
    Product.create({title: 'Blessed Shield', price: 400, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[3], categories[4]])),
    Product.create({title: 'Spartan Helm', price: 150, inventory: 100, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPR4gLwqg-qlb7VG3ZNgQn9u_QMQgoEK_SkdOeLpDSvlS4o81rg', description: 'Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum. Wow. Such Lorem. Very Ipsum.'}).then(product => product.setCategories([categories[3], categories[5]])),
  ])

  // const products = await Promise.all([
  //   Product.create({title: 'Small Sword', price: 10, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Big Sword', price: 20, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Demon Blade', price: 80, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Crystal Blade', price: 100, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Broadsword', price: 70, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Katana', price: 70, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Cursed Blade', price: 120, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Master Sword', price: 400, inventory: 100, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[1])),
  //   Product.create({title: 'Battle Axe', price: 200, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31dZ6TQwmxL._SX355_.jpg'}).then(product => product.addCategory(categories[0])).then(product => product.addCategory(categories[2])),
  //   Product.create({title: 'Wooden Shield', price: 10, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg'}).then(product => product.addCategory(categories[3])).then(product => product.addCategory(categories[4])),
  //   Product.create({title: 'Iron Shield', price: 80, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg'}).then(product => product.addCategory(categories[3])).then(product => product.addCategory(categories[4])),
  //   Product.create({title: 'Blessed Shield', price: 400, inventory: 100, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gtlpuTneL._SY300_.jpg'}).then(product => product.addCategory(categories[3])).then(product => product.addCategory(categories[4]))
  // ])

  const reviews = await Promise.all([
    Review.create({ text: 'I loved this item!', rating: 5, userId: 1, productId: 1}),
    Review.create({ text: 'I hated this item!', rating: 1, userId: 2, productId: 2}),
    Review.create({ text: 'I vanquished my foes!', rating: 5, userId: 3, productId: 2}),
    Review.create({ text: 'I was defeated in battle!', rating: 2, userId: 1, productId: 2}),
    Review.create({ text: 'This item was good but it broke quickly.', rating: 3, userId: 3, productId: 3}),
    Review.create({ text: 'Close to perfect, but I had some problems', rating: 4, userId: 1, productId: 4}),
    Review.create({ text: 'Meh.', rating: 2, userId: 2, productId: 5}),
    Review.create({ text: 'I was paid to say how good this was', rating: 5, userId: 3, productId: 6}),
    Review.create({ text: 'This item changed my life.', rating: 5, userId: 1, productId: 7})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${products.length} products`)
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
