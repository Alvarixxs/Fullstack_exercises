CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Grace Lee', 'https://example.com/photography-tips', 'Mastering Photography Techniques', 98),
('Henry White', 'https://example.com/music-reviews', 'Latest Music Reviews', 67),
('Isabella Moore', 'https://example.com/book-recommendations', 'Must-Read Books of the Year', 82),
('Jack Robinson', 'https://example.com/fashion-trends', 'Fashion Trends 2024', 105),
('Katherine Adams', 'https://example.com/home-decor', 'Home Decorating Ideas', 71),
('Liam Turner', 'https://example.com/health-tips', 'Improving Your Health', 88),
('Mia Garcia', 'https://example.com/movie-reviews', 'Top Movie Picks', 93),
('Noah Martinez', 'https://example.com/gardening-tips', 'Beginner Gardening Guide', 78),
('Olivia Harris', 'https://example.com/tech-reviews', 'Latest Tech Reviews', 84),
('Peter Evans', 'https://example.com/travel-adventures', 'Travel Adventures 2024', 112),
('Quinn Murphy', 'https://example.com/fitness-tips', 'Fitness Tips for Beginners', 76),
('Rachel Scott', 'https://example.com/cooking-recipes', 'Delicious Cooking Recipes', 91),
('Samuel Carter', 'https://example.com/finance-news', 'Financial News Update', 79),
('Tiffany Reed', 'https://example.com/lifestyle-trends', 'Current Lifestyle Trends', 87),
('Uma Patel', 'https://example.com/business-strategies', 'Effective Business Strategies', 103),
('Victor Nguyen', 'https://example.com/music-lessons', 'Learning Music Instruments', 69),
('Wendy Lewis', 'https://example.com/health-and-wellness', 'Holistic Health Approaches', 94),
('Xavier Miller', 'https://example.com/book-reviews', 'Book Reviews and Recommendations', 81),
('Yvonne Jackson', 'https://example.com/art-exhibitions', 'Art Exhibitions Around the World', 85),
('Zachary Hill', 'https://example.com/technology-trends', 'Emerging Technology Trends', 107),
('Grace Lee', 'https://example.com/advanced-photography', 'Advanced Photography Techniques', 102),
('Grace Lee', 'https://example.com/photography-gear', 'Essential Photography Gear', 88),
('Henry White', 'https://example.com/music-concerts', 'Upcoming Music Concerts', 76),
('Henry White', 'https://example.com/album-releases', 'New Album Releases', 81),
('Isabella Moore', 'https://example.com/reading-list', 'Personal Reading List', 95),
('Isabella Moore', 'https://example.com/book-club', 'Book Club Discussions', 79),
('Jack Robinson', 'https://example.com/style-tips', 'Fashion Style Tips', 83),
('Jack Robinson', 'https://example.com/shopping-guide', 'Shopping Guide 2024', 91),
('Katherine Adams', 'https://example.com/diy-projects', 'DIY Home Projects', 84);


INSERT INTO users (username, name)
VALUES
('brianjohnson', 'Brian Johnson'),
('carolynsmith', 'Carolyn Smith'),
('danielwilson', 'Daniel Wilson'),
('emilybrown', 'Emily Brown'),
('frankthomas', 'Frank Thomas'),
('gabrielrodriguez', 'Gabriel Rodriguez'),
('hannahscott', 'Hannah Scott'),
('ianmiller', 'Ian Miller'),
('jessicawong', 'Jessica Wong'),
('kevinparker', 'Kevin Parker'),
('laurajones', 'Laura Jones'),
('michaelnguyen', 'Michael Nguyen'),
('natalieadams', 'Natalie Adams'),
('oscarlopez', 'Oscar Lopez'),
('pamelaharris', 'Pamela Harris'),
('quentinmoore', 'Quentin Moore'),
('rebeccawilson', 'Rebecca Wilson'),
('samuelthompson', 'Samuel Thompson'),
('tiffanybrown', 'Tiffany Brown'),
('ulrichschmidt', 'Ulrich Schmidt');
