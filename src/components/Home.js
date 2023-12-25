import React from 'react'
import Header from './Header'
import SegmentCanvas from './SegmentCanvas'

const Home = () => {
  const tileMainPage = 'View Audience'
  return (
    <div>
      <Header audienceTitle={tileMainPage}/>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
          <button className='btn-1 m-3' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Save Segment</button>
          </div>
        </div>
      </div>
      <SegmentCanvas/>
    </div>    
  )
}

export default Home
