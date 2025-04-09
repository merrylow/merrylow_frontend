import Card from "@/components/card"

const RestaurantsPage = () => {
     return (
          <main className="min-h-screen flex flex-col items-center space-y-7">
               <div className="w-[92%]">
                    <h1 className="page-heading text-xl font-bold text-black -mt-2">Restaurants</h1>

               </div>

               <div className="w-[92%] h-[80%]">
                    <h2 className="section-heading text-base font-semibold text-gray-700 mb-2">All restaurants</h2>

                    <div className="h-[160rem] flex flex-col gap-9">
                         {Array(8).fill(0).map((_, i) => (
                              <Card
                                   key={i}
                                   cardClass="w-full"
                                   cardDetails={{
                                        imgSrc: '/Yam and palava sauce-marg-tee.jpg',
                                        mealName: 'Tasty bowl',
                                        mealDescription: 'Choose from a variety of...',
                                        // price: '€10.00',
                                        // rating: '4.6',
                                        // time: '40-50min'
                                   }}
                              />
                         ))}
                    </div>
               </div>

               <div className="mb-20" />
          </main>
     )
}

export default RestaurantsPage;
