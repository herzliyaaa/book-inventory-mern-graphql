import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CSVLink } from "react-csv";
import Table from 'react-bootstrap/Table';
import logo from './qq.png';


const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
      published_year
      publisher
    }
  }
`;

class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) return <img src={logo} alt='Loading' />;
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="container">
              <div className="panel panel-default col">
                <div className="panel-heading col">
                  <h3 className="panel-title"><img src={logo} alt='Loading' />
                    LIST OF BOOKS
                  </h3>
                  <div className='panel-right'>

                  <CSVLink
              filename={"book-inventory.csv"}
              color="primary"
              className="btn"
              data={data.books}>
              Download CSV
            </CSVLink>

                  <Link to="/create"> <button type="submit" className="btn">
                  Add Book
                  </button></Link>
                  </div>
                  
                </div>
                <div className="panel-body">
                <Table responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Year</th>
                        <th>Publisher</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.books.map((book, index) => (
                        <tr key={index}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.published_year}</td>
                          <td>{book.publisher}</td>
                          <td><Link to={`/show/${book._id}`}> <button type="submit" className="btn btn-success">
                   View
                  </button></Link></td>
                        </tr>
                      ))}
                    </tbody>
                    </Table>
                  

                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
