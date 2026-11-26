"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

const books = [
  {
    id: 1,
    title: "人类简史",
    author: "尤瓦尔·赫拉利",
    category: "社科",
    color: "sand",
    mark: "YUVAL NOAH HARARI",
    available: 2,
  },
  {
    id: 2,
    title: "你当像鸟飞往你的山",
    author: "塔拉·韦斯特弗",
    category: "文学",
    color: "blue",
    mark: "EDUCATED",
    available: 1,
  },
  {
    id: 3,
    title: "也许你该找个人聊聊",
    author: "洛莉·戈特利布",
    category: "心理",
    color: "green",
    mark: "MAYBE YOU SHOULD TALK TO SOMEONE",
    available: 0,
  },
  {
    id: 4,
    title: "程序是怎样跑起来的",
    author: "矢泽久雄",
    category: "计算机",
    color: "coral",
    mark: "HOW COMPUTERS WORK",
    available: 3,
  },
];

const categories = ["全部", "文学", "社科", "心理", "计算机"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");

  const visibleBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return books.filter((book) => {
      const matchesCategory = category === "全部" || book.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${book.title} ${book.author} ${book.category}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className={styles.siteShell}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="班级共享书架首页">
          <span className={styles.brandIcon}>书</span>
          <span>班级共享书架</span>
        </a>

        <nav className={styles.nav} aria-label="主导航">
          <a className={styles.navActive} href="#catalog">图书目录</a>
          <a href="#about">关于书架</a>
        </nav>

        <a className={styles.readerLink} href="#catalog">读者入口 <span>↗</span></a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> 班级里的小小图书馆</p>
          <h1>好书在这里，<br />等一个新的读者。</h1>
          <p className={styles.heroText}>
            看看书架上有哪些书，找到你想读的那一本。借阅和归还记录会在这里慢慢建立起来。
          </p>
          <a className={styles.heroButton} href="#catalog">逛逛书架 <span>↓</span></a>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.sun} />
          <div className={`${styles.plant} ${styles.plantOne}`}>✳</div>
          <div className={`${styles.plant} ${styles.plantTwo}`}>✳</div>
          <div className={`${styles.artBook} ${styles.artBookOne}`}><span>THE<br />LITTLE<br />PRINCE</span></div>
          <div className={`${styles.artBook} ${styles.artBookTwo}`}><span>日常<br />与远方</span></div>
          <div className={`${styles.artBook} ${styles.artBookThree}`}><span>读书<br />笔记</span></div>
          <div className={styles.shelf} />
          <div className={styles.heroNote}>借一本书<br />带走一段新的旅程</div>
        </div>
      </section>

      <section className={styles.catalogSection} id="catalog">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>从一本书开始</p>
            <h2>书架上有什么</h2>
          </div>
          <p className={styles.bookCount}>目前收录 <strong>{books.length}</strong> 本书</p>
        </div>

        <div className={styles.catalogTools}>
          <label className={styles.searchBox}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜书名、作者或分类"
              aria-label="搜索书名、作者或分类"
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className={styles.categories} aria-label="图书分类">
            {categories.map((item) => (
              <button
                className={category === item ? styles.categoryActive : styles.category}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {visibleBooks.length > 0 ? (
          <div className={styles.bookGrid}>
            {visibleBooks.map((book, index) => (
              <article className={styles.bookCard} key={book.id}>
                <div className={`${styles.bookCover} ${styles[book.color]}`}>
                  <span className={styles.coverIndex}>0{index + 1}</span>
                  <span className={styles.coverMark}>{book.mark}</span>
                  <span className={styles.coverTitle}>{book.title}</span>
                  <span className={styles.coverAuthor}>{book.author}</span>
                  <span className={styles.coverDecoration} aria-hidden="true">✳</span>
                </div>
                <div className={styles.bookInfo}>
                  <div>
                    <h3>{book.title}</h3>
                    <p>{book.author} <span>·</span> {book.category}</p>
                  </div>
                  <span className={book.available > 0 ? styles.available : styles.unavailable}>
                    <i /> {book.available > 0 ? `可借 ${book.available} 本` : "暂时借出"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span>?</span>
            <h3>没有找到这本书</h3>
            <p>试试其他书名、作者或分类。</p>
          </div>
        )}
      </section>

      <footer className={styles.footer} id="about">
        <span>班级共享书架</span>
        <span>让好书在同学之间流动。</span>
      </footer>
    </main>
  );
}
