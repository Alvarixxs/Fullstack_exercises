CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Alice Smith', 'https://example.com/tech-trends-2024', 'Tech Trends 2024', 125),
('Bob Johnson', 'https://example.com/travel-guide', 'Ultimate Travel Guide', 89),
('Charlie Brown', 'https://example.com/cooking-tips', 'Top 10 Cooking Tips', 56),
('Diana Prince', 'https://example.com/fitness-routine', 'Best Fitness Routines', 73),
('Evan Wright', 'https://example.com/finance-management', 'Managing Personal Finances', 112);
