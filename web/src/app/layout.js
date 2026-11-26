import "./globals.css";

export const metadata = {
  title: "班级共享书架",
  description: "发现、借阅和分享班级里的好书。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
