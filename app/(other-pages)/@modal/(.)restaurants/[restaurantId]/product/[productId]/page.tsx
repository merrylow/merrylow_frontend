import ProductModal from "@/components/productModal";

const ProductPage = async ({ params }: { params: Promise<{ restaurantId: string, productId: string }> }) => {

     return (
          <>
               <ProductModal params={params} />
          </>
     );
};

export default ProductPage