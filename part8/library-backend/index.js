const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()
const JWTSECRET = '123'
const MONGODB_URI =
  'mongodb+srv://brokenwatch:123qwe123@cluster0-en0lx.mongodb.net/library?retryWrites=true&w=majority'
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log('connected to', MONGODB_URI))

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Subscription {
    bookAdded: Book
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => User.findById(context.currentUser.id),
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author')
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author.name === args.author
        )
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.some((genre) => genre === args.genre)
        )
      }
      return filteredBooks
    },
    allAuthors: () => Author.find({}),
  },
  Mutation: {
    createUser: async (root, { username, favouriteGenre }) => {
      try {
        const newUser = new User({
          username,
          favouriteGenre,
          password: 'password',
        })
        await newUser.save()
        return newUser
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'password') {
        throw new AuthenticationError('Note authenticated')
      }
      const userForToken = { username: user.username, id: user._id }
      const token = jwt.sign(userForToken, JWTSECRET)
      return { value: token }
    },
    addBook: async (root, args, { currentUser }) => {
      try {
        if (currentUser.username) {
          let author = await Author.findOne({ name: args.author })
          if (!author) {
            author = new Author({ name: args.author })
            await author.save()
          }
          await Author.findByIdAndUpdate(author._id, {
            ...author._doc,
            bookCount: author.bookCount + 1,
          })
          const book = new Book({
            ...args,
            author,
          })
          await book.save()
          pubsub.publish('bookAdded', { bookAdded: book })
          return book
        } else throw new AuthenticationError('UNAUTHENTIC')
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      try {
        if (currentUser.username) {
          await Author.updateOne({ name: args.name }, { born: args.setBornTo })
          return await Author.findOne({ name: args.name })
        } else throw new AuthenticationError('UNAUTHENTICATED')
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: (x) => pubsub.asyncIterator('bookAdded'),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let currentUser = {}
    let decodedToken = null
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      decodedToken = jwt.verify(auth.substring(7), JWTSECRET)
    }
    if (decodedToken) {
      currentUser = await User.findById(decodedToken.id)
    }

    return { currentUser }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log('subs', subscriptionsUrl)
})
