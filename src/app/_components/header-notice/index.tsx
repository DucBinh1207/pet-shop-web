import NoticeItem from "./_components/notice-item";

export default function HeaderNotice() {
  return (
    <div className="bg-header_bg px-[50px] text-white small-screen:hidden">
      <ul className="flex flex-nowrap justify-end gap-[15px] py-[15px]">
        <NoticeItem
          name="petshopdanang@gmail.com"
          href="mailto:petshopdanang@gmail.com"
          iconName="MAIL"
        />

        <NoticeItem
          name="+84-857-123-987"
          href="tel:+84857123987"
          iconName="PHONE"
        />

        <NoticeItem
          name=" 54 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da Nang"
          href="https://maps.app.goo.gl/Q4P1AhYJGg1qP4Ez5"
          iconName="LOCATE"
        />

        <NoticeItem
          name="Mon-Fri: 8:00 AM - 20:00 PM"
          href="#"
          iconName="BUSINESS_TIME"
        />
      </ul>
    </div>
  );
}
