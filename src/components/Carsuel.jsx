import React from 'react'

function Carsuel() {
  return (
    <div className='pt-2 '>
      <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn9-8sznAiK7QXXVO752qFbO70X8ZMP1eOKw&s" className="d-block w-100 h-10" alt="..."/>
    </div>
    <div className="carousel-item">
    <img src="https://media.istockphoto.com/id/610675644/photo/demo-sign-on-red-cubes.jpg?s=612x612&w=0&k=20&c=8dU_a2Th99KQ8ih6oIoLMh-Ge4hbFd32IUKgQrDP35s=" className="d-block w-100 h-10" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://thumbs.dreamstime.com/b/digital-representation-word-demo-illuminated-blue-orange-lights-high-tech-background-setting-bright-text-375641085.jpg" className="d-block w-100 h-10" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Carsuel
