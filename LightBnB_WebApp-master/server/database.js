const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: "lightbnb",
  password: 1234,
  //port: 3000,
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = email => {

  const query = `
  SELECT 
    id, name, email, password 
  FROM
    users
  WHERE
    email = $1;`
  const values = [email]

  return pool
    .query(query, values)
    .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = id => {
  const query = `
  SELECT 
    id, name, email, password 
  FROM
    users
  WHERE
    id = $1;`
  const values = [id]

  return pool
    .query(query, values)
    .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const query = `
  INSERT INTO 
    users (name, email, password)
  VALUES 
    ($1, $2, $3)
  RETURNING *;`
  const values = [user.name, user.email, user.password]

  return pool
    .query(query, values)
    .then(res => {
      // console.log(res.rows[0])
      res.rows[0]
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  
  const query = `
    SELECT 
    reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
    FROM
      property_reviews
    JOIN
      properties ON properties.id = property_reviews.property_id
    JOIN
      reservations ON reservations.id = property_reviews.reservation_id
    JOIN
      users ON users.id = property_reviews.guest_id
    WHERE
      reservations.guest_id = $1
      AND reservations.end_date < Now()::date
    GROUP BY 
      properties.id, reservations.id
    ORDER BY 
      reservations.start_date
    LIMIT $2;`
  const values = [guest_id, limit]
  
    return pool
    .query(query, values)
    .then(res => { console.log(res.rows); return res.rows});

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
    // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT properties.*
    FROM properties
    JOIN property_reviews ON property_reviews.property_id = properties.id
    `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE LOWER(properties.city) LIKE LOWER($${queryParams.length}) `;
    }
    
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      if (queryParams.length > 1){
        queryString += `AND properties.owner_id LIKE $${queryParams.length} `
      } else {
        queryString += `WHERE properties.owner_id LIKE $${queryParams.length} `;
      }
    }

    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`);
      
      if (queryParams.length > 1){
        queryString += `AND properties.cost_per_night >= $${queryParams.length} `
      } else {
        queryString += `WHERE properties.cost_per_night >= $${queryParams.length} `;
      }
    }

    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night}`);
      if (queryParams.length > 1){
        queryString += `AND properties.cost_per_night <= $${queryParams.length} `
      } else {
        queryString += `WHERE properties.cost_per_night <= $${queryParams.length} `;
      }      
    }
    
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      if (queryParams.length > 1){
        queryString += `AND property_reviews.rating > $${queryParams.length} `
      } else {
        queryString += `WHERE property_reviews.rating > $${queryParams.length} `;
      }
    }
    
    // 4
    queryParams.push(limit);
    queryString += `
      GROUP BY properties.id
      ORDER BY properties.cost_per_night
      LIMIT $${queryParams.length};
    `;
  
    // 5
    return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows
      });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  const query = `INSERT INTO properties
    (title, description, owner_id, cover_photo_url, thumbnail_photo_url, 
    cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, 
    active, province, city, country, street, post_code)
  
  VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING *;`
  const values = [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, 
    property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, 
    true, property.province, property.city, property.country, property.street, property.post_code]

  return pool
    .query(query, values)
    .then(res => res.rows[0]);
}
exports.addProperty = addProperty;
