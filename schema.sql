-- 既存テーブル削除（初期化用）
DROP TABLE IF EXISTS exercise;

DROP TABLE IF EXISTS book;

DROP TABLE IF EXISTS output;

DROP TABLE IF EXISTS sleep;

-- トレーニング記録テーブル
CREATE TABLE IF NOT EXISTS exercise (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    exercise_name TEXT NOT NULL,
    count INTEGER DEFAULT 0,
    weight INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 本テーブル
CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    book_url TEXT,
    comment TEXT,
    source_url TEXT,
    source_name TEXT,
    pages_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- アウトプットテーブル
CREATE TABLE IF NOT EXISTS output (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    chars INTEGER DEFAULT 0,
    is_tech BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 睡眠テーブル
CREATE TABLE IF NOT EXISTS sleep(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    hours REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータ
INSERT INTO
    exercise (
        date,
        exercise_name,
        count,
        weight
    )
VALUES ('2025-01-20', 'ベンチプレス', 3, 30),
    ('2025-01-22', 'スクワット', 2, 25),
    ('2025-01-24', 'デッドリフト', 4, 40);

INSERT INTO
    book (
        date,
        title,
        pages_read,
        book_url,
        comment,
        source_url,
        source_name
    )
VALUES (
        '2025-01-20',
        'React実践入門',
        50,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        '2025-01-22',
        'TypeScript完全ガイド',
        30,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        '2025-01-24',
        'Next.jsアプリケーション開発',
        80,
        NULL,
        NULL,
        NULL,
        NULL
    );

INSERT INTO
    output (date, type, chars, is_tech)
VALUES ('2025-01-20', 'blog', 1500, 1),
    ('2025-01-21', 'diary', 800, 0),
    ('2025-01-22', 'blog', 2000, 1),
    ('2025-01-23', 'diary', 500, 0),
    ('2025-01-24', 'blog', 2500, 1);

INSERT INTO
    sleep(date, hours)
VALUES ('2025-01-20', 7.5),
    ('2025-01-21', 8.0),
    ('2025-01-22', 7.0),
    ('2025-01-23', 8.5),
    ('2025-01-24', 7.5);
