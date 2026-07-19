'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';
import { toSlug } from '../lib/article-utils';

function slugifyChildren(children: ReactNode): string {
  const text = Array.isArray(children)
    ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
    : typeof children === 'string'
      ? children
      : '';
  return toSlug(text);
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={slugifyChildren(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={slugifyChildren(children)}>{children}</h3>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
