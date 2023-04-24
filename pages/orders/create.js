import SidebarLayout from "@/components/SidebarLayout"
import { TextField, Grid, Box, Select, Autocomplete, Typography, Button } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import { useSelector, } from "react-redux"
import { getProducts } from "@/store/actions/productsActions"
import Loading from "@/components/Loading"
import { createManualOrder } from "@/store/actions/orderActions"


export default function CreateOrderPage() {
  const { variations, loading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.auth)
  const [fetchedOnce, setFetchedOnce] = useState(false)
  const autoCompleteRef = useRef()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    products: []
  })

  const handleFormDataChange = (field, value) => {
    // Write the code to change all the values in the formData. 
    setFormData((f) => ({ ...f, [field]: value }))
  }

  const handleSumbit = async (formData) => {
    // Write the code to submit the form data to the backend.
    // create a payload with all the properties required by the model

    const payload = {
      ...formData,
      vendor: user._id,
    }
    await createManualOrder(payload)
  }


  useEffect(() => {
    if (fetchedOnce) return
    if (variations.length === 0)
      getProducts()
    setFetchedOnce(true)
  }, [loading, fetchedOnce])


  if (loading) return <Loading text={"Loading Products"} />
  return <SidebarLayout pageTitle={"Create Order Manually"}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <Box>
          <TextField placeholder="Customer Name"
            onChange={(e) => handleFormDataChange("name", e.target.value)}
            fullWidth sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Customer Email"
            onChange={(e) => handleFormDataChange("email", e.target.value)}
            type="email"
            fullWidth sx={{ mb: 2 }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Box>
          <TextField
            placeholder="Customer Address"
            onChange={(e) => handleFormDataChange("address", e.target.value)}
            fullWidth sx={{ mb: 2 }}
            multiline rows={4}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          ref={autoCompleteRef}
          fullWidth
          options={variations.map(el => el.product.name)}
          renderInput={(params) => <TextField {...params} label="Product" />}
          onChange={(e, value) => {
            if (!value) return
            const product = variations.find(p => p.product.name === value)

            // only add the product if it's not there
            if (formData.products.find(p => p.product._id === product.product._id)) return
            setFormData((f) => ({
              ...f,
              products: [...f.products, { ...product, quantity: 1 }],
            }))

            autoCompleteRef.current.value = ""
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Products</Typography>
        {formData.products.map((p, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body1">{p.product.name}</Typography>
            <TextField placeholder="Quantity" defaultValue={1} type="number" onChange={(e) => {
              // change quantity of the current product
              const newProducts = formData.products.map((p, index) => {
                if (index !== i) return p
                return { ...p, quantity: e.target.value }
              })
            }} />
          </Box>))}
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handleSumbit(formData)}>
          Create Order
        </Button>
      </Grid>
    </Grid >
  </SidebarLayout >
}  