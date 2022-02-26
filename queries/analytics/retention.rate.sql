select count(*) as users,
  count
from (
    select count(*) as count,
      user_id
    from (
        select user_id,
          toDate(created_at) as date
        from analytics
        where event = 'app.open'
          and user_id not in (100)
          and user_id not in (
            select user_id
            from analytics
            where event = 'app.open'
              and toDate(created_at) < '2021-08-30'
            group by user_id
          )
        group by date,
          user_id
        order by date desc
      )
    group by user_id
    order by count DESC
  )
group by count