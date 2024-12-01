import Image from 'next/image'

const LoaderDark = () => {
    return (
        <span className='loader '>
            <Image
                src='/assets/icons/loaderDark.svg'
                alt='loader'
                width={10}
                height={10}
                className='animate-spin'
                priority
            />
        </span>
    )
}

export default LoaderDark;