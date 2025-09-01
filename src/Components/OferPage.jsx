import './offer.css'
export default  function OfferPage(){
    return(
          <section className="oferrSection">
                <div className="oferfircon">
                    <div className="oferfirconimgcon">
                        <img src="https://i.pinimg.com/736x/3b/d1/70/3bd170bce876dc5b2fdbbf5dcc304dd3.jpg" alt="" />
                    </div>
                </div>
                <div className="offerseccon">
                    <h3 className="text-3xl font-bold">Bundle & Save 25%</h3>
                    <p>Pick any 3 wellness items and get an extra discount at checkout.</p>
                    <div className="oferclickcon">
                        <button>Build Bundle</button>
                        <button>See Details</button>
                    </div>
                </div>

             </section>
    )
}