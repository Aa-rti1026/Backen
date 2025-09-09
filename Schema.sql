 CREATE TABLE profile (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 email TEXT,
 education TEXT,
 skills_json TEXT,
 work_json TEXT,
 links_json TEXT
 );
 CREATE TABLE projects (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT,
 links_json TEXT,
 skills_json TEXT
 );