import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft,faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import './MainBody.css'
import Cards from './Cards'
import { SampleData } from '../store/SampleData'
import {useDispatch, useSelector} from "react-redux"
import { getBooks } from '../store/bookSlice'
import  Form from './Form'


function Header() {
    const dispatch = useDispatch()
    const [data , setData] = useState({
        query : '',
        sort : -1,
        limit : 10,
        page : 1

    })

    useEffect(() => {
        dispatch(getBooks(data));
    }, [data])
    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }
    const handleSearch = (e) => {
        setData({...data, query : e.target.value})
    }
    const handleSort = (e) => {
        setData({...data, sort : e.target.value})
    }
    const handlePage = (num) => {
        setData({...data, page : parseInt(num)})
    }
    const Datas = useSelector((store) => store.books);
    const cartCount = useSelector((store) => store.cart.total)

    const count = Datas.count || 0

    const buttons = Math.ceil(count/data.limit)
    
  return (
    <div>
        <div  className="main-data-section">
       <div className="main-top-head">
        <div className="top-texts">
            <span></span>
            <h3>Book List</h3>
        </div>
        <form className="search-form">
            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="text" className="form-control search-id-form"  onChange={handleSearch} id="searchItem" placeholder="Search Name/language/author" />
            </div>
            <i className="fa-regular fa-bell bell-icon"></i>
            <img src= "/images\AvatarStyle6.png" alt="nothing"/>
        </form>
    </div>
    <div className="main-employe-page">
        <div className="page-employ-details">
            <div className="pagination10" >
                <span>Filter Books By Price</span>
                <select onChange={handleSort} className="form-select numbers" id="employeeList">
                    <option value="-1">High To Low</option>
                    <option value="1" >Low To High</option>
                </select>
                <p className="m-0"></p>
                <span><p id="totalLength" className="m-0"></p></span>
            </div>
            <div>
                <h4><span>Total Books :{Datas.count}</span></h4>
            </div>
            <div>
            <span className="m-3" ><b>Cart {cartCount}</b></span>
            <button className="employe-btn " id="add-emply-id" onClick={toggleModal}  >Admin Login</button>
            </div>            
        </div>
        <div className="individual-details d-flex gap-4 flex-wrap justify-content-center">
                {
                       Datas.books.map((book, index) =>{
                            return (
                                <Cards book={book} key={index} value = {true}  />
                            )
                        })
                }
        </div>
    </div>
    <div className="page-btns">
        <button className="sml-btn"
         onClick={() => {
            setData({...data, page : data.page >1 ? data.page -1 : data.page})
            // data.page >0 ? setData({ ...data, page : data.page -1 }) : data.page
         }}
        
        ><FontAwesomeIcon icon={faAnglesLeft} /></button>
        <div id="paginationId" className="page-btns">
            {/* {
                for(let index = 0; index < buttons; index++) (
                    <button className="sml-btn pageBtn" id="pageBtns">{index+1}</button>
            )
            
            } */}
            {
                Array.from({ length: buttons }).map((_, index) => (
                    <button className={`sml-btn pageBtn ${data.page == index+1 ? "btnColor" : "" }`} key={index} onClick={() => {handlePage(index+1)}}>{index+1}</button>
                ))
            }

          
        </div>
        <button className="sml-btn" onClick={
            () => {
                setData({ ...data, page : data.page < buttons ? data.page +1 : data.page})
            }
        } ><FontAwesomeIcon icon={faAnglesRight} /></button>
    </div>
    <div className="footer-section">
        <span>© 2023  All Rights Reserved. TechFriar</span>
        <div className="terms-and-texts">
            <p className="m-0"><a href="#">Terms of Use</a></p>
            <p className="m-0"><a href="#">Privacy Policy</a></p>
        </div>
    </div>
</div> 
{
                modal && (<>
                      <div onClick={toggleModal} className="overlay">
                        </div>
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Admin Login</h5>
                                <button type="button" className="sml-btn" onClick={toggleModal}>
                                    <span aria-hidden="true" style={{fontSize :"40px"}}>&times; </span>
                                </button>
                            </div>
                            <div className="modal-body">  
                                {/* <Form toggleModal={toggleModal}/>  */}
                             </div>    
                             </div>
                             </> 
                              
                )                                    
            }
    </div>
  )
}

export default Header