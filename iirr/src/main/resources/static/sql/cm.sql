

SELECT * FROM "ricepest"."states"
WHERE state_id = 'KA';

SELECT * FROM "ricepest"."states"
WHERE state_id = 'TS';

SELECT * FROM "ricepest"."states"
WHERE state_id = 'AP';

SELECT * FROM "ricepest"."states"
WHERE state_id = 'PB';

SELECT district_id, count(*) FROM ricepest.ts t1 group by district_id order by district_id;

SELECT state_id, count(*) FROM ricepest.states t1 group by state_id order by state_id;


SELECT * FROM ricepest.ap;
SELECT district_id, count(*) FROM ricepest.ts t1 group by district_id order by district_id;

SELECT district_id, count(*) FROM ricepest.ap t1 group by district_id order by district_id;

SELECT district_id, count(*) FROM ricepest.pb t1 group by district_id order by district_id;

SELECT district_id, count(*) FROM ricepest.ka t1 group by district_id order by district_id;


SELECT ST_Extent(geom) as table_extent FROM state WHERE state = 'ANDHRAPRADESH';

SELECT cast(ST_Extent(geom) as varchar) as extent FROM ricepest.state where state = 'PUNJAB';

SELECT cast(ST_Extent(geom) as varchar) as extent FROM ricepest.district where dist = 'NALGONDA';

INSERT INTO ricepest.states(sno, state, state_id, district, district_id)
VALUES 
(12,'Andhra Pradesh','AP','Vizianagaram',12),
(13,'Andhra Pradesh','AP','West Godavari',13); 

SELECT * FROM "ricepest"."district" WHERE state = 'ANDHRAPRADESH';

SELECT * FROM "ricepest"."district" WHERE state = 'TELANGANA';

SELECT * FROM "ricepest"."district" WHERE state = 'PUNJAB';

SELECT * FROM "ricepest"."district" WHERE state = 'KARNATAKA';

SELECT * FROM "ricepest"."states" WHERE state = 'Punjab';

UPDATE "ricepest"."district"
SET state = 'TELANGANA'
WHERE gid = 436;

UPDATE "ricepest"."states"
SET district = 'Fatehgarh Sahib'
WHERE sno = 47;

SELECT ST_AsGeoJSON(t1.*) as extent FROM ricepest.state t1 where state ='TELANGANA';

SELECT cast(ST_Extent(geom) as varchar) as extent FROM ricepest.state where state = 'TELANGANA';


