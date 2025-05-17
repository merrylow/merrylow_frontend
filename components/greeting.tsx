import useUserStore from '@/stores/useUserStore'

const Greeting = () => {
    const user = useUserStore(state => state.user)
    const isAuthenticated = useUserStore(state => state.isAuthenticated)

    return (
        <h1 className='text-lg font-bold text-secondary-light -mb-7'>
            Hello { isAuthenticated ? (user?.name)?.split(' ')[0] : 'there👋🏽' }
        </h1>
    )
}

export default Greeting