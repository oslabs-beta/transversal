// const User = {
//   firstName: String,
//   lastName: String,
//   age: Number,
//   ref: [Test]
// }

// const Test = {
//   score: Number,
//   date: Date
// }

// const customUser = {
//   firstName: String,
//   lastName: String,
//   score: Number
// }

// const customGqlSchema = {
//   firstName: {type: GraphQLString},
//   lastName:  {type: GraphQLString},
//   score:  {type: {
//   key: String,
//   key2: String
// }}
// }

// const resolver = {
//   const res = mongoose.populate(User, Test)
//   return res
// }

// const RootSchema = {
//   getUsers: {
//     type: GQLList(User)
//   }
//   getCustomQuery: {
//     type: GQLList(customuser)
//   }
// }

// const gql = `
//   query MYQUERY($args: String) {
//     getCustomQuery(args: $args) {
//       firstName
//       lastName
//       height
//     }
//   }
// `

// args = 'firstName' | 'lastName' | 'height'
