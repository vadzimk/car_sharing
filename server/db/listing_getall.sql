with all_listings as (
    select *,
           row_number()
           over (partition by p.listingid order by rate_timestamp desc, insurance_timestamp desc, location_timestamp desc
               ) as rank
    from (
             select s7.*,
                    sum(case
                            when s8.from_date is null then 0
                            else s8.to_date - s8.from_date + 1
                        end)                                                                      as num_days_rented,
                    sum(coalesce((s8.to_date - s8.from_date + 1) *
                                 (select rate.base_rate from rate where rate.id = s8.rateid), 0)) as sale_total
             from (select s6.*, location.addr_line2, location.addr_line1, location.zipcode, location.id as location_id
                   from (select s5.*, listing_location.locationid, listing_location.timestamp as location_timestamp
                         from (select s4.*, insurance.fee
                               from (select s3.*,
                                            listing_insurance.insuranceid,
                                            listing_insurance.timestamp as insurance_timestamp
                                     from (select s2.*, rate.base_rate
                                           from (select s1.*,
                                                        listing_rate.rateid,
                                                        listing_rate.timestamp as rate_timestamp
                                                 from (select listing.id as listingid, listing.*
                                                       from appuser_listing
                                                                join listing on appuser_listing.listingid = listing.id
                                                       where appuserid = $1 and deleted=false) s1
                                                          left outer join listing_rate on listing_rate.listingid = s1.listingid) s2
                                                    left outer join rate on rate.id = s2.rateid) s3
                                              left outer join listing_insurance on listing_insurance.listingid = s3.listingid) s4
                                        left outer join insurance on insurance.id = s4.insuranceid) s5
                                  left outer join listing_location on listing_location.listingid = s5.listingid) s6
                            left outer join location on location.id = s6.locationid) s7
                      left outer join (select *
                                       from reservation
                                       where reservation.from_date >= $2
                                         and reservation.to_date <= $3) as s8 on s8.listingid = s7.listingid

             group by s7.listingid, s7.id, s7.plate, s7.make, s7.model, s7.year, s7.transmission, s7.seat_number,
                      s7.large_bags_number, s7.miles_per_rental,
                      s7.active, s7."category", s7.rateid, s7.rate_timestamp, s7.base_rate, s7.insuranceid,
                      s7.insurance_timestamp, s7.fee, s7.locationid,
                      s7.location_timestamp, s7.location_id, s7.addr_line2, s7.addr_line1, s7.zipcode
         ) as p
)
select listingid as id,
       plate,
       make,
       model,
       year,
       transmission,
       seat_number,
       large_bags_number,
       miles_per_rental,
       active,
       "category",
       base_rate,
       fee,
       location_id,
       addr_line2,
       addr_line1,
       zipcode,
       num_days_rented,
       sale_total
from all_listings
where rank = 1;