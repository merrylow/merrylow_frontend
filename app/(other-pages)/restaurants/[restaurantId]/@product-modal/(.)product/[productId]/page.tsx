import ProductModal from "@/components/productModal"

const ProductPage = ({ params} : { params: { productId: string } }) => {

     return (
          <ProductModal params={params} />
     )
}

export default ProductPage