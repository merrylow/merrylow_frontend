import {
    useLoadingStore
} from "@/stores/useLoadingStore";

const ProductModalAddButton = () => {
    const setLoading = useLoadingStore(state => state.setLoading)

    const handleClick = async () => {
        setLoading(true)
        
        try {
            return
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            className='text-xs py-1.5 px-6 bg-primary-main text-white see-all-btn'
            onClick={handleClick}
        >
            Add
        </button>
    )
}

export default ProductModalAddButton