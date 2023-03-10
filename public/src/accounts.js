function findAccountById(accounts, id) {
     return accounts.find((item)=>item.id===id)
}

function sortAccountsByLastName(accounts) {
    let list= accounts.sort((a, b)=>{
    return a.name.last.toLowerCase()<b.name.last.toLowerCase() ? -1 : 1
  })
  return list
}

function getTotalNumberOfBorrows(account, books) {
  let quantity = 0;
  books.forEach((bookObj) => {
    const borrowsArray = bookObj.borrows;
    const matchingBooksArray = borrowsArray.filter((item) => item.id === account.id);
    quantity += matchingBooksArray.length;
  });
  return quantity;
}

function getBooksPossessedByAccount(account, books, authors) {
  const { id: givenAccountId } = account;
  const result = [];
//loops through all fo the books in the books array
  for (const bookObj of books) {
    // sets borrows equal to bookObj.borrows
    const { borrows } = bookObj;
//returns true or false, 
    const isBorrowedByAccount = borrows.some((borrowObj) => {
// condition is if the borrowed id matches the given id AND if the book is NOT returned
      return borrowObj.id === givenAccountId && !borrowObj.returned;
    });
// if true for the current book we need to find the author whose id matches up with the current books author id
    if (isBorrowedByAccount) {
      const authorOfBook = authors.find((authorObj) => authorObj.id === bookObj.authorId);
      // creates the array that has the book and adds the author
      const bookWithAuthor = { ...bookObj, author: authorOfBook };
      //pushes the array we just created into the result array
      result.push(bookWithAuthor);
    }
  }
//returns the array
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
