export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
          <a href="/" className="text-xl font-bold text-primary" aria-label="EcoPet Home">
            EcoPet
          </a>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="/admin/login" className="hover:text-primary transition-colors">Admin</a></li>
          </ul>
        </nav>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About EcoPet</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are a team of pet lovers and environmental advocates dedicated to helping you make sustainable choices
            for your furry friends without compromising on quality or safety.
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: reduce the environmental impact of pet ownership through informed
            product choices and honest reviews. We test every product ourselves and research the
            sustainability credentials of each brand.
          </p>

          <h2>Why Sustainable Pet Products?</h2>
          <p>
            Conventional pet supplies often involve single-use plastics, non-renewable resources,
            and harmful chemicals. By choosing eco-friendly alternatives, we can reduce our collective
            environmental footprint while providing better products for our pets.
          </p>

          <h2>Editorial Standards</h2>
          <ul>
            <li>All products are independently tested</li>
            <li>No greenwashing - we demand third-party certifications</li>
            <li>Affiliate links are clearly disclosed</li>
            <li>Expert vets review all health-related content</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Articles
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EcoPet. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

import Link from 'next/link';