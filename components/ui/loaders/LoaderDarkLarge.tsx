import Image from 'next/image'

const LoaderDarkLarge = () => {
    return (
        <span className='loader '>
            <Image
                src='/assets/icons/loaderDarkLarge.svg'
                alt='loader'
                width={20}
                height={20}
                className='animate-spin'
                priority
            />
        </span>
    )
}

export default LoaderDarkLarge;