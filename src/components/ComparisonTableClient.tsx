'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ComparisonRow {
  name: string;
  brand: string;
  price: string;
  feature: string;
  downside?: string;
  productKey: string;
  amazonLink: string;
  awinLink: string;
}

interface Props {
  headers: string[];
  rows: ComparisonRow[];
  footer: string;
}

export function ComparisonTableClient({ headers, rows, footer }: Props) {
  const [links, setLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch Awin links server-side via API route
    Promise.all(
      rows.map(async (r) => {
        const res = await fetch(`/api/awin-link?product=${encodeURIComponent(r.productKey)}&fallback=${encodeURIComponent(r.amazonLink)}`);
        const json = await res.json();
        return { key: r.productKey, link: json.link || r.amazonLink };
      })
    ).then((results) => {
      const map: Record<string, string> = {};
      results.forEach((r) => {
        map[r.key] = r.link;
      });
      setLinks(map);
    });
  }, [rows]);

  return (
    <div className="my-12">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-forest-light">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.productKey} className="hover:bg-sage-light/30">
                <td className="px-4 py-3 text-sm font-medium text-charcoal">{row.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.brand}</td>
                <td className="px-4 py-3 text-sm text-forest font-semibold">{row.price}</td>
                <td className="px-4 py-3 text-sm text-green-700/80">{row.feature}</td>
                {row.downside && <td className="px-4 py-3 text-sm text-gray-500">{row.downside}</td>}
                <td className="px-4 py-3 text-sm">
                  <Link
                    href={row.amazonLink}
                    className="font-medium text-forest hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Amazon
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">
                  {links[row.productKey] ? (
                    <Link
                      href={links[row.productKey]}
                      className="font-medium text-forest hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Awin
                    </Link>
                  ) : (
                    <span className="text-gray-400">Chargement…</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 rounded-lg border border-sage bg-sage-light/40 p-4 text-sm">
        <p className="font-medium text-forest">{footer}</p>
      </div>
    </div>
  );
}