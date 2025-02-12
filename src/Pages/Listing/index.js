import Sidebar from "../../Components/Sidebar";

const Listing = () => {
  return (
    <>
      <section className="product_Listing_page">
        <div className="container">
            <div className="productListing d-flex">
                <Sidebar></Sidebar>
                <div className="content-right">content right</div>
            </div>

        </div>
      </section>
    </>
  );
};
export default Listing;
