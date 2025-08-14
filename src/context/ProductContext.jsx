import { createContext, useContext, useState } from "react"

const ProductsContext = createContext()

const ProductsProvider = (props) => {
  const [products, setProducts] = useState([])
  const [createProducts, setCreatedProducts] = useState([])
  const GetProducts = async () => {
    if (products.length > 0) { return products }
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      
    })

    if (response.ok) {
        const res = await response.json()
        setProducts(res)
        setProducts(prev => [...prev, ...createProducts])
    } else {
       false
    }
    return products.concat(createProducts)
  }
  const UpdateProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })
      console.log(response);
      if (response.ok) {
        const data = await response.json()
        setProducts((prevProduct) =>
          prevProduct.map((product) =>
            product.id === updatedProduct.id
              ? data
              : product
          ))
        }
        return true
    } catch (error) {
      console.log(error)
    }
  }
  const CreateProduct = async (name, price, description) => {
    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    };
    const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    });
    
    const data = await response.json()
    setCreatedProducts(prev => [...prev, newProduct])
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
    return data;
  }
  const DeleteProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      return true
    }
    return false
  }

  return (
    <ProductsContext.Provider value={
      { 
        GetProducts, 
        CreateProduct,
        UpdateProduct,
        DeleteProduct, 
        products, 
      }
    }>
      {props.children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext)

export { ProductsProvider, useProducts}
