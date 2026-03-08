'use client';

import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ExternalLink, Menu, ChevronRight } from "lucide-react";

const ARTICLE = {
  title: "The 12% Reality Check: What Google's AI Mode Really Means for Medical Practices",
  category: "Industry Data",
  author: "StackMatrices Intelligence",
  date: "March 8, 2026",
  readTime: "10 min read",
};

const TABLE_OF_CONTENTS = [
  { id: "overview", title: "The Great Disconnect" },
  { id: "implications", title: "What This Means for Medical Practices" },
  { id: "fanout", title: "The Fan-Out Effect" },
  { id: "visual", title: "Death of the Visual" },
  { id: "cards", title: "The Organic Burial" },
  { id: "action", title: "What Medical Practices Should Do Now" },
  { id: "conclusion", title: "Conclusion" },
];

export default function GoogleAIModePage() {
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

        <article className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Two decades of SEO just got invalidated. A new study from Moz analyzing 40,000 keywords 
            reveals something alarming: Google&apos;s AI Mode has only <strong className="text-primary">12% overlap</strong> with traditional organic rankings. 
            If you&apos;re still optimizing the old way, you&apos;re already invisible.
          </p>

          <h2 id="overview">The Great Disconnect: 88% to 12%</h2>
          <p>
            In traditional search, AI Overviews act as a sophisticated concierge—they summarize the results 
            already on page one. In those cases, there&apos;s an 88% URL overlap between AI-cited sources 
            and top 10 organic results.
          </p>
          <p>
            But Google&apos;s AI Mode? It&apos;s a completely different search engine.
          </p>
          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">The Overlap Collapse</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-4xl font-bold text-green-400 mb-2">88%</p>
                <p className="text-sm text-gray-400">Traditional Search AI Overviews</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-4xl font-bold text-red-400 mb-2">12%</p>
                <p className="text-sm text-gray-400">AI Mode Citations</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Source: Tom Capper, Moz (40,000 keyword analysis via STAT)
            </p>
          </div>

          <p>
            The overlap between organic rankings and AI citations drops to just 12%. 
            This isn&apos;t a reorganization of the SERP—it&apos;s the emergence of a separate search engine logic.
          </p>

          <h2 id="overview">What This Means for Medical Practices</h2>
          <p>
            If you&apos;re spending budget on traditional SEO—building backlinks, optimizing for specific keywords, 
            chasing domain authority—you need to understand: <strong>the rules have changed</strong>.
          </p>
          <p>
            When a potential patient asks ChatGPT or uses Google&apos;s AI Mode &quot;best rhinoplasty surgeon Los Angeles,&quot; 
            the AI isn&apos;t pulling from the traditional top 10. It&apos;s creating its own list of &quot;authorities&quot; 
            based on completely different signals.
          </p>

          <h3>The Implications</h3>
          <ul>
            <li><strong>Your #1 ranking means nothing</strong> in AI Mode if you haven&apos;t established authority on the broader topic</li>
            <li><strong>Local packs are half as likely</strong> to appear in AI Mode compared to traditional search</li>
            <li><strong>Traditional SEO metrics</strong>—domain authority, backlink count—aren&apos;t the primary factors anymore</li>
          </ul>

          <h2 id="overview">The &quot;Fan-Out&quot; Effect: Beyond Single-Keyword SEO</h2>
          <p>
            Here&apos;s the mechanism behind this shift: Google&apos;s AI Mode uses &quot;fan-out&quot; queries. 
            When a user enters a search, AI Mode branches out—generating a cluster of related search terms 
            to assemble a multi-perspective response.
          </p>
          <p>
            <strong>The era of optimizing for a single, high-volume keyword is over.</strong>
          </p>
          <p>
            Success in AI Mode requires semantic relevance across a broader &quot;topic branch.&quot; If you aren&apos;t 
            establishing topical authority clusters that satisfy these secondary, branched queries, you won&apos;t 
            exist in the generative summary—regardless of your primary keyword rank.
          </p>

          <div className="bg-white/5 border-l-4 border-primary p-5 my-8">
            <p className="text-gray-300">
              <strong className="text-white">What this looks like in practice:</strong> Instead of optimizing 
              for &quot;liposuction Beverly Hills,&quot; you need comprehensive content coverage around 
              liposuction—recovery times, risks, costs, before/afters, surgeon credentials, facility details— 
              that satisfies the broader cluster of questions AI Mode generates.
            </p>
          </div>

          <h2 id="overview">Death of the Visual? The Return of the Verbose</h2>
          <p>
            We&apos;ve spent years being told the future of search is visual, snackable, and video-first. 
            AI Mode is a sudden pivot back to structured prose.
          </p>

          <h3>The Data</h3>
          <ul>
            <li><strong>99.5%</strong> of AI Mode results contain at least one paragraph of text</li>
            <li><strong>Text typically occupies the first position</strong>—above images, maps, and cards</li>
            <li><strong>Maps and local packs</strong> are roughly half as likely to appear in AI Mode</li>
            <li><strong>Image galleries (&quot;Grid&quot;)</strong> are used sparingly</li>
          </ul>

          <h3>What This Means for Your Content Strategy</h3>
          <p>
            While video and imagery remain vital for traditional SERPs, capturing AI Mode requires a return to 
            high-quality, verbose, and structured text that the model can easily parse and cite.
          </p>
          <p>
            <strong>Your blog isn&apos;t dead—it&apos;s essential.</strong> But it needs to be comprehensive, 
            well-structured, and authoritative, not just optimized for keywords.
          </p>

          <h2 id="overview">The &quot;Organic Burial&quot;: Why Cards Aren&apos;t Enough</h2>
          <p>
            In AI Mode, the closest thing to a traditional organic result is the &quot;Card&quot;—a clickable 
            result block that resembles a standard listing. While these appear in roughly 63% of results, 
            their utility is hindered by placement.
          </p>
          <p>
            Being in a Card doesn&apos;t guarantee traffic. AI Mode is designed to keep users in the 
            experience—cards are there for those who want to dig deeper, but the AI is giving away 
            the answers directly.
          </p>

          <h2 id="overview">What Medical Practices Should Do Now</h2>
          
          <h3>1. Build Topical Authority, Not Just Keyword Rankings</h3>
          <p>
            Create comprehensive content clusters around your procedures. Don&apos;t just have a &quot;rhinoplasty&quot; 
            page—have in-depth content on types of rhinoplasty, recovery timelines, cost breakdowns, 
            surgeon comparisons, facility accreditation, and so on.
          </p>

          <h3>2. Prioritize Structured Text Over Visual Content</h3>
          <p>
            AI Mode wants to cite paragraphs, not images. Make sure your content has clear headings, 
            detailed explanations, and specific data points that can be extracted and cited.
          </p>

          <h3>3. Optimize for the Topic Branch</h3>
          <p>
            Map out all the related questions a patient might ask about a procedure. Address them 
            comprehensively in your content—not as thin FAQ answers, but as substantive sections.
          </p>

          <h3>4. Track AI Citations, Not Just Rankings</h3>
          <p>
            Traditional keyword rankings don&apos;t matter if AI Mode isn&apos;t citing you. Start monitoring 
            whether your practice appears in AI-generated responses for your target queries.
          </p>

          <h2 id="overview">The Bottom Line</h2>
          <p>
            The 12% overlap isn&apos;t just a number—it&apos;s a signal that the foundation of SEO has shifted. 
            Medical practices that recognize this early and adapt their content strategy will capture the 
            next generation of patients. Those clinging to traditional SEO tactics will find themselves 
            increasingly invisible in AI-powered search.
          </p>
          <p>
            The question isn&apos;t whether to adapt—it&apos;s whether you can afford not to.
          </p>
        </article>



          <h2 id="overview">The Scrolling Tax: Why Position 10 Is Basically Invisible</h2>
          <p>
            In traditional SERPs, organic results appear in the top position about half the time. 
            In AI Mode, paragraphs and lists dominate the top. Organic-style cards are almost exclusively 
            relegated to the bottom of the stack—typically appearing at position 10.
          </p>
          <p>
            When you combine the 12% overlap with this &quot;footer status&quot; for cards, the conclusion is clear: 
            even if you&apos;re one of the lucky few cited, you&apos;re paying a heavy &quot;scrolling tax&quot; that 
            renders your organic-style visibility nearly invisible to the average user.
          </p>

          <h2 id="overview">The Survival Gap: The Elite 4.5 Average</h2>
          <p>
            Perhaps the most punishing finding: the quality threshold required to enter AI Mode citations. 
            The average organic rank of a URL cited in AI Mode is <strong className="text-primary">4.5</strong>.
          </p>
          <div className="bg-white/5 border border-primary/30 rounded-xl p-6 my-8">
            <h3 className="text-lg font-semibold text-primary mb-4">The Ranking Gap</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-4xl font-bold text-primary mb-2">4.5</p>
                <p className="text-sm text-gray-400">Average rank in AI Mode citations</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-400 mb-2">5.5</p>
                <p className="text-sm text-gray-400">Random Top 10 average</p>
              </div>
            </div>
          </div>
          <p>
            To put that in perspective: a random sampling of the Top 10 would yield an average rank of 5.5. 
            By hitting a 4.5 average, Google is signaling it&apos;s cherry-picking only the absolute top-tier 
            results from across its various fan-out queries.
          </p>
          <p>
            <strong>The bottom line: if you&apos;re ranking positions 6-10 in traditional search, the survival gap 
            has become a canyon.</strong> If you aren&apos;t at the apex of a topical cluster, you aren&apos;t just 
            losing rank—you&apos;re being excluded from the AI-generated conversation entirely.
          </p>

          <h2 id="overview">Conclusion: Navigating the AI-First SERP</h2>
          <p>
            AI Mode isn&apos;t just a new &quot;feature&quot; on the Google result page—it&apos;s a fundamental shift 
            in how search results are indexed and displayed. We&apos;re moving from a world where we compete 
            for a spot in the Top 10 to a world where we must compete for inclusion in a &quot;fan-out&quot; query 
            logic that only recognizes a tiny sliver of the organic world.
          </p>
          <div className="bg-white/5 border-l-4 border-primary p-5 my-8">
            <p className="text-gray-300">
              <strong className="text-white">The hard truth:</strong> If your tracking and optimization are 
              still focused solely on the traditional organic list, you&apos;re likely blind to your own disappearance. 
              In a search environment where your organic visibility can vanish into a 12% shadow, scale-based 
              tracking isn&apos;t just a luxury—it&apos;s the only pulse check left.
            </p>
          </div>


        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Tom Capper, Moz - AI Mode Analysis (40,000 keywords via STAT)
            </li>
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[2]</span>
              MozCast dataset - 10,000 terms across desktop/mobile
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Capture AI Mode Patients?</h2>
          <p className="text-gray-300 mb-6">
            We analyze where your practice stands in AI search and build a strategy to dominate AI Mode citations.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your AI Visibility Analysis
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
