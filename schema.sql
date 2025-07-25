-- 既存テーブル削除（初期化用）
DROP TABLE IF EXISTS exercise_master;

DROP TABLE IF EXISTS exercise;

DROP TABLE IF EXISTS book;

DROP TABLE IF EXISTS output;

DROP TABLE IF EXISTS sleep;

-- 種目マスタテーブル
CREATE TABLE IF NOT EXISTS exercise_master (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    display_order INTEGER DEFAULT 0
);

-- サンプル種目（部位ごとに順番を調整）
INSERT
    OR IGNORE INTO exercise_master (name, display_order)
VALUES ('ベンチプレス', 1),
    ('チェストプレス', 2),
    ('ペックフライ', 3),
    ('ショルダープレス', 4),
    ('リアデルト', 5),
    ('チンニング', 6),
    ('ラットプル', 7),
    ('ケーブルローイング', 8),
    ('スクワット', 9),
    ('レッグプレス', 10),
    ('レッグカール', 11),
    ('レッグエクステンション', 12),
    ('アダクター', 13),
    ('アブダクター', 14),
    ('ダンベルカール', 15),
    ('デッドリフト', 16);

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
    book (date, title, pages_read)
VALUES ('2025-01-20', 'React実践入門', 50),
    (
        '2025-01-22',
        'TypeScript完全ガイド',
        30
    ),
    (
        '2025-01-24',
        'Next.jsアプリケーション開発',
        80
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
