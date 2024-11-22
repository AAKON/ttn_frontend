import Image from 'next/image'
import ShowCase1 from '@/assets/ShowCase1.png'

const ProductShowCaseCard = ({ type }) => {

    const description = "Wholesale custom OEM retro checkerboard shoes slip on"

    return (
        <div>
            <div className="lg:w-[215px] w-[160px]">
                <Image src={ShowCase1} alt='ShowCase1' className='w-[100%]' />

                <h4 className='text-sm font-semibold text-brand-600 mt-5 capitalize'>{type}</h4>

                <p className="text-base text-gray-900 font-normal mt-2">
                    {description}
                </p>

                <div className='mt-2'>
                    <h4 className='text-base text-gray-900 font-semibold'>BDT 62 - BDT 73<span className='text-gray-400'>/pair</span></h4>
                    <h4 className='text-base text-gray-900 font-semibold'>300 pairs<span className='text-gray-400'>(Min. Order)</span></h4>
                </div>
            </div>
        </div>
    )
}

export default ProductShowCaseCard