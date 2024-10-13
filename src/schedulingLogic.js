// Generate the cleaning schedule based on the current week, residents, and rotation logic
export const generateSchedule = (currentWeek, residents, areas, offWeeks) => {
    let schedules = [];
    const fullRotation = [...areas, ...offWeeks];
  
    for (let weekOffset = 0; weekOffset < 5; weekOffset++) {
      let weeklySchedule = [];
  
      residents.forEach((resident, index) => {
        const rotationIndex = (currentWeek + weekOffset + index) % fullRotation.length;
        const areaOrOff = fullRotation[rotationIndex];
  
        weeklySchedule.push({ person: resident, area: areaOrOff || null });
      });
  
      schedules.push(weeklySchedule);
    }
  
    return schedules;
  };
  