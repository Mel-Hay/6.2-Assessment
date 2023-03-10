function findAuthorById(authors, id) {
    return authors.find((authorsId)=>{
    return authorsId.id===id
  })
}

function findBookById(books, id) {
  return books.find((book)=>{
    return book.id===id
  })
}

function partitionBooksByBorrowedStatus(books) {
  //borrowed books is any book that that has returned = to false anywhere
  const borrowedBooks=[]
  const returnedBooks=[]
  books.forEach((book)=>{
    const {borrows}=book

      
     const status= borrows.every((borrow)=> {
       return borrow.returned===true
     } )
    
     if(status){
       returnedBooks.push(book)      
     }else{
       borrowedBooks.push(book)
     }

   
  })
 return[borrowedBooks, returnedBooks]
  //returned books a book whose returrned doesnt have false anywhere
  
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const result = borrows.map(({ id, returned }) => {
    const account = accounts.find(acc => acc.id === id);
    return { ...account, returned };
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
