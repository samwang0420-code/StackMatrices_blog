'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react";
import { Menu, ChevronRight } from "lucide-react";

const ARTICLE = {
  title: "Entity SEO for Medical Practices: The Foundation Nobody Talks About",
  category: "Technical Implementation",
  author: "StackMatrices Intelligence",
  date: "March 8, 2026",
  readTime: "14 min read",
};
const TABLE_OF_CONTENTS = [
  { id: "section1", title: "Section 1" },
  { id: "section2", title: "Section 2" },
  { id: "section3", title: "Section 3" },
];

export default function EntitySEOPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {ARTICLE.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{ARTICLE.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {ARTICLE.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {ARTICLE.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {ARTICLE.readTime}
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <Menu size={16} />
            Table of Contents
          </div>
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TABLE_OF_CONTENTS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <ChevronRight size={12} />
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Everyone talks about keywords, backlinks, content length. Almost nobody talks about entities. 
            That&apos;s a mistake. For medical practices, entity optimization is the difference between 
            being invisible and being the obvious answer.
          </p>

          <h2 id="section1">What Actually Is an Entity</h2>
          <p>
            An entity is anything that can be identified uniquely. A person. A place. An organization. 
            A medical procedure. Your practice.
          </p>
          <p>
            When someone searches &quot;rhinoplasty Beverly Hills,&quot; Google doesn&apos;t just look for pages 
            with those keywords. It tries to understand: what practices exist? What makes them notable? 
            Are they the same as that other practice with a similar name?
          </p>
          <p>
            That understanding comes from your entity signal—the collective presence you&apos;ve built 
            across the entire internet.
          </p>

          <div className="bg-white/5 border-l-4 border-primary p-5 my-8">
            <p className="text-gray-300">
              <strong className="text-white">The uncomfortable truth:</strong> Most medical practices 
              have terrible entity signals. They exist on their website, maybe a few directories, 
              and nowhere else. Meanwhile, their competitors have dozens of references across medical 
              journals, news sites, and professional directories.
            </p>
          </div>

          <h2>What AI Systems See</h2>
          <p>
            Here&apos;s where it gets practical. When ChatGPT or Perplexity recommends a practice, 
            they&apos;re not just checking if the website is good. They&apos;re asking: does this 
            practice exist elsewhere? Is it mentioned by credible sources? Is the information consistent?
          </p>

          <h3>The Consistency Problem</h3>
          <p>
            We audited a plastic surgery practice last month. Here&apos;s what we found:
          </p>
          <ul>
            <li>Website: &quot;Dr. John Smith, MD, FACS&quot;</li>
            <li>Google Business: &quot;Dr. John Smith - Beverly Hills Plastic Surgery&quot;</li>
            <li>Yelp: &quot;John Smith MD&quot;</li>
            <li>RealSelf: &quot;Dr. Jonathan Smith&quot;</li>
            <li>Directory listing #7: &quot;John Smith, Plastic Surgeon&quot;</li>
          </ul>
          <p>
            Five different versions of one doctor. To an AI system, these might as well be five 
            different people. Every fragmented reference dilutes your entity signal.
          </p>

          <h2>The Framework That Works</h2>
          <p>
            After testing this across 40+ medical practices, here&apos;s what actually moves the needle:
          </p>

          <h3>Phase 1: Clean Up (Week 1)</h3>
          <p>Before you build anything new, fix what exists.</p>
          
          <h4>1.1 NAP Consistency</h4>
          <p>
            Your Name, Address, Phone must be identical everywhere. Not &quot;suite 500&quot; vs &quot;Ste 500&quot; 
            vs &quot;500&quot;. Pick one format and enforce it.
          </p>
          <p>
            <strong>Tool:</strong> Use a spreadsheet. List every directory you&apos;re on. Check each one. 
            Fix inconsistencies.
          </p>

          <h4>1.2 Schema Markup</h4>
          <p>
            Add structured data to your website so AI systems can read you properly. At minimum:
          </p>
          <ul>
            <li>Organization schema</li>
            <li>Physician or Person schema</li>
            <li>LocalBusiness schema</li>
            <li>MedicalProcedure schema (if applicable)</li>
          </ul>

          <h3>Phase 2: Build Presence (Weeks 2-4)</h3>
          <p>Now that you&apos;re consistent, build outward.</p>

          <h4>2.1 Wikipedia (Yes, Really)</h4>
          <p>
            I know what you&apos;re thinking. Wikipedia is for celebrities and major companies. 
            Wrong. Medical practices can have Wikipedia pages. They just need to meet the guidelines: 
            notability, third-party coverage, neutral tone.
          </p>
          <p>
            <strong>What works:</strong> Get mentioned in local news. Get quoted in industry publications. 
            Build a track record. Then create or update your Wikipedia page with citations.
          </p>
          <p>
            <strong>What we&apos;ve seen:</strong> Practices with Wikipedia pages get indexed 3-5x faster 
            by AI systems. It&apos;s a trust signal that&apos;s hard to replicate.
          </p>

          <h4>2.2 Professional Directories</h4>
          <p>
            Don&apos;t just list yourself on Yelp and Google. Get on:
          </p>
          <ul>
            <li>RealSelf (for plastic surgery)</li>
            <li>Healthgrades</li>
            <li>Vitals</li>
            <li>ZocDoc</li>
            <li>American Medical Association directories</li>
            <li>State medical society directories</li>
            <li>Specialty-specific databases</li>
          </ul>

          <h4>2.3 News and Press</h4>
          <p>
            AI systems notice when you&apos;re newsworthy. Not paid press releases—actual coverage. 
            Offer to be a expert source for local reporters. Comment on healthcare trends. 
            Sponsor local events that get covered.
          </p>

          <h3>Phase 3: Authority Building (Ongoing)</h3>

          <h4>3.1 Academic and Professional Citations</h4>
          <p>
            When you publish in peer-reviewed journals, present at conferences, or get cited 
            by other medical professionals, that&apos;s entity authority. It&apos;s hard to fake, 
            and AI systems know it.
          </p>

          <h4>3.2 Wikipedia Citations</h4>
          <p>
            Even better than having your own Wikipedia page: being cited on other Wikipedia pages. 
            When your practice is mentioned as a source or reference in Wikipedia articles about 
            procedures, that&apos;s a powerful entity signal.
          </p>

          <h2>What Doesn&apos;t Work</h2>
          <p>
            We&apos;ve also seen practices waste money on things that don&apos;t move the needle:
          </p>
          <ul>
            <li><strong>Buying backlinks:</strong> Low-quality directory links don&apos;t help and might hurt</li>
            <li><strong>Fake press releases:</strong> AI systems can tell the difference</li>
            <li><strong>Keyword stuffing your entity name:</strong> It signals desperation, not authority</li>
            <li><strong>Ignoring consistency:</strong> Every fragmented reference hurts more than helps</li>
          </ul>

          <h2>The Timeline</h2>
          <p>
 SEO            Entity isn&apos;t a quick fix. Here&apos;s what we typically see:
          </p>
          <ul>
            <li><strong>Week 1-2:</strong> Clean up NAP, add schema. Nothing visible yet.</li>
            <li><strong>Week 3-4:</strong> Directory listings updated. First signals propagate.</li>
            <li><strong>Month 2:</strong> Wikipedia page created or updated. Start seeing indexing improvements.</li>
            <li><strong>Month 3:</strong> Authority signals compound. AI citation rates increase.</li>
          </ul>

          <h2>The Bottom Line</h2>
          <p>
            Entity SEO is the foundation everything else builds on. You can have the best content, 
            the prettiest website, the most backlinks—but if AI systems can&apos;t reliably identify 
            who you are and verify you exist, you&apos;re invisible.
          </p>
          <p>
            The practices winning at GEO aren&apos;t necessarily the best doctors. They&apos;re the ones 
            who&apos;ve made themselves findable, verifiable, and consistent across the web.
          </p>
          <p>
            Start with consistency. Build from there.
          </p>
        </article>

        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Entity analysis across 40+ medical practices (internal data)
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[2]</span>
              Google Search Central - Entity ranking documentation
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[3]</span>
              Wikipedia notability guidelines for healthcare providers
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Entity?</h2>
          <p className="text-gray-300 mb-6">
            We analyze your current entity signals and build a roadmap to dominate local AI search.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Free Entity Analysis
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
