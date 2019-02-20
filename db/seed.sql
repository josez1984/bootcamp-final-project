-- Users
INSERT INTO "Users" (email,password,"createdAt","updatedAt") VALUES('test@mail.com', 'test',NOW(),NOW());
INSERT INTO "Users" (email,password,"createdAt","updatedAt") VALUES('test2@mail.com', 'test',NOW(),NOW());

-- User #1 Item/Images
INSERT INTO "Items" (name, condition, status, "createdAt", "updatedAt", "UserId", deleted, description) 
VALUES('Unicorn Lamp', 'Barely Used', 'Active', NOW(), NOW(),1,'f','This is a cute unicorn lamp. Used for about a year. Its in great shape. My daughter outgrew it.');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(1, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550456606/dinqnafc0y5snkobyqcr.jpg');

INSERT INTO "Items" (name, condition, status, "createdAt", "updatedAt", "UserId", deleted, description) 
VALUES('Traktor F1', 'Barely Used', 'Active', NOW(), NOW(),1,'f','Barely used during a 6 month sprint. Switched over to Rekordbox so I dont have a user for this anymore.');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(2, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550457663/ck19svflnegf4fswds0s.jpg');

INSERT INTO "Items" (name, condition, status, "createdAt", "updatedAt", "UserId", deleted, description) 
VALUES('Sharp Aquos 70" LED 3D TV', 'Slightly Used', 'Active', NOW(), NOW(),1,'f','Awesome TV. Huge. Used for about two years. It''ts in perfect condition, with all original OEM packaging.');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(3, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550458058/a53xb8x2bwuq9k5ipobi.webp');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(3, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550458062/tdwuwjijfo2flw4slrx0.jpg');

-- User #2 Item/Images

INSERT INTO "Items" (name, condition, status, "createdAt", "updatedAt", "UserId", deleted, description) 
VALUES('Galaxy S4', 'Slightly Used', 'Active', NOW(), NOW(),2,'f','Barely used phone. Used for six months until a replacement was bought. The phone has been in its OEM packaging ever since.');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(4, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550459520/lr2ceg3ouwc9ofjf1dqh.jpg');

INSERT INTO "Items" (name, condition, status, "createdAt", "updatedAt", "UserId", deleted, description) 
VALUES('Polk 12" Subwoofer', 'Barely Used', 'Active', NOW(), NOW(),2,'f','Nice subwoofer. Had it installed in my secondary crusing car. Barely used really. Sold the car and the buyer did not want the audio equipment.');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(5, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550459674/whg1d3yto3ratlvzxiuv.jpg');

INSERT INTO "Items" (name, condition, status, "createdAt", "updatedAt", "UserId", deleted, description) 
VALUES('Prade Leather Jacket', 'Barely Used', 'Active', NOW(), NOW(),2,'f','Super rare Prada Leather Jacket. Used about, 7 times. Dont like it too much.');

INSERT INTO "Images" ("ItemId", "createdAt", "updatedAt", url)
VALUES(6, NOW(), NOW(), 'https://res.cloudinary.com/horqnq3wz/image/upload/v1550459727/qdluv0uoeqfdile1v5ku.jpg');
