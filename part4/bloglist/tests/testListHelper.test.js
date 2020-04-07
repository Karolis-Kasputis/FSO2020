const listHelper = require('../utils/list_helper')

const blogList = [
    { 
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7, __v: 0
    },
    { 
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5, __v: 0 
    }, 
    { 
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0 
    },
    { 
        _id: "5a422b891b54a676234d17fa", 
        title: "First class tests", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
        likes: 10, 
        __v: 0 
    }, 
    { 
        _id: "5a422ba71b54a676234d17fb", 
        title: "TDD harms architecture", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
        likes: 0, __v: 0 
    }, 
    { 
        _id: "5a422bc61b54a676234d17fc", 
        title: "Type wars", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
        likes: 2, __v: 0 
    }
]

const blogListZero = []
const blogListOne = [
    { 
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
         likes: 7, __v: 0
    },
]
const blogListThree = [
    { 
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
         likes: 7, __v: 0
    },
    { 
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5, __v: 0 
    }, 
    { 
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0 
    },
]

describe('total likes', () => {
    test('when list has 0 lists equals the likes that', () => {
        const result = listHelper.totalLikes(blogListZero)
        expect(result).toBe(0)
    })
    test('when list has 1 lists 7 likes equals the likes that', () => {
        const result = listHelper.totalLikes(blogListOne)
        expect(result).toBe(7)
    })
    test('when list has 3 lists 24 likes equals the likes that', () => {
        const result = listHelper.totalLikes(blogListThree)
        expect(result).toBe(24)
    })
    test('when list has 6 lists 36 likes equals the likes that', () => {
        const result = listHelper.totalLikes(blogList)
        expect(result).toBe(36)
    })

})

describe('Favorite blog', () => {
    
    test('from an empty blogpost is', ()=> {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(undefined)
    })
    test('from a blogpost with many entries is', ()=> {
        const result = listHelper.favoriteBlog(blogList)
        expect(result).toEqual(
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            }
        )
    })
})

describe('Most likes by author', () => {
    test('empty list', () => {
        const result = listHelper.mostLikes(blogListZero)
        expect(result).toMatchObject([])        
    })
    test('full list', () => {
        const result = listHelper.mostLikes(blogList)
        
        expect(result).toEqual( 
            [
                { author: 'Michael Chan', likes: 7 },
                { author: 'Edsger W. Dijkstra', likes: 17 },
                { author: 'Robert C. Martin', likes: 12 }
            ]
        )
    })
})