import Image from 'next/image'

const Loader = () => {
    return (
        <div className='loader '>
            <Image
                src='/assets/icons/loader.svg'
                alt='loader'
                width={20}
                height={20}
                className='animate-spin'
                priority
            />
        </div>
    )
}

export default Loader;