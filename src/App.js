/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filter1 = cartList.filter(l => l.id !== id)
    this.setState({cartList: filter1})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const findProduct = cartList.find(l => product.id === l.id)
    if (findProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(ll => {
          if (product.id === ll.id) {
            return {...ll, quantity: ll.quantity + product.quantity}
          }
          return ll
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }

    console.log(cartList)
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(i => {
        if (id === i.id && i.quantity > 1) {
          return {...i, quantity: i.quantity - 1}
        } else if (i.quantity <= 1) {
          this.removeCartItem(id)
        }
        return i
      }),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(i => {
        if (id === i.id) {
          return {...i, quantity: i.quantity + 1}
        }
        return i
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
