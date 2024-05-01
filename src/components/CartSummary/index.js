/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const ln = cartList.length
      let tl = 0
      cartList.forEach(l => {
        tl += l.price * l.quantity
      })
      return (
        <div className="crt-sry">
          <h1 className="total">
            Order Total: <span className="sp">Rs{`${tl}`}/-</span>
          </h1>
          <p className="ln">{`${ln}`} Items in cart</p>
          <button type="button" className="btn-ch">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
