import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: String!
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $publisher: String!
    $published_year: Int!
  ) {
    updateBook(
      id: $id
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      publisher: $publisher
      published_year: $published_year
    ) {
      updated_date
    }
  }
`;

class Edit extends Component {
  render() {
    let isbn, title, author, description, published_year, publisher;
    return (
      <Query
        query={GET_BOOK}
        variables={{ bookId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation
              mutation={UPDATE_BOOK}
              key={data.book._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateBook, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">EDIT BOOK</h3>
                    </div>
                    <div className="panel-body">
                      <div className="back-panel">
                        <h4>
                          <Link to={`/show/${data.book._id}`} className="btn">
                            Back
                          </Link>
                        </h4>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateBook({
                            variables: {
                              id: data.book._id,
                              isbn: isbn.value,
                              title: title.value,
                              author: author.value,
                              description: description.value,
                              publisher: publisher.value,
                              published_year: parseInt(published_year.value),
                            },
                          });
                          isbn.value = "";
                          title.value = "";
                          author.value = "";
                          description.value = "";
                          publisher.value = null;
                          published_year.value = "";
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="isbn">ISBN:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="isbn"
                            ref={(node) => {
                              isbn = node;
                            }}
                            placeholder="ISBN"
                            defaultValue={data.book.isbn}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="title">Title:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            ref={(node) => {
                              title = node;
                            }}
                            placeholder="Title"
                            defaultValue={data.book.title}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="author">Author:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="author"
                            ref={(node) => {
                              author = node;
                            }}
                            placeholder="Author"
                            defaultValue={data.book.author}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            className="form-control"
                            name="description"
                            ref={(node) => {
                              description = node;
                            }}
                            placeholder="Description"
                            cols="80"
                            rows="3"
                            defaultValue={data.book.description}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="author">Publisher:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="publisher"
                            ref={(node) => {
                              publisher = node;
                            }}
                            placeholder="Publisher"
                            defaultValue={data.book.publisher}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="author">Published Year:</label>
                          <input
                            type="number"
                            className="form-control"
                            name="published_year"
                            ref={(node) => {
                              published_year = node;
                            }}
                            placeholder="Published Year"
                            defaultValue={data.book.published_year}
                          />
                        </div>
                        <div className="submitz">
                    <button type="submit" className="cssbuttons-io-button">
                      {" "}
                      Submit
                      <div className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Edit;
