import SidebarLayout from "@/components/SidebarLayout"
import { getManualOrders } from "@/store/actions/orderActions"
import { Box, Typography, Grid } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { styled } from '@mui/material/styles';
import Loading from "@/components/Loading"

const OrderContainer = styled(Box)({
  padding: "1rem",
  background: "#eee",
  border: "1px solid #999",
  margin: "1rem 0",
  display: "flex",
  flexDirection: "column",
})


const ProductContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
})


// Now i want the vendor to be able to setStatus of orders on this page.
// I want the user to be able to set delivery date.
// 


export default function ManualOrderPage() {
  const { manualOrders, loading } = useSelector(state => state.order)
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated)
      getManualOrders()
  }, [isAuthenticated])

  if (loading) return <Loading />
  return <SidebarLayout pageTitle={"My Manual Orders"}>
    {manualOrders.map((order, index) => <OrderContainer key={index}>
      <Typography>Order Id - {order._id}</Typography>
      <Typography>Email - {order.email}</Typography>
      <Typography>Name - {order.name}</Typography>
      <Typography>Address - {order.address}</Typography>

      <Typography variant={"h5"} sx={{ textAlign: "center", my: "1rem" }}>Products</Typography>
      <Grid container spacing={2}>
        {order.products.map((product, index) =>
          <Grid item xs={12} key={index}>
            <ProductContainer>
              <img src={product.product.thumbnailImage} alt="Product Image" width={100} />
              <Box>
                <Typography noWrap={true}>Product - {product.product.name}</Typography>
                <Typography>Quantity - {product.quantity}</Typography>
              </Box>
            </ProductContainer>
          </Grid>
        )}
      </Grid>
    </OrderContainer>
    )}
  </SidebarLayout>
}