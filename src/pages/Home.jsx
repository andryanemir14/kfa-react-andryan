import Carousel from '../components/Carousel.jsx';

function Home() {
   return ( 
   <>
   <Carousel />

   {/* Grid system Botstrap */}
   <section className="cards-news">
      <div className="container text-center">
  <div className="row">
    <div className="col"></div>
    <div className="col">
      <strong>Company News</strong>
    </div>
    <div className="col"></div>
  </div>
</div>

&nbsp;
<div className="container">
   <div className="row">

   <div className="col">
<div className="card">
  <img src="..." className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Kimia Farma</h5>
    <p className="card-text">Kimia Farma Apotek dan Kementerian UMKM Fasilitasi UMKM untuk Masuk Rantai Pasok BUMN</p>
    <a href="#" className="btn btn-primary">Selengkapnya</a>
  </div>
</div>
</div>

   <div className="col">
<div className="card">
  <img src="..." className="card-img-top" alt="..."/>  
   <div className="card-body">
      <h5 className="card-title">Kimia Farma</h5>
      <p className="card-text">Kimia Farma Apotek Gelar RUPST 2024: Sukses Lewati Multi Krisis dan Perkuat Transformasi Digital</p>
      <a href="#" className="btn btn-primary">Selengkapnya</a>
   </div> 
   </div>
   </div>

   <div className="col">
<div className="card">
  <img src="..." className="card-img-top" alt="..."/>  
   <div className="card-body">
      <h5 className="card-title">Kimia Farma</h5>
      <p className="card-text">KFA Paparkan Strategi Transformasi dan Inisiatif Pertumbuhan di Forum Investor Verdhana Up-Close</p>
      <a href="#" className="btn btn-primary">Selengkapnya</a>
   </div> 
   </div>
   </div>        

</div>
</div>

</section>
</>
   );
   }

export default Home;