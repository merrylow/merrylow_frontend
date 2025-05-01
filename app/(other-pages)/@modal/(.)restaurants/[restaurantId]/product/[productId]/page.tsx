import ProductModal from "@/components/productModal";

const ProductPage = async ({ params }: { params: Promise<{ restaurantId: string, productId: string }> }) => {
    const { restaurantId, productId } = await params
     return (
          <>
               <ProductModal restaurantId={restaurantId} productId={productId} />
          </>
     );
};

export default ProductPage