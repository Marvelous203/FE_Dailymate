import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';

export function LearningCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Dữ liệu mẫu cho các sự kiện học tập
  const learningEvents = [
    { date: new Date(2023, 5, 10), subject: 'Toán', duration: 45 },
    { date: new Date(2023, 5, 12), subject: 'Khoa học', duration: 30 },
    { date: new Date(2023, 5, 15), subject: 'Ngôn ngữ', duration: 60 },
    // Thêm các sự kiện khác
  ];

  // Hàm để kiểm tra xem một ngày có sự kiện học tập không
  const hasEvent = (day: Date) => {
    return learningEvents.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Hàm để lấy sự kiện học tập cho ngày đã chọn
  const getEventsForDay = (day: Date) => {
    return learningEvents.filter(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selectedDate) => setDate(selectedDate || undefined)}
        className="rounded-md border"
      />

      {date && (
        <Card className="p-4 border border-[#e2e8f0]">
          <h4 className="font-bold mb-2">
            {date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h4>
          
          {getEventsForDay(date).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDay(date).map((event, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-[#f8fafc] rounded-md">
                  <span className="font-medium">{event.subject}</span>
                  <span className="text-sm text-[#64748b]">{event.duration} phút</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#64748b] text-sm">Không có hoạt động học tập nào được lên lịch cho ngày này.</p>
          )}
        </Card>
      )}
    </div>
  );
}