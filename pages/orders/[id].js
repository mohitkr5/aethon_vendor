import SidebarLayout from "@/components/SidebarLayout"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Typography, Button, Box, Grid, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material"
import { getOrders, updateOrder } from "@/store/actions/orderActions"

export default function OrderPage() {
  const { isAuthenticated } = useSelector(state => state.auth)
  const { orders, loading } = useSelector(state => state.order)
  const router = useRouter()
  const currentOrder = orders.find(order => order._id === router.query.id)
  const [currentlyDispatching, setCurrentlyDispatching] = useState(false)

  const [formData, setFormData] = useState({
    order_status: currentOrder?.order_status || "",
    delivery_date: ""
  })

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOrderConfirm = () => {
    updateOrder(currentOrder._id, { order_status: "confirmed" })
  }

  const handleDispatchStart = () => {
    setCurrentlyDispatching(true)
  }

  const cancelDispatch = () => {
    setCurrentlyDispatching(false)
  }

  const handleDispatch = () => {
    updateOrder(currentOrder._id, { order_status: "dispatched", delivery_date: formData.delivery_date })
    setCurrentlyDispatching(false)
  }

  const handleOrderDelivered = () => {
    updateOrder(currentOrder._id, { order_status: "delivered" })
  }


  useEffect(() => {
    if (isAuthenticated) {
      getOrders()
    }
  }, [isAuthenticated])



  return <SidebarLayout pageTitle={"Order"}>
    {/* Display All the details */}
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} >
        <Typography variant={"h6"}>
          Order Details
        </Typography>
        <Typography variant={"body1"} >
          Order ID: {currentOrder?._id}
        </Typography>
        <Typography variant={"body1"} >
          Order Status: {currentOrder?.order_status}
        </Typography>
        <Typography variant={"body1"} >
          Order Date: {currentOrder?.order_date}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} >
        <Typography variant={"h6"} >
          Order Address:
        </Typography>
        <Box sx={{ paddingInline: "1rem" }}>
          <Typography variant={"body1"} >
            {currentOrder?.address.addressLine1}, {currentOrder?.address.addressLine2},
          </Typography>
          <Typography variant={"body1"} >
            {currentOrder?.address.city.city}, {currentOrder?.address.state.state}
          </Typography>
          <Typography variant={"body1"} >
            {currentOrder?.address.zip}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant={"h6"} >
          Payment Details
        </Typography>
        <Typography variant={"body1"} >
          Payment Method: {currentOrder?.payment_method}
        </Typography>
        <Typography variant={"body1"} >
          Razorpay Order ID: {currentOrder?.razorpay_order_id}
        </Typography>
        <Typography variant={"body1"} >
          Order Amount: ₹{currentOrder?.order_amount}
        </Typography>
        <Typography variant={"body1"}>
          GST Amount: ₹{currentOrder?.gst_amount}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant={"h6"} >
            User Details
          </Typography>
          <Typography variant={"body1"} >
            Order User: {currentOrder?.user.name}
          </Typography>
          <Typography variant={"body1"} >
            Customer Email: {currentOrder?.user.email}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography variant={"h6"} >
            Products
          </Typography>
          {currentOrder?.products.map(product => {
            return <Box key={product._id} sx={{ border: '1px solid black', padding: '1rem', margin: '1rem 0' }}>
              <Typography variant="body1">Product: {product.product_variation.name}</Typography>
              <Typography variant="body1">Quantity: {product.quantity}</Typography>
            </Box>
          })}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexFlow: "column", gap: '1rem' }}>
          {currentOrder?.order_status === "pending" && <Button variant='contained' onClick={handleOrderConfirm}> Confirm Order </Button>}
          {currentOrder?.order_status === "confirmed" && <Button variant='contained' onClick={currentlyDispatching ? cancelDispatch : handleDispatchStart}> {currentlyDispatching ? "Cancel" : "Dispatch Order"} </Button>}
          {currentlyDispatching &&
            <FormControl fullWidth sx={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
              <Typography>
                Enter an estimated delivery date. This will be sent to the customer.
              </Typography>
              <TextField
                name="delivery_date"
                placeholder="Delivery Date"
                labelId='delivery-select-label'
                value={formData.delivery_date}
                onChange={handleFormDataChange}
                type="date" />
              <Button
                variant="contained"
                color="primary"
                onClick={handleDispatch}
              >Dispatch</Button>
            </FormControl>}
          {currentOrder?.order_status === "dispatched" && <Button variant='contained' onClick={handleOrderDelivered}> Mark Order As Delivered </Button>}
          <Typography variant={"h6"} >
            {currentOrder?.order_status === "delivered" && "Order Delivered, You can no longer make changes to this order."}
          </Typography>
        </Box>
      </Grid>
    </Grid>

  </SidebarLayout>
} 
