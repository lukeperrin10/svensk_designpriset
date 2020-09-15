CREATE OR REPLACE VIEW winner_view AS 
SELECT 
    e.id,
    e.entry_name, 
    e.source, 
    e.designer, 
    e.illustrator, 
    e.leader, 
    e.customer, 
    e.avatar, 
    e.format, 
    e.size, 
    e.webpage, 
    e.video_url,
    e.description,
    e.is_winner_gold, 
    e.is_winner_silver, 
    e.motivation, 
    e.year, 
    c.name as category_name,
    c.type as category_type,
    p.company,
    p.homepage
FROM entries e
JOIN categories c ON c.id = category_id
JOIN profiles p ON p.id = profile_id
UNION ALL
SELECT 
    -1*e.id as id,
    e.entry_name, 
    e.source, 
    e.designer, 
    e.illustrator, 
    e.leader, 
    e.customer, 
    e.avatar, 
    e.format, 
    e.size, 
    e.webpage, 
    NULL as video_url,
    NULL as description,
    e.is_winner_gold, 
    e.is_winner_silver, 
    e.motivation, 
    e.year,
    c.name as category_name,
    c.type as category_type,
    p.company,
    p.homepage
FROM old_winner_entries e
JOIN categories c ON c.shorttag = category
JOIN old_winner_profiles p ON p.id = profile_id;
