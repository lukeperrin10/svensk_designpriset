CREATE TABLE IF NOT EXISTS old_winner_entries LIKE entries;
-- ALTER TABLE old_winner_entries ADD COLUMN category varchar(255);
CREATE TABLE IF NOT EXISTS old_winner_profiles LIKE profiles;
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
    e.is_winner_gold, 
    e.is_winner_silver, 
    e.motivation, 
    e.year, 
    c.name as category_name,
    p.company,
    p.homepage
FROM entries e
JOIN categories c ON c.id = category_id
JOIN profiles p ON p.id = profile_id
UNION ALL
SELECT 
    NULL as id,
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
    e.is_winner_gold, 
    e.is_winner_silver, 
    e.motivation, 
    e.year,
    c.name as category_name,
    p.company,
    p.homepage
FROM old_winner_entries e
JOIN categories c ON c.shorttag = category
JOIN old_winner_profiles p ON p.id = profile_id;
