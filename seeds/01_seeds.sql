INSERT INTO  properties (title, description, cost_per_night, thumb_nail_pic_url, cover_pic_url, street_adress, city, province, post_code)
VALUES ('Ocean property', 'View by the ocean', 35, 'none', 'none', 'ocean rd', 'ocean city', 'Vancouver', 'g1b 4f8'),
       ('Forest for property', 'View by the forest', 35, 'none', 'none', 'forest rd', 'forest city', 'Vancouver', 'g2b 4f8'),
       ('Sea for property', 'View by the sea', 35, 'none', 'none', 'sea rd', 'sea city', 'Vancouver', 'g3b 4f8'),
       ('Farm for property', 'View by the farm', 35, 'none', 'none', 'farm rd', 'farm city', 'Calgary', 'g4b 4f8'),
       ('City for property', 'View by the city', 35, 'none', 'none', 'city rd', 'city city', 'Ontario', 'g5b 4f8');

INSERT INTO users (name, email, password)
VALUES ('imaclient', 'imaclient@lbnb.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
       ('imaclient2', 'imaclient2@lbnb.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
       ('imaclient3', 'imaclient3@lbnb.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
       ('imanowner', 'imanowner@lbnb.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
       ('imanowner2', 'imanowner2@lbnb.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
       ('imanowner3', 'imanowner3@lbnb.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-07-09', '2020-08-09', 1, 1),
       ('2020-08-09', '2020-09-09', 2, 2),
       ('2020-07-09', '2020-08-09', 3, 3);

INSERT INTO reviews (property_id, guest_id, reservation_id, message, rating)
VALUES (1, 1, 1, 'message for reservation 1', 4),
       (2, 2, 2, 'message for reservation 2', 4),
       (3, 3, 3, 'message for reservation 3', 4);