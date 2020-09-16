SELECT 
  reservations.*,
  properties.*,
  AVG(property_reviews.rating) as average_rating
FROM
  property_reviews
JOIN
  properties ON properties.id = property_reviews.property_id
JOIN
  reservations ON reservations.id = property_reviews.reservation_id
JOIN
  users ON users.id = property_reviews.guest_id
WHERE
  reservations.guest_id.id = 1
  AND reservations.end_date < Now()::date
GROUP BY 
  properties.id, reservations.id
ORDER BY 
  reservations.start_date
LIMIT 10;