import ProductModal from "@/components/productModal"

const ProductPage = async ({ params }: { params: Promise<{ restaurantId: number, productId: number }> }) => {
    const { restaurantId, productId } = await params

    return (
          <>
              <ProductModal restaurantId={restaurantId} productId={productId} />
          </>
     )
}

export default ProductPage