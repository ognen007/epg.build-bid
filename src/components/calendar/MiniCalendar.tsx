import React from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();

function generateCalendarDays() {
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
}

export function MiniCalendar() {
  const days = generateCalendarDays();
  const currentDate = today.getDate();
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="text-center mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              p-1 sm:p-2 text-sm rounded-full
              ${!day ? 'text-gray-300' : 'text-gray-700'}
              ${day === currentDate ? 'bg-orange-500 text-white' : ''}
              ${day && day !== currentDate ? 'hover:bg-gray-100' : ''}
              cursor-pointer
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}