function getTotalBooksCount(books) {
 return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let total=0;
  books.forEach((book)=>{
    book.borrows.forEach((borrow)=>{
      if(borrow.returned===false){
       total +=1 
      }
    })
  })
  return total
}

function getMostCommonGenres(books=[]) {
   const trackerObj={}
   books.forEach((book)=>{
    if(trackerObj[book.genre]=== undefined){
trackerObj[book.genre]= 1
    }else{
        trackerObj[book.genre] +=1
    }
   })
   let result=[]
   for(let genreKey in trackerObj){
     let info= {name: genreKey, count: trackerObj[genreKey]}
     result.push(info)
   }
 const sortedInfo= result.sort((elementA, elementB)=>{
    return elementB.count-elementA.count
  })
 
  return (sortedInfo.slice(0,5))

}

function getMostPopularBooks(books) {
 let bookList=[]
 books.forEach((book)=>{
    bookList.push({name:book.title, count:book.borrows.length})
  })
 //console.log(bookList) 
 const sortedBookList= bookList.sort((elementA, elementB)=>{
    return elementB.count-elementA.count
  })
 //console.log(sortedBookList)
 return(sortedBookList.slice(0,5))
}

function countBorrowsHelper(book) {
    return book.borrows.length;
  }
function getMostPopularAuthors(books, authors) {
  const authorStats = authors.map(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const totalBorrows = authorBooks.reduce((acc, book) => acc + (countBorrowsHelper(book)), 0);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: totalBorrows
    };
  });

  // Sort authorStats by borrows and limit to top five
  const topAuthors = authorStats.sort((a, b) => b.count - a.count).slice(0, 5);
console.log(topAuthors)
  // Extract just the author names from topAuthors
  return topAuthors
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
