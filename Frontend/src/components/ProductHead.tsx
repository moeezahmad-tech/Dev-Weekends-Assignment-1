import handleAddToCart from "../lib/addToCart";

const ProductHead = (props: {
  productImage: string;
  productName: string;
  price: number;
  productDescription: string;
}) => {
 
  return (
    <>
        <div className="md:flex items-center -mx-10 h-[50vh] px-10 my-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={
                  props.productImage ||
                  "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                className="w-full h-[50vh] object-cover relative z-10 rounded-lg"
                alt=""
              />
              <div className="border-4 border-red-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-5">
                {props.productName}
              </h1>
              <p className="text-sm">{props.productDescription}</p>
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="font-bold text-5xl leading-none align-baseline">
                  {props.price}
                </span>
              </div>
              <div className="inline-block align-bottom">
                <button
                  onClick={() => handleAddToCart(props)}
                  className="bg-red-500 text-white hover:bg-red-600 rounded-full px-10 py-2 font-semibold"
                >
                  <i className="mdi mdi-cart -ml-2 mr-2"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ProductHead;
