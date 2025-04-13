import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
     return (
          <div className='w-full h-[100vh] flex items-center justify-center'>
               <ClipLoader size={80} loading={true} color='#CB6CE6' aria-label="Loadin9Spinner" />
          </div>
     )
}

export default Loading