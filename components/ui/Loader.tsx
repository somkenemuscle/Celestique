import Image from 'next/image'

const Loader = () => {
    return (
        <span className='loader '>
            <Image
                src='/assets/icons/loader.svg'
                alt='loader'
                width={15}
                height={15}
                className='animate-spin'
                priority
            />
        </span>
    )
}

export default Loader;