/* ===========================================
   Migration Script for Blog System Refactor
   Author: tearlighting
   Date: 2025-09-28
   Description: Migrate data from old schema 
   (myblog.* tables) to new schema.
=========================================== */

/* -------------------------------
   Step 1: Migrate blog translations
   Source: myblog.blog_jp + blogtype
   Target: blogtranslation
-------------------------------- */
INSERT INTO blogtranslation
  (id, lang, isValid, blogId, title, `description`, toc, htmlContent, updatedAt, createdAt)
SELECT 
  UUID(), 
  'jp', 
  'Y', 
  d.*, 
  c.title, 
  c.description, 
  c.toc, 
  c.htmlContent, 
  c.updatedAt, 
  c.createdAt
FROM (
  SELECT b.*, a.`name`
  FROM myblog.blog_jp AS b
  LEFT JOIN myblog.blogtype AS a
    ON a.id = b.blogType
) c
LEFT JOIN (
  SELECT blog.id, blogtype.`name`
  FROM blog
  LEFT JOIN blogtype
    ON blog.blogTypeId = blogtype.id
) d
  ON d.`name` = c.`name`;

/* -------------------------------
   Step 2: Migrate orphaned messages (no blogtype)
   Source: myblog.message + myblog.blog
   Target: sitemessage
-------------------------------- */
INSERT INTO sitemessage 
  (id, isValid, nickName, content, avatar, createdAt, updatedAt)
SELECT *
FROM (
  SELECT 
    UUID(), 
    'Y', 
    f.id, 
    e.nickName, 
    e.content, 
    e.avatar, 
    e.createdAt, 
    e.updatedAt
  FROM (
    SELECT c.*, d.`name`
    FROM (
      SELECT a.*, b.blogType
      FROM myblog.message a
      LEFT JOIN myblog.blog b
        ON a.blogId = b.id
    ) c
    LEFT JOIN myblog.blogtype d
      ON d.id = c.blogType
  ) e
  LEFT JOIN (
    SELECT blog.*, blogtype.`name`
    FROM blog
    LEFT JOIN blogtype
      ON blog.blogTypeId = blogtype.id
  ) f
    ON e.`name` = f.`name`
  WHERE blogtype IS NULL
) m;

/* -------------------------------
   Step 3: Migrate blog-related messages
   Source: myblog.message + myblog.blog
   Target: blogmessage
-------------------------------- */
INSERT INTO blogmessage 
  (id, isValid, blogId, nickName, content, avatar, createdAt, updatedAt)
SELECT *
FROM (
  SELECT 
    UUID(), 
    'Y', 
    f.id, 
    e.nickName, 
    e.content, 
    e.avatar, 
    e.createdAt, 
    e.updatedAt
  FROM (
    SELECT c.*, d.`name`
    FROM (
      SELECT a.*, b.blogType
      FROM myblog.message a
      LEFT JOIN myblog.blog b
        ON a.blogId = b.id
    ) c
    LEFT JOIN myblog.blogtype d
      ON d.id = c.blogType
  ) e
  LEFT JOIN (
    SELECT blog.*, blogtype.`name`
    FROM blog
    LEFT JOIN blogtype
      ON blog.blogTypeId = blogtype.id
  ) f
    ON e.`name` = f.`name`
  WHERE blogtype IS NOT NULL
) m;

/* -------------------------------
   Step 4: update img path
   Source: blog 
   Target: blog 
-------------------------------- */

UPDATE blog 
set thumb=REPLACE(thumb,'/img','/uploads/imgs') 
WHERE thumb LIKE '/img%'