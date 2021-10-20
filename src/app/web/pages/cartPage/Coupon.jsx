export default function Coupon() {
  return (
    <div className="cart-coupon mt-50">
      <div className="cart-title">
        <h4 className="title">Coupon Code</h4>
        <p>Enter your coupon code if you have one.</p>
      </div>
      <div className="cart-form mt-25">
        <form action="#">
          <div className="single-form">
            <input type="text" placeholder="Enter your coupon code.." />
          </div>
          <div className="cart-form-btn">
            <button className="btn-cart">Apply Coupon</button>
          </div>
        </form>
      </div>
    </div>
  );
}
