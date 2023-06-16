export default function Footer() {
  return (
    <>
      <footer className='bg-neutral-100 py-16'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <div className='text-center lg:col-span-1 lg:text-left'>© 2023 Shopee. All Rights Reserved.</div>
            <div className='text-center lg:col-span-2 lg:text-left'>
              Country & Region: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil
              | México | Colombia | Chile
            </div>
          </div>
          <div className='mt-10 text-center text-sm'>
            <div className=''>
              Address: Tầng 1, đường ABC, Quận XYZ, Thành phố Hồ Chí Minh,Việt Nam. Hotline: 0123456789 - Email:
              abc@gmail.com
            </div>
            <div className='mt-2'>Content Management : Ông Hai Lúa -- Contact phone number: 0123456789</div>
            <div className='mt-2'>Business registration number: 0000000000 issued by the Department on 04/08/2019</div>
            <div className='mt-2'>© 2015 - Copyright belongs to Shopee LLC.Shopee</div>
          </div>
        </div>
      </footer>
    </>
  )
}
