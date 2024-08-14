import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../store/bookSlice";
import axios from "axios";

function FormAdd({ toggleModal, data }) {

  const URl = "http://localhost:4001"
  
  const imageLabelRef = useRef(null);
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    name: data ? data.name : "",
    author: data ? data.author : "",
    price: data ? data.price : "",
    language: data ? data.language : "",
    year: data ? data.year : "",
    description: data ? data.description : "",
    image: data ? data.image : "",
  });

  const [file, setFile] = useState("");  
  const [fileChange, setFileChange] = useState(true);
  const [image, setImage] = useState("");
 let imageName 
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    await axios
      .post("http://localhost:4001/books/image", formData, {
        withCredentials: true,
      })
      .then((res) => {
        imageName = res.data.filename;
        setBook({ ...book, image: res.data.filename });
      })
      .catch((err) => console.log(err));

    return true;
  };


  const handleClose = () => toggleModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setFileChange(false);
    } else {
      setFileChange(true);
    }
  }, [data]);
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    let files = e.target.files[0];
    if (files && imageLabelRef.current) {
      imageLabelRef.current.classList.add("imageUpload");
    }
    console.log("url", URL.createObjectURL(files));
    setImage(URL.createObjectURL(files));
    setFileChange(false);
  };
  const handleEdit = () => {
    if (image){
        console.log("if worked");
        
        uploadImage().then( () => {
        const newBook = {...book, image :imageName }
        dispatch(updateBook(newBook, data._id));
      })
    }
    else{
      console.log("if not working")
      console.log("id already", data._id);
      const id = data._id;
      
      dispatch(updateBook({book, id}));
    }

    toggleModal(false);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage().then( () => {
      const newBook = {...book, image :imageName }
      dispatch(addBook(newBook));
    })
    setBook({
      name: "",
      author: "",
      price: "",
      language: "",
      year: "",
      description: "",
      image: "",
    });
    toggleModal(false);
  };
  return (
    <div>
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <div className="modal-header d-flex justify-content-between mb-5">
          <h5 className="modal-title">ADD BOOK</h5>
          <button type="button" className="sml-btn" onClick={toggleModal}>
            <span aria-hidden="true" style={{ fontSize: "40px" }}>
              &times;{" "}
            </span>
          </button>
        </div>
        <div className="modal-body"></div>
        <Form>
          <div className="d-flex align-items-center gap-4">
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleChangeFile}
            />

            <label
              ref={imageLabelRef}
              htmlFor="formFile"
              className="form-label upload d-flex flex-column align-items-center p-4 mb-3 rounded-4 bg-light"
            >
              {fileChange ? (
                <>
                  <h5 className="inputtext">Upload Image</h5>
                  <h6 className="inputtext">PNG, JPG files are allowed</h6>
                </>
              ) : (
                <img src= {image || `${URl}/uploads/images/${book.image}`} alt="nothing" />
              )}
            </label>
            {fileChange ? null : (
              <label className="btn btn-info" htmlFor="formFile">
                Change
              </label>
            )}
          </div>

          <div className="row mt-3">
            <div className="col-md-6 col-sm-6 mb-4  ">
              <label htmlFor="name" className="form-label">
                Enter Book Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleInputChange}
                placeholder="Book Name"
                value={book.name}
              />
            </div>
            <div className="col-md-6 col-sm-6 mb-4 ">
              <label htmlFor="author" className="form-label">
                Enter Author Name :
              </label>
              <input
                type="text"
                name="author"
                className="form-control"
                onChange={handleInputChange}
                value={book.author}
                placeholder="Author Name"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4 col-sm-4 mb-4 ">
              <label htmlFor="price" className="form-label">
                Enter Price :
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                onChange={handleInputChange}
                placeholder="Enter Price"
                value={book.price}
              />
            </div>

            <div className="col-md-4 col-sm-4 mb-4 ">
              <label htmlFor="language" className="form-label">
                Enter Language:
              </label>

              <select
                className="form-select"
                type="text"
                name="language"
                onChange={handleInputChange}
                value={book.language}
              >
                <option value=''>Select</option>
                <option>Malalayam</option>
                <option>English</option>
                <option>Spanish</option>
                <option>Tamil</option>
                <option>Hindhi</option>
              </select>
            </div>
            <div className="col-md-4 col-sm-4 mb-4 ">
              <label htmlFor="year" className="form-label">
                Enter Published Year :
              </label>
              <input
                type="text"
                name="year"
                className="form-control"
                onChange={handleInputChange}
                value={book.year}
                placeholder="Published year"
              />
            </div> 
          </div> 

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              className="form-control textArea"
              onChange={handleInputChange}
              placeholder="Description"
              value={book.description}
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-3 mt-5">
            {
              
              
              data ?  <Button variant="info" onClick={handleEdit} >Edit Book </Button> 
               :  <Button variant="primary" onClick={handleSubmit}> Add Book </Button>


            }
          
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button> 
          </div>
        </Form> 
      </div>
    </div>
  );
}
export default FormAdd;
