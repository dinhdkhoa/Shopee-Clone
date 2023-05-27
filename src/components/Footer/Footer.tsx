export default function Footer() {
  return (
    <>
      <footer className='bg-neutral-100 py-16'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <div className='text-center lg:col-span-1 lg:text-left'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
            <div className='text-center lg:col-span-2 lg:text-left'>
              Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines |
              Brazil | México | Colombia | Chile
            </div>
          </div>
          <div className='mt-10 text-center text-sm'>
            <div className=''>
              Địa chỉ: Tầng 1, đường ABC, Quận XYZ, Thành phố Hồ Chí Minh,Việt Nam. Tổng đài hỗ trợ: 0123456789 - Email:
              abc@gmail.com
            </div>
            <div className='mt-2'>Chịu Trách Nhiệm Quản Lý Nội Dung: Ông Hai Lúa - Điện thoại liên hệ: 0123456789</div>
            <div className='mt-2'>Mã số doanh nghiệp: 0000000000 do Sở cấp lần đầu ngày 04/08/2019</div>
            <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
          </div>
        </div>
      </footer>
    </>
  )
}
