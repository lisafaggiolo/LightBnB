SELECT 
  avg(reservations.end_date
     - reservations.start_date)  
     AS average_duration
FROM
 reservations;