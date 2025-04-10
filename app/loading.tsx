import ClipLoader from "react-spinners/ClipLoader";


const Loading = () => {
     return (
          <div className='w-full h-[75vh] flex items-center justify-center'>
               <ClipLoader size={150} loading={true} color='#CB6CE6' aria-label="Loading Spinner" />
          </div>
     )
}

export default Loading