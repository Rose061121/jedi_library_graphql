import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import Dropdown from '../components/global/Dropdown'
import BookTile from './BookTile'
import BookCover from '../components/book/BookCover'

const getBooksQuery = gql `
    {
        books {
            title
            id
            imageId
            bookStatus{
              id
              name
            }
        }
    }
`

const styles = {
  container: {
    width: '100%',
    height: 1000,
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bookRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20
  },
  book: {
    height: 300,
    width: 200,
  }
}



class BookList extends Component {

    displayBooks(){
        var data = this.props.data
        var books = this.props.data.books
        console.log(books)
        if(data.loading){
            return( <div>Loading Books...</div>)
        } else {
            return data.books.map(book => {
              if(book){
                return(
                <div key ={book.id} style={styles.book}>
                  <Link to={`/booklist/${book.id}`} >
                    <BookCover book={book}/>
                  </Link>
                </div>
                )

              }
              
            })
        }
    }

    render(){
      let options = [
        {value : 'reading', text: 'Reading'},
        {value: 'read', text: 'Read'}
      ]
  return (
    <div style={styles.container}>
      <Dropdown
      onClick={() => console.log('dropdown')}
      options={options} 
      defaultOption="All Books"
      select={options}/>
      <div style={styles.bookRow}>
          {this.displayBooks()}
          </div>
    </div>
  )
}
}

export default graphql(getBooksQuery)(BookList)
